const base = 'files'

const single = () => `${base}/single`
const multy = () => `${base}/multy`
const uploadCertificateProfile = (id: number) => `${base}/certificate-profile/${id}`
const uploadCertificateFiles = (id: number) => `${base}/certificate-files/${id}`
const getFilesByCertificateId = (id: number) => `${base}/certificates/${id}`

const FileApis = {
  multy,
  single,
  uploadCertificateProfile,
  getFilesByCertificateId,
  uploadCertificateFiles,
}

export default FileApis
