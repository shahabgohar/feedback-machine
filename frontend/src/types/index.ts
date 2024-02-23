export interface Paginate {
  current_page: number
  records_from: number
  records_to: number
  records_total: number
  total_pages: number
}

export interface User {
  email: string
  name: string
  id?: string
}
