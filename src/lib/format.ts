/** Format a number as Indonesian Rupiah, e.g. "Rp 1.800.000.000". */
export function formatRupiah(value: number): string {
  return 'Rp ' + Math.round(value).toLocaleString('id-ID')
}
