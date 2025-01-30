const base = 'contacts'

const getContactsById = (id: number) => `${base}/${id}`
const deleteContact = (id: number) => `${base}/${id}`
const patchContact = (id: number) => `${base}/${id}`
const patchContactStatus = (id: number) => `${base}/${id}/status`
const getContacts = () => `${base}`

const ContactApis = {
  getContactsById,
  deleteContact,
  getContacts,
  patchContact,
  patchContactStatus,
}

export default ContactApis
