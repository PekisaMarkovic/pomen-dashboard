import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { Nullable, Paginated } from '../../interfaces/general'
import { State as AppState } from '../store'
import { ICity, ICityOption } from '../../interfaces/cities'

type State = {
  cities: Nullable<Paginated<ICity>>
  toEditCity: Nullable<ICity>
  dropdownOptions: {
    options: ICityOption[]
    isLoad: boolean
  }
}

const initialState: State = {
  cities: null,
  toEditCity: null,
  dropdownOptions: {
    options: [],
    isLoad: false,
  },
}

const citySlice = createSlice({
  name: 'cities',
  initialState,
  reducers: {
    initializeCities: () => initialState,

    setCities: (state, action: PayloadAction<Paginated<ICity>>) => {
      state.cities = action.payload
    },

    addNewCity: (state, action: PayloadAction<ICity>) => {
      if (state.cities) {
        state.cities.items = [action.payload, ...state.cities.items]
      }
    },

    setToEditCity: (state, action: PayloadAction<ICity>) => {
      state.toEditCity = action.payload
    },

    setCityDropdownOptions: (state, action: PayloadAction<ICityOption[]>) => {
      state.dropdownOptions = {
        isLoad: true,
        options: action.payload,
      }
    },

    removeToEditCity: (state) => {
      state.toEditCity = null
    },

    removeCities: (state) => {
      state.cities = null
    },

    removeCityDropdownOptions: (state) => {
      state.dropdownOptions = { isLoad: false, options: [] }
    },

    updateCity: (state, action: PayloadAction<Partial<ICity>>) => {
      if (state.cities && action.payload.cityId) {
        state.cities.items = state.cities.items.map((city) => {
          if (city.cityId === city.cityId) {
            return { ...city, ...action.payload }
          }
          return city
        })
      }
    },
  },
})

export const {
  initializeCities,
  setCities,
  removeCities,
  addNewCity,
  setToEditCity,
  removeToEditCity,
  removeCityDropdownOptions,
  updateCity,
  setCityDropdownOptions,
} = citySlice.actions

export default citySlice.reducer

export const selectCities = (state: AppState) => state.cities
