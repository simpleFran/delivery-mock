/**
 * Sanitiza entradas de busca para evitar SQL Injection e caracteres inválidos.
 */
export function sanitizeSearchQuery(input: string): string {
    if (!input) throw new Error("Filtro de busca inválido.");

    // Normaliza acentos e remove diacríticos
    let sanitized = input.normalize("NFD").replace(/[\u0300-\u036f]/g, "");

    // Mantém apenas letras, números, espaços e hífen
    sanitized = sanitized.replace(/[^a-zA-Z0-9\s-]/g, "");

    // Remove múltiplos espaços ou hífens consecutivos
    sanitized = sanitized.replace(/\s{2,}/g, " ").replace(/-{2,}/g, "-");

    // Remove hífens nas extremidades
    sanitized = sanitized.replace(/^[-]+|[-]+$/g, "");

    // Converte para lowercase para checar palavras perigosas
    const check = sanitized.toLowerCase();

    const dangerousWords = ["drop", "delete", "truncate", "alter", "update", "insert", "create", "table"];
    for (const word of dangerousWords) {
        if (check.includes(word)) {
            throw new Error("Filtro contém palavras proibidas.");
        }
    }

    // Remove espaços extras e limita tamanho
    sanitized = sanitized.trim().slice(0, 100);

    return sanitized;
}
