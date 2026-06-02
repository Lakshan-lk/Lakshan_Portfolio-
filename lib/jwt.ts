import crypto from "crypto";

function base64url(str: Buffer | string): string {
    const buf = Buffer.isBuffer(str) ? str : Buffer.from(str);
    return buf.toString("base64")
        .replace(/=/g, "")
        .replace(/\+/g, "-")
        .replace(/\//g, "_");
}

function base64urlDecode(str: string): string {
    let base64 = str.replace(/-/g, "+").replace(/_/g, "/");
    while (base64.length % 4) {
        base64 += "=";
    }
    return Buffer.from(base64, "base64").toString("utf8");
}

/**
 * Signs a payload to create a secure HS256 JWT string.
 */
export function signJWT(payload: any, secret: string, expiresInSeconds: number = 86400): string {
    const header = { alg: "HS256", typ: "JWT" };
    
    // Add expiration timestamp
    const exp = Math.floor(Date.now() / 1000) + expiresInSeconds;
    const finalPayload = { ...payload, exp };

    const headerBase64 = base64url(JSON.stringify(header));
    const payloadBase64 = base64url(JSON.stringify(finalPayload));
    
    const signatureInput = `${headerBase64}.${payloadBase64}`;
    const hmac = crypto.createHmac("sha256", secret);
    hmac.update(signatureInput);
    const signatureBase64 = base64url(hmac.digest());

    return `${headerBase64}.${payloadBase64}.${signatureBase64}`;
}

/**
 * Verifies a JWT and returns the decoded payload, or null if invalid/expired.
 */
export function verifyJWT(token: string, secret: string): any | null {
    if (!token) return null;
    
    try {
        const parts = token.split(".");
        if (parts.length !== 3) return null;

        const [headerBase64, payloadBase64, signatureBase64] = parts;
        const signatureInput = `${headerBase64}.${payloadBase64}`;
        
        const hmac = crypto.createHmac("sha256", secret);
        hmac.update(signatureInput);
        const expectedSignatureBase64 = base64url(hmac.digest());

        // Secure constant-time comparison to prevent timing attacks
        const signatureBuffer = Buffer.from(signatureBase64);
        const expectedBuffer = Buffer.from(expectedSignatureBase64);
        
        if (signatureBuffer.length !== expectedBuffer.length || !crypto.timingSafeEqual(signatureBuffer, expectedBuffer)) {
            return null;
        }

        const payload = JSON.parse(base64urlDecode(payloadBase64));
        
        // Check expiration
        if (payload.exp && Math.floor(Date.now() / 1000) > payload.exp) {
            return null; // Expired
        }

        return payload;
    } catch (err) {
        console.error("JWT verification failed:", err);
        return null;
    }
}
