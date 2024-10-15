const base = 'getherings'

const getGetheringsById = (id: number) => `${base}/${id}`
const getGetheringsByCertificateId = (id: number) => `${base}/certificates/${id}`
const patchGethering = (id: number) => `${base}/${id}`
const deleteGethering = (id: number) => `${base}/${id}`
const getGetheringsBySlug = (slug: string) => `${base}/slug/${slug}`
const getGetherings = () => `${base}`
const createGethering = () => `${base}`
const getGetheringOptions = () => `${base}/options`

const GetheringsApis = {
  getGetherings,
  getGetheringsById,
  getGetheringsByCertificateId,
  deleteGethering,
  patchGethering,
  getGetheringsBySlug,
  createGethering,
  getGetheringOptions,
}

export default GetheringsApis
