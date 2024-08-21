export interface Book {
  id: number
  title: string
  author: string
  category: string
  tags: string[]
}

export interface Shelf {
  id?: number
  name?: string
  books: Book[]
}
