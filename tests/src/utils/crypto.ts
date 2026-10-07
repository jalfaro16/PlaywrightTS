import * as crypto from 'crypto';

// Algoritmo de encriptación estándar
const ALGORITHM = 'aes-256-cbc'; 

// La clave secreta debe ser exactamente de 32 bytes (32 caracteres)
const SECRET_KEY = process.env.ENCRYPTION_KEY || '12345678901234567890123456789012'; 

// Función para desencriptar (la usarás en tus tests / Page Object)
export function decrypt(encryptedText: string): string {
    const [ivHex, encryptedDataHex] = encryptedText.split(':');
    if (!ivHex || !encryptedDataHex) {
        return encryptedText; // Si no está encriptado, retorna el texto original
    }

    const iv = Buffer.from(ivHex, 'hex');
    const encryptedTextBuffer = Buffer.from(encryptedDataHex, 'hex');
    const decipher = crypto.createDecipheriv(ALGORITHM, Buffer.from(SECRET_KEY), iv);
    
    let decrypted = decipher.update(encryptedTextBuffer);
    decrypted = Buffer.concat([decrypted, decipher.final()]);

    return decrypted.toString('utf-8');
}

// Función para encriptar (la usas solo para generar los valores cifrados)
export function encrypt(text: string): string {
    const iv = crypto.randomBytes(16); // Vector de inicialización único por cada texto
    const cipher = crypto.createCipheriv(ALGORITHM, Buffer.from(SECRET_KEY), iv);
    
    let encrypted = cipher.update(text, 'utf-8', 'hex');
    encrypted += cipher.final('hex');

    // Guardamos el IV y el texto cifrado separados por dos puntos
    return `\({iv.toString('hex')}:\){encrypted}`;
}