import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { Nullable, Paginated, IPricing, IPricingOption } from '@/src/interfaces'
import { State as AppState } from '@/src/state/store'

type State = {
  pricings: Nullable<Paginated<IPricing>>
  toEditPricing: Nullable<IPricing>
  dropdownOptions: {
    options: IPricingOption[]
    isLoad: boolean
  }
}

const initialState: State = {
  pricings: null,
  toEditPricing: null,
  dropdownOptions: {
    options: [],
    isLoad: false,
  },
}

const pricingSlice = createSlice({
  name: 'pricings',
  initialState,
  reducers: {
    initializePricings: () => initialState,

    setPricings: (state, action: PayloadAction<Paginated<IPricing>>) => {
      state.pricings = action.payload
    },

    addNewPricing: (state, action: PayloadAction<IPricing>) => {
      if (state.pricings) {
        state.pricings.items = [action.payload, ...state.pricings.items]
      }
    },

    setToEditPricing: (state, action: PayloadAction<IPricing>) => {
      state.toEditPricing = action.payload
    },

    setPricingDropdownOptions: (state, action: PayloadAction<IPricingOption[]>) => {
      state.dropdownOptions = {
        isLoad: true,
        options: action.payload,
      }
    },

    removeToEditPricing: (state) => {
      state.toEditPricing = null
    },

    removePricings: (state) => {
      state.pricings = null
    },

    removePricingDropdownOptions: (state) => {
      state.dropdownOptions = { isLoad: false, options: [] }
    },

    updatePricing: (state, action: PayloadAction<Partial<IPricing>>) => {
      if (state.pricings && action.payload.pricingId) {
        state.pricings.items = state.pricings.items.map((obj) => {
          if (obj.pricingId === obj.pricingId) {
            return { ...obj, ...action.payload }
          }
          return obj
        })
      }
    },
  },
})

export const {
  initializePricings,
  setPricings,
  removePricings,
  addNewPricing,
  setToEditPricing,
  removeToEditPricing,
  removePricingDropdownOptions,
  updatePricing,
  setPricingDropdownOptions,
} = pricingSlice.actions

export default pricingSlice.reducer

export const selectPricings = (state: AppState) => state.pricings
