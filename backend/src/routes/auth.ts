import { Router } from "express";
import { db } from "../config/db.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

const router = Router();

// Register route
router.post('/register', async (req, res) => {
    try {
        const { name, email, password } = req.body;

        // Check if user already exists
        const [existingUsers] = await db.query(
            "SELECT * FROM users WHERE email = ?", 
            [email]
        );

        if ((existingUsers as any[]).length > 0) {
            return res.status(400).json({ 
                message: "Usuário já existe com este email" 
            });
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Insert user
        const [result] = await db.query(
            "INSERT INTO users (name, email, password) VALUES (?, ?, ?)",
            [name, email, hashedPassword]
        );

        const userId = (result as any).insertId;

        // Generate token
        const token = jwt.sign(
            { id: userId, email },
            process.env.JWT_SECRET || 'fallback-secret',
            { expiresIn: '24h' }
        );

        res.status(201).json({
            message: "Usuário criado com sucesso",
            user: { id: userId, name, email },
            token
        });

    } catch (error) {
        console.error('Registration error:', error);
        res.status(500).json({ 
            message: "Erro interno do servidor" 
        });
    }
});

// Login route
router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;

        // Find user
        const [rows] = await db.query(
            "SELECT * FROM users WHERE email = ?", 
            [email]
        );

        const users = rows as any[];

        if (users.length === 0) {
            return res.status(401).json({ 
                message: "Credenciais inválidas" 
            });
        }

        const user = users[0];

        // Check password
        const isValidPassword = await bcrypt.compare(password, user.password);

        if (!isValidPassword) {
            return res.status(401).json({ 
                message: "Credenciais inválidas" 
            });
        }

        // Generate token
        const token = jwt.sign(
            { id: user.id, email: user.email },
            process.env.JWT_SECRET || 'fallback-secret',
            { expiresIn: '24h' }
        );

        res.json({
            message: "Login realizado com sucesso",
            user: { 
                id: user.id, 
                name: user.name, 
                email: user.email 
            },
            token
        });

    } catch (error) {
        console.error('Login error:', error);
        res.status(500).json({ 
            message: "Erro interno do servidor" 
        });
    }
});

export default router;

