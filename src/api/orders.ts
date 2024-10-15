const base = 'orders'

const getOrdersById = (id: number) => `${base}/${id}`
const patchOrder = (id: number) => `${base}/${id}`
const patchOrderStatus = (id: number) => `${base}/${id}/status`
const deleteOrder = (id: number) => `${base}/${id}`
const getOrdersBySlug = (slug: string) => `${base}/slug/${slug}`
const getOrders = () => `${base}`
const createOrder = () => `${base}`

const OrdersApis = {
  getOrders,
  getOrdersById,
  deleteOrder,
  patchOrder,
  getOrdersBySlug,
  createOrder,
  patchOrderStatus,
}

export default OrdersApis
