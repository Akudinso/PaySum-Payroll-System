export class BaseError extends Error {
    statusCode: number;

    constructor(message: string, statusCode: number) {
        super(message);
        this.statusCode = statusCode;
        Object.setPrototypeOf(this, BaseError.prototype);
    }
}

export class BadRequestError extends BaseError {
    constructor(message: string) {
        super(message, 400);
        Object.setPrototypeOf(this, BadRequestError.prototype);
    }
}

export class UnauthorizedError extends BaseError {
    constructor(message: string) {
        super(message, 401);
        Object.setPrototypeOf(this, UnauthorizedError.prototype);
    }
}

export class NotFoundError extends BaseError {
    constructor(message: string) {
        super(message, 404);
        Object.setPrototypeOf(this, NotFoundError.prototype);
    }
}