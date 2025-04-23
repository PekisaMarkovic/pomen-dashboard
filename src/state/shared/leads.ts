import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { Nullable, Paginated, ILead, IUpdateLeadStatus } from '@/src/interfaces'
import { State as AppState } from '@/src/state/store'

type State = {
  leads: Nullable<Paginated<ILead>>
  toConvertLead: Nullable<ILead>
}

const initialState: State = {
  leads: null,
  toConvertLead: null,
}

const LeadsSlice = createSlice({
  name: 'leads',
  initialState,
  reducers: {
    initializeLeads: () => initialState,

    setLeads: (state, action: PayloadAction<Paginated<ILead>>) => {
      state.leads = action.payload
    },

    addNewBlog: (state, action: PayloadAction<ILead>) => {
      if (state.leads) {
        state.leads.items = [action.payload, ...state.leads.items]
      }
    },

    removeLeads: (state) => {
      state.leads = null
    },

    setToConvertLead: (state, action: PayloadAction<ILead>) => {
      state.toConvertLead = action.payload
    },

    removeToConvertLead: (state) => {
      state.toConvertLead = null
    },

    updateLeadsStatus: (state, action: PayloadAction<IUpdateLeadStatus>) => {
      if (state.leads) {
        state.leads.items = state.leads.items.map((order) => {
          if (order.leadId === action.payload.leadId) {
            order.status = action.payload.status
          }

          return order
        })
      }
    },
  },
})

export const { initializeLeads, setLeads, removeLeads, addNewBlog, setToConvertLead, removeToConvertLead, updateLeadsStatus } = LeadsSlice.actions

export default LeadsSlice.reducer

export const selectLeads = (state: AppState) => state.leads
