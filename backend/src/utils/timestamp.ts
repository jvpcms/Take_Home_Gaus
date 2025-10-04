/**
 * Return Unix timestamp 15 minutes in the future from now
 *
 * @returns The timestamp
 */
export function getTimestamp15MinFromNow(): number {
    const now = new Date();
    const timestamp15MinFromNow = now.getTime() + 15 * 60 * 1000;
    return timestamp15MinFromNow;
}

/**
 * Check if a input timestamp is expired
 *
 * @param timestamp Unix timestamp to be checked.
 * @returns False if param is in the past, true otherwise.
 */
export function isExpired(timestamp: string): boolean {
    return Date.now() > parseInt(timestamp, 10);
}

/**
 *
 * @returns Current Unix timestamp
 */
export function getTimestamp(): number {
    return Date.now();
}

/**
 *
 * @returns Current ISO string
 */
export function getIsoString(): string {
    return new Date().toISOString();
}
