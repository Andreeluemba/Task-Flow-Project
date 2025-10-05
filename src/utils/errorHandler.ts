import type { ApiError } from '../types';

/**
 * Utility class for handling API errors consistently
 */
export class ErrorHandler {
    /**
     * Extract error message from various error types
     */
    static getErrorMessage(error: any): string {
        if (error?.message) {
            return error.message;
        }

        if (error?.response?.data?.message) {
            return error.response.data.message;
        }

        if (error?.response?.statusText) {
            return error.response.statusText;
        }

        if (typeof error === 'string') {
            return error;
        }

        return 'Erro desconhecido';
    }

    /**
     * Check if error is a network error
     */
    static isNetworkError(error: any): boolean {
        return error?.code === 'NETWORK_ERROR' ||
            error?.message?.includes('Network Error') ||
            !error?.response;
    }

    /**
     * Check if error is an authentication error
     */
    static isAuthError(error: any): boolean {
        return error?.status === 401 || error?.response?.status === 401;
    }

    /**
     * Check if error is a validation error
     */
    static isValidationError(error: any): boolean {
        return error?.status === 400 || error?.response?.status === 400;
    }

    /**
     * Check if error is a permission error
     */
    static isPermissionError(error: any): boolean {
        return error?.status === 403 || error?.response?.status === 403;
    }

    /**
     * Check if error is a not found error
     */
    static isNotFoundError(error: any): boolean {
        return error?.status === 404 || error?.response?.status === 404;
    }

    /**
     * Check if error is a server error
     */
    static isServerError(error: any): boolean {
        const status = error?.status || error?.response?.status;
        return status >= 500 && status < 600;
    }

    /**
     * Get user-friendly error message based on error type
     */
    static getUserFriendlyMessage(error: any): string {
        if (this.isNetworkError(error)) {
            return 'Erro de conexão. Verifique sua internet e tente novamente.';
        }

        if (this.isAuthError(error)) {
            return 'Sessão expirada. Faça login novamente.';
        }

        if (this.isPermissionError(error)) {
            return 'Você não tem permissão para realizar esta ação.';
        }

        if (this.isNotFoundError(error)) {
            return 'Recurso não encontrado.';
        }

        if (this.isServerError(error)) {
            return 'Erro interno do servidor. Tente novamente mais tarde.';
        }

        if (this.isValidationError(error)) {
            return this.getErrorMessage(error);
        }

        return this.getErrorMessage(error);
    }

    /**
     * Log error for debugging purposes
     */
    static logError(error: any, context?: string): void {
        const errorInfo = {
            message: this.getErrorMessage(error),
            status: error?.status || error?.response?.status,
            context,
            timestamp: new Date().toISOString(),
            stack: error?.stack,
        };

        console.error('API Error:', errorInfo);
    }

    /**
     * Create standardized ApiError from any error
     */
    static createApiError(error: any): ApiError {
        return {
            message: this.getUserFriendlyMessage(error),
            status: error?.status || error?.response?.status || 500,
            field: error?.field || error?.response?.data?.field,
        };
    }
}