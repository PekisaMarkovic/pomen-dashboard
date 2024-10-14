const base = 'qrcodes'

const getQRcodeById = (id: number) => `${base}/${id}`
const patchQRcode = (id: number) => `${base}/${id}`
const deleteQRcode = (id: number) => `${base}/${id}`
const getQRcodeBySlug = (slug: string) => `${base}/slug/${slug}`
const getQRcodes = () => `${base}`
const createQRcode = () => `${base}`
const getQRcodeOptions = () => `${base}/options`

const QRcodesApis = {
  getQRcodes,
  getQRcodeOptions,
  getQRcodeById,
  deleteQRcode,
  patchQRcode,
  getQRcodeBySlug,
  createQRcode,
}

export default QRcodesApis
