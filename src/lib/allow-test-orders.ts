/** Server: allow POST /api/odoo/test-order when not production or ALLOW_TEST_ORDERS=1. */
export function allowTestOrders(): boolean {
  if (process.env.ALLOW_TEST_ORDERS === '1') return true
  if (process.env.NODE_ENV !== 'production') return true
  return false
}

/** Client: show “Create Test Order” in dev or when NEXT_PUBLIC_ALLOW_TEST_ORDERS=1. */
export function showTestOrderButton(): boolean {
  if (process.env.NEXT_PUBLIC_ALLOW_TEST_ORDERS === '1') return true
  if (process.env.NODE_ENV === 'development') return true
  return false
}
