import { ICemeteryOption } from '../interfaces/cemeteries'
import { ICertificate, ICertificateFile } from '../interfaces/certificate'
import { ICityOption } from '../interfaces/cities'
import { mapCemeteryDropdownToSelectOptions } from './options'

export const mapCertificateToEdit = ({
  cemeteriesOptions,
  certificate,
  certificateFile,
}: {
  certificate: ICertificate
  citiesOptions: ICityOption[]
  cemeteriesOptions: ICemeteryOption[]
  certificateFile: ICertificateFile
}) => {
  const foundCemetery = cemeteriesOptions.find((cemetery) => cemetery.cemeteryId === certificate.cemeteryId)

  console.log(foundCemetery)

  return {
    firstName: certificate.firstName,
    lastName: certificate.lastName,
    dateOfBirth: certificate.dateOfBirth,
    placeOfBirth: certificate.placeOfBirth,
    dateOfDeath: certificate.dateOfDeath,
    placeOfDeath: certificate.placeOfDeath,
    biography: certificate.biography,
    city: '',
    cemetery: foundCemetery ? mapCemeteryDropdownToSelectOptions([foundCemetery])[0] : '',
    profileImage: certificate.profileImage,
    videos: certificateFile.videos,
    images: certificateFile.images,
  }
}
