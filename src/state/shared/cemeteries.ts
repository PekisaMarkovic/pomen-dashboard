import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { ICemetery, ICemeteryOption } from '../../interfaces/cemeteries'
import { Nullable, Paginated } from '../../interfaces/general'
import { State as AppState } from '../store'

type State = {
  cemeteries: Nullable<Paginated<ICemetery>>
  toEditCemetery: Nullable<ICemetery>
  dropdownOptions: {
    options: ICemeteryOption[]
    isLoad: boolean
  }
}

const initialState: State = {
  cemeteries: null,
  toEditCemetery: null,
  dropdownOptions: {
    options: [],
    isLoad: false,
  },
}

const cemeterySlice = createSlice({
  name: 'cemeteries',
  initialState,
  reducers: {
    initializeCemeteries: () => initialState,
    setCemeteries: (state, action: PayloadAction<Paginated<ICemetery>>) => {
      state.cemeteries = action.payload
    },
    addNewCemetery: (state, action: PayloadAction<ICemetery>) => {
      if (state.cemeteries) {
        state.cemeteries.items = [action.payload, ...state.cemeteries.items]
      }
    },
    setToEditCemetery: (state, action: PayloadAction<ICemetery>) => {
      state.toEditCemetery = action.payload
    },
    setCemeteryDropdownOptions: (state, action: PayloadAction<ICemeteryOption[]>) => {
      state.dropdownOptions = {
        isLoad: true,
        options: action.payload,
      }
    },
    removeToEditCemetery: (state) => {
      state.toEditCemetery = null
    },
    removeCemeteries: (state) => {
      state.cemeteries = null
    },
    removeCemeteryDropdownOptions: (state) => {
      state.dropdownOptions = { isLoad: false, options: [] }
    },
  },
})

export const {
  initializeCemeteries,
  setCemeteries,
  removeCemeteries,
  addNewCemetery,
  setToEditCemetery,
  removeToEditCemetery,
  removeCemeteryDropdownOptions,
  setCemeteryDropdownOptions,
} = cemeterySlice.actions

export default cemeterySlice.reducer

export const selectCemeteries = (state: AppState) => state.cemeteries
