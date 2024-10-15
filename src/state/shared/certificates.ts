import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { Nullable, Paginated } from '../../interfaces/general'
import { State as AppState } from '../store'
import { ICertificate, ICertificateFile, ICertificateOption } from '../../interfaces/certificate'

type State = {
  certificates: Nullable<Paginated<ICertificate>>
  toEditCertificate: Nullable<ICertificate>
  toEditCertificateFiles: Nullable<ICertificateFile>
  dropdownOptions: {
    options: ICertificateOption[]
    isLoad: boolean
  }
}

const initialState: State = {
  certificates: null,
  toEditCertificate: null,
  dropdownOptions: {
    options: [],
    isLoad: false,
  },
  toEditCertificateFiles: null,
}

const certificateSlice = createSlice({
  name: 'certificates',
  initialState,
  reducers: {
    initializeCertificates: () => initialState,

    setCertificates: (state, action: PayloadAction<Paginated<ICertificate>>) => {
      state.certificates = action.payload
    },

    addNewCertificate: (state, action: PayloadAction<ICertificate>) => {
      if (state.certificates) {
        state.certificates.items = [action.payload, ...state.certificates.items]
      }
    },

    setToEditCertificate: (state, action: PayloadAction<ICertificate>) => {
      state.toEditCertificate = action.payload
    },

    setCertificateDropdownOptions: (state, action: PayloadAction<ICertificateOption[]>) => {
      state.dropdownOptions = {
        isLoad: true,
        options: action.payload,
      }
    },

    removeToEditCertificate: (state) => {
      state.toEditCertificate = null
    },

    removeCertificates: (state) => {
      state.certificates = null
    },

    removeCertificateDropdownOptions: (state) => {
      state.dropdownOptions = { isLoad: false, options: [] }
    },

    setToEditCertificateFiles: (state, action: PayloadAction<ICertificateFile>) => {
      state.toEditCertificateFiles = action.payload
    },

    removetoEditCertificateFiles: (state) => {
      state.toEditCertificateFiles = null
    },
  },
})

export const {
  initializeCertificates,
  setCertificates,
  removeCertificates,
  addNewCertificate,
  setToEditCertificate,
  removeToEditCertificate,
  removeCertificateDropdownOptions,
  setToEditCertificateFiles,
  removetoEditCertificateFiles,
  setCertificateDropdownOptions,
} = certificateSlice.actions

export default certificateSlice.reducer

export const selectCertificates = (state: AppState) => state.certificates
