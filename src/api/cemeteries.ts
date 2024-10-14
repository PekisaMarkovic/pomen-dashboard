const base = 'cemeteries'

const getCemeteriesById = (id: number) => `${base}/${id}`
const patchCemetery = (id: number) => `${base}/${id}`
const deleteCemetery = (id: number) => `${base}/${id}`
const getCemeteriesBySlug = (slug: string) => `${base}/slug/${slug}`
const getCemeteries = () => `${base}`
const createCemetery = () => `${base}`
const getCemeteryOptions = () => `${base}/options`

const CemeteriesApis = {
  getCemeteries,
  getCemeteriesById,
  deleteCemetery,
  patchCemetery,
  getCemeteriesBySlug,
  createCemetery,
  getCemeteryOptions,
}

export default CemeteriesApis
