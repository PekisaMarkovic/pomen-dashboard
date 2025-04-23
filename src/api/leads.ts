const base = 'leads'

const getLeadById = (id: number) => `${base}/${id}`
const deleteLead = (id: number) => `${base}/${id}`
const getLeads = () => `${base}`
const createLead = () => `${base}`
const patchLeadStatus = (id: number) => `${base}/${id}/status`

const LeadsApis = {
  getLeads,
  deleteLead,
  getLeadById,
  createLead,
  patchLeadStatus,
}

export default LeadsApis
