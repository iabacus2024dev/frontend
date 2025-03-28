export function formatPrice(value) {
  return `₩${parseFloat(value)
    .toFixed(0)
    .replace(/\d(?=(\d{3})+$)/g, '$&,')}`
}
