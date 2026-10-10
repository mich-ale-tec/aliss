export function CapitalizarPalabra(cadena: string): string {
    if (cadena.length === 0) return '';
    const primerCaracter = cadena.charAt(0).toUpperCase();
    if (cadena.length === 1) return primerCaracter;
    return `${primerCaracter}${cadena.slice(1).toLowerCase()}`;
}
