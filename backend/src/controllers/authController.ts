import { Request, Response } from "express";
import { db } from "../config/db";
import { error } from "console";
import { generate as generateToken } from "../config/jwt";

export async function logic(req: Request, res:Response){
    const { email, senha } = req.body;

    try {
        const [rows] = await db.query(
            "SELECT * FROM usuario WHERE email = ? AND senha = ?", [email, senha]
        );

        const users = rows as any[];

        if(users.length === 0){
            return res.status(401).json({error: "Credenciais Invalidas"});
        }

        const user = users[0];
        const token = generateToken({id: user.id, email: user.email});

        res.json({
            message: "Login Bem-Sucessido", token
        });
    } catch (err) {
        res.status(500).json({error: "Erro interno do servidor"})
    }
}