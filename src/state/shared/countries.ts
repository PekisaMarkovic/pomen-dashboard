import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { ICountry, ICountryOption } from '../../interfaces/country'
import { Nullable, Paginated } from '../../interfaces/general'
import { State as AppState } from '../store'

type State = {
  countries: Nullable<Paginated<ICountry>>
  toEditCountry: Nullable<ICountry>
  dropdownOptions: {
    options: ICountryOption[]
    isLoad: boolean
  }
}

const initialState: State = {
  countries: null,
  toEditCountry: null,
  dropdownOptions: {
    options: [],
    isLoad: false,
  },
}

const countrySlice = createSlice({
  name: 'countries',
  initialState,
  reducers: {
    initializeCountries: () => initialState,

    setCountries: (state, action: PayloadAction<Paginated<ICountry>>) => {
      state.countries = action.payload
    },

    addNewCountry: (state, action: PayloadAction<ICountry>) => {
      if (state.countries) {
        state.countries.items = [action.payload, ...state.countries.items]
      }
    },

    setToEditCountry: (state, action: PayloadAction<ICountry>) => {
      state.toEditCountry = action.payload
    },

    setCountryDropdownOptions: (state, action: PayloadAction<ICountryOption[]>) => {
      state.dropdownOptions = {
        isLoad: true,
        options: action.payload,
      }
    },

    removeToEditCountry: (state) => {
      state.toEditCountry = null
    },

    removeCountries: (state) => {
      state.countries = null
    },

    removeCountryDropdownOptions: (state) => {
      state.dropdownOptions = { isLoad: false, options: [] }
    },

    updateCountry: (state, action: PayloadAction<Partial<ICountry>>) => {
      if (state.countries && action.payload.countryId) {
        state.countries.items = state.countries.items.map((country) => {
          if (country.countryId === country.countryId) {
            return { ...country, ...action.payload }
          }
          return country
        })
      }
    },
  },
})

export const {
  initializeCountries,
  setCountries,
  removeCountries,
  addNewCountry,
  setToEditCountry,
  removeToEditCountry,
  removeCountryDropdownOptions,
  setCountryDropdownOptions,
  updateCountry,
} = countrySlice.actions

export default countrySlice.reducer

export const selectCountry = (state: AppState) => state.countries
