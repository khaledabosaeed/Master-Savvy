/** JSON-RPC 2.0 envelope for Odoo /jsonrpc */
export type OdooJsonRpcRequest = {
  jsonrpc: '2.0'
  method: 'call'
  params: {
    service: string
    method: string
    args: unknown[]
  }
  id: number
}

export type OdooJsonRpcErrorBody = {
  code: number
  message: string
  data?: unknown
}

export type OdooJsonRpcResponse<T> = {
  jsonrpc: '2.0'
  id: number | null
  result?: T
  error?: OdooJsonRpcErrorBody
}

/** Raw row from product.template search_read / read */
export type OdooProductRecord = {
  id?: number
  name?: string | false
  list_price?: number | false
  default_code?: string | false
  description_sale?: string | false
}

/** Public API shape (camelCase) */
export type NormalizedOdooProduct = {
  id: number
  name: string
  listPrice: number | null
  defaultCode: string | null
  descriptionSale: string | null
  /** Same-origin URL to `/api/odoo/product-image` (proxy returns 404 if the template has no image) */
  imageUrl: string | null
}
