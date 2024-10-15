import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { Nullable, Paginated } from '../../interfaces/general'
import { State as AppState } from '../store'
import { IOrder, IUpdateOrderStatus } from '../../interfaces/orders'

type State = {
  orders: Nullable<Paginated<IOrder>>
  toEditOrder: Nullable<IOrder>
}

const initialState: State = {
  orders: null,
  toEditOrder: null,
}

const orderlice = createSlice({
  name: 'orders',
  initialState,
  reducers: {
    initializeOrders: () => initialState,

    setOrders: (state, action: PayloadAction<Paginated<IOrder>>) => {
      state.orders = action.payload
    },

    addNewOrder: (state, action: PayloadAction<IOrder>) => {
      if (state.orders) {
        state.orders.items = [action.payload, ...state.orders.items]
      }
    },

    setToEditOrder: (state, action: PayloadAction<IOrder>) => {
      state.toEditOrder = action.payload
    },

    removeToEditOrder: (state) => {
      state.toEditOrder = null
    },

    removeOrders: (state) => {
      state.orders = null
    },

    updateOrderStatus: (state, action: PayloadAction<IUpdateOrderStatus>) => {
      if (state.orders) {
        state.orders.items = state.orders.items.map((order) => {
          if (order.orderId === action.payload.orderId) {
            order.status = action.payload.status
          }

          return order
        })
      }
    },
  },
})

export const { initializeOrders, setOrders, removeOrders, addNewOrder, setToEditOrder, removeToEditOrder, updateOrderStatus } = orderlice.actions

export default orderlice.reducer

export const selectOrder = (state: AppState) => state.orders
