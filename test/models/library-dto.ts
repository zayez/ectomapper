export interface AuthorDTO {
  idAuthor: number
  nomeAutor: string
}

export interface CategoryDTO {
  idCategoria: number
  descricaoCategoria: string
}

export interface TagDTO {
  idTag: number
  nomeDescricaoTag: string
}

export interface BookDTO {
  idLivro: number
  tituloLivro: string
  autorLivro: AuthorDTO
  categoriaDescricao: CategoryDTO
  tagLivro: TagDTO[]
}
