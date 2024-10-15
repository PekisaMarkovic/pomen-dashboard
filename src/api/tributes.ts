const base = 'tributes'

const getTributesById = (id: number) => `${base}/${id}`
const getTributesByCertificateId = (id: number) => `${base}/certificates/${id}`
const patchTribute = (id: number) => `${base}/${id}`
const deleteTribute = (id: number) => `${base}/${id}`
const getTributesBySlug = (slug: string) => `${base}/slug/${slug}`
const getTributes = () => `${base}`
const createTribute = () => `${base}`
const getTributeOptions = () => `${base}/options`

const TributesApis = {
  getTributes,
  getTributesById,
  getTributesByCertificateId,
  deleteTribute,
  patchTribute,
  getTributesBySlug,
  createTribute,
  getTributeOptions,
}

export default TributesApis
