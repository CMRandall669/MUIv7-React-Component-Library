export function formatWithCommas(value: number): string {
    return new Intl.NumberFormat('en-US').format(value);
}