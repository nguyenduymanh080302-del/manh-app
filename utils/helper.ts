export const formatMoney = (value: number, separator: string = ','): string => {
    return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, separator);
}