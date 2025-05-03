import { ICemeteryOption, ICertificate, ICertificateFile, ICityOption } from '@/src/interfaces'
import { mapSingleCemeteryDropdownToSelectOptions, mapSingleCityDropdownToSelectOptions } from '@/src/mapper/options'

export const mapCertificateToEdit = ({
  cemeteriesOptions,
  certificate,
  certificateFile,
  citiesOptions,
}: {
  certificate: ICertificate
  citiesOptions: ICityOption[]
  cemeteriesOptions: ICemeteryOption[]
  certificateFile: ICertificateFile
}) => {
  const foundCemetery = cemeteriesOptions.find((cemetery) => cemetery.cemeteryId === certificate.cemeteryId)
  let foundCity = undefined

  if (foundCemetery) {
    foundCity = citiesOptions.find((city) => foundCemetery?.cityId === city.cityId)
  }

  return {
    firstName: certificate.firstName,
    lastName: certificate.lastName,
    dateOfBirth: `${certificate.dateOfBirth}`,
    placeOfBirth: certificate.placeOfBirth,
    dateOfDeath: `${certificate.dateOfDeath}`,
    placeOfDeath: certificate.placeOfDeath,
    biography: certificate.biography,
    city: foundCity ? mapSingleCityDropdownToSelectOptions(foundCity) : '',
    cemetery: foundCemetery ? mapSingleCemeteryDropdownToSelectOptions(foundCemetery) : '',
    profileImage: certificate.profileImage!,
    videos: certificateFile.videos,
    images: certificateFile.images,
  }
}
