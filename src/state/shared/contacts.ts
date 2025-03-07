import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { IContact, IUpdateContactStatus, Nullable, Paginated } from '@/src/interfaces'
import { State as AppState } from '@/src/state/store'

type State = {
  contacts: Nullable<Paginated<IContact>>
  toEditContacts: Nullable<IContact>
}

const initialState: State = {
  contacts: null,
  toEditContacts: null,
}

const contactSlice = createSlice({
  name: 'contacts',
  initialState,
  reducers: {
    initializeContacts: () => initialState,

    setContacts: (state, action: PayloadAction<Paginated<IContact>>) => {
      state.contacts = action.payload
    },

    addNewContact: (state, action: PayloadAction<IContact>) => {
      if (state.contacts) {
        state.contacts.items = [action.payload, ...state.contacts.items]
      }
    },

    setToEditContact: (state, action: PayloadAction<IContact>) => {
      state.toEditContacts = action.payload
    },

    updateContactStatus: (state, action: PayloadAction<IUpdateContactStatus>) => {
      if (state.contacts) {
        state.contacts.items = state.contacts.items.map((order) => {
          if (order.contactId === action.payload.contactId) {
            order.status = action.payload.status
          }

          return order
        })
      }
    },
  },
})

export const { setToEditContact, addNewContact, setContacts, initializeContacts, updateContactStatus } = contactSlice.actions

export default contactSlice.reducer

export const selectContacts = (state: AppState) => state.contacts
