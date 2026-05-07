// WhatsApp configuration for promo landing page
export const WA_NUMBER = '6281234567890'

export function getWaLink(message: string): string {
  return `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(message)}`
}
