import { AxiosInstance } from 'axios'
import { IImage } from '../interfaces/image'
import ImageApis from '../api/images'

const toBase64 = (file: File) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = () => resolve(reader.result)
    reader.onerror = reject
  })

export const onSingleFileInput = async (api: AxiosInstance, file: File) => {
  const base64 = (await toBase64(file)) as string

  const formData = new FormData()

  formData.append('file', base64)

  return api.post<IImage>(ImageApis.single(), formData)
}

export const onMultyFileInput = async (api: AxiosInstance, files: File[]) => {
  const base64Promises = files.map((file) => toBase64(file) as Promise<string>)

  try {
    const base64Files = await Promise.all(base64Promises)

    const formData = new FormData()

    base64Files.map((file, i) => {
      formData.append(`files[${i}]`, file)
    })

    return api.post<IImage[]>(ImageApis.multy(), formData)
  } catch (error) {
    console.error('Error uploading files:', error)
    throw error
  }
}
