const base = 'countries'

const getCountryById = (id: number) => `${base}/${id}`
const patchCountry = (id: number) => `${base}/${id}`
const deleteCountry = (id: number) => `${base}/${id}`
const getCountryBySlug = (slug: string) => `${base}/slug/${slug}`
const getCountries = () => `${base}`
const createCountry = () => `${base}`
const getCountryOptions = () => `${base}/options`

const CountriesApis = {
  getCountries,
  getCountryOptions,
  getCountryById,
  deleteCountry,
  patchCountry,
  getCountryBySlug,
  createCountry,
}

export default CountriesApis
