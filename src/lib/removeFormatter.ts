export const removeCurrencyFormat = (currencyString: string) => {
    const cleanedString = currencyString.replace(/Rp\s|,/g, '')
    const noThousandsSeparator = cleanedString.replace(/\./g, '')
    const numericValue = parseFloat(noThousandsSeparator)

    return numericValue
}
