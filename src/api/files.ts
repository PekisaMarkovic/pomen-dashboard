const base = 'files'

const single = () => `${base}/single`
const multy = () => `${base}/multy`
const uploadCertificateProfile = (id: number) => `${base}/certificate-profile/${id}`
const uploadUserProfile = (id: number) => `${base}/user-profile/${id}`
const uploadFilesByBlogContentId = (id: number) => `${base}/blog-content/${id}`
const uploadCertificateFiles = (id: number) => `${base}/certificate-files/${id}`
const getFilesByCertificateId = (id: number) => `${base}/certificates/${id}`

const FileApis = {
  multy,
  single,
  uploadCertificateProfile,
  uploadUserProfile,
  getFilesByCertificateId,
  uploadCertificateFiles,
  uploadFilesByBlogContentId,
}

export default FileApis
