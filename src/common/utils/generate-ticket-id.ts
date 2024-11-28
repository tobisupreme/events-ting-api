import { customAlphabet } from 'nanoid';

const CUSTOM_CHARS = 'aeiou' + 'bcdfghjklmnpqrstvwxyz';

function generateShortCode(charLen = 6): string {
    const nanoid = customAlphabet(CUSTOM_CHARS, charLen);

    return nanoid();
}

export function generateTicketId(): string {
    return `${generateShortCode(4)}-${generateShortCode(4)}`;
}
