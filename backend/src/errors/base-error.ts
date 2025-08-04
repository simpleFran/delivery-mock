export class AppError extends Error {
  constructor(public message: string, public statusCode = 400) {
    super(message);
    this.name = this.constructor.name;
  }
}

export class InvalidRelationshipError extends AppError {
    constructor(relationship: "Relacionamento") {
        super(`${relationship} inválido.`, 400);
    }
}

export class InexistentProductError extends AppError{
  constructor(message: string) {
    super(message, 400);
  }
}

export class ValidationError extends AppError {
    constructor(details: string) {
        super(`Erro de validação: ${details}`, 400);
    }
}
export class UnauthorizedError extends AppError {
  constructor(message = "Não autorizado") {
    super(message, 401); // HTTP 401 Unauthorized
    this.name = "UnauthorizedError";
  }
}
export class ForbiddenError extends AppError {
  constructor(message = "Acesso negado") {
    super(message, 403); // HTTP 403 Forbidden
    this.name = "ForbiddenError";
  }
}  
export class ResourceNotFoundError extends AppError {
  constructor(resource = "Recurso") {
        super(`${resource} não encontrado`, 404);
  }
}

export class ConflictError extends AppError {
  constructor(message = "Recurso em conflito") {
    super(message, 409); // HTTP 409 Conflict
    this.name = "ConflictError";
  }
}

export class ServerError extends AppError {
  constructor() {
    super("Erro interno do servidor", 500);
  }
}


export class InvalidItemRangeError extends AppError{

  constructor(){
    super("minItens não pode ser maior que maxItens", 400);
  }
}