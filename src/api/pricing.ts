const base = 'pricings'

const getPricingsById = (id: number) => `${base}/${id}`
const patchPricing = (id: number) => `${base}/${id}`
const deletePricing = (id: number) => `${base}/${id}`
const getPricingsBySlug = (slug: string) => `${base}/slug/${slug}`
const getPricings = () => `${base}`
const createPricing = () => `${base}`
const getPricingOptions = () => `${base}/options`

const PricingsApis = {
  getPricings,
  getPricingsById,
  patchPricing,
  getPricingsBySlug,
  deletePricing,
  createPricing,
  getPricingOptions,
}

export default PricingsApis
