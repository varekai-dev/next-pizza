export const generateRandomCode = (length: number = 6): string => {
    const characters = '0123456789'
    const charactersLength = characters.length

    return Array.from({ length }, () =>
        characters.charAt(Math.floor(Math.random() * charactersLength))
    ).join('')
}
