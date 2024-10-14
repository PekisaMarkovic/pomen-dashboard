const base = 'cities'

const getCitiesById = (id: number) => `${base}/${id}`
const patchCity = (id: number) => `${base}/${id}`
const deleteCity = (id: number) => `${base}/${id}`
const getCitiesBySlug = (slug: string) => `${base}/slug/${slug}`
const getCities = () => `${base}`
const createCity = () => `${base}`
const getCityOptions = () => `${base}/options`

const CitiesApis = {
  getCities,
  getCitiesById,
  deleteCity,
  patchCity,
  getCitiesBySlug,
  createCity,
  getCityOptions,
}

export default CitiesApis
