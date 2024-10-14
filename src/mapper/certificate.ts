import { ICemeteryOption } from '../interfaces/cemeteries'
import { ICertificate } from '../interfaces/certificate'
import { ICityOption } from '../interfaces/cities'

export const mapCertificateToEdit = (certificate: ICertificate, citiesOptions: ICityOption[], cemeteriesOptions: ICemeteryOption[]) => {
  const foundCity = citiesOptions.find((city) => city.cityId === certificate.cemetery?.cityId)
  const foundCemetery = cemeteriesOptions.find((cemetery) => cemetery.cemeteryId === certificate.cemeteryId)

  return {
    firstName: certificate.firstName,
    lastName: certificate.lastName,
    dateOfBirth: certificate.dateOfBirth,
    placeOfBirth: certificate.placeOfBirth,
    dateOfDeath: certificate.dateOfDeath,
    placeOfDeath: certificate.placeOfDeath,
    biography: certificate.biography,
    city: foundCity || '',
    cemetery: foundCemetery || '',
  }
}
