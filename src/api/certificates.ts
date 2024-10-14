const base = 'certificates'

const getCertificatesById = (id: number) => `${base}/${id}`
const patchCertificate = (id: number) => `${base}/${id}`
const deleteCertificate = (id: number) => `${base}/${id}`
const getCertificatesBySlug = (slug: string) => `${base}/slug/${slug}`
const getCertificates = () => `${base}`
const createCertificate = () => `${base}`
const createCertificateNewUser = () => `${base}/new-user`
const getCertificateOptions = () => `${base}/options`

const CertificatesApis = {
  getCertificates,
  getCertificatesById,
  deleteCertificate,
  patchCertificate,
  getCertificatesBySlug,
  createCertificate,
  getCertificateOptions,
  createCertificateNewUser,
}

export default CertificatesApis
