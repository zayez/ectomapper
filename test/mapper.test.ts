import test from "node:test"
import assert from "node:assert"
import booksJSON from "./data/books.json"
import { createAutoMapper } from "../src/mapper"
import { BookDTO } from "./models/library-dto"
import { Book, Shelf } from "./models/library"

const booksDTO = booksJSON as unknown as BookDTO[]

const autoMapper = createAutoMapper()

autoMapper.createMap<BookDTO, Book>("BookDTO", "Book", (source) => ({
  author: source?.autorLivro?.nomeAutor,
  id: source?.idLivro,
  title: source?.tituloLivro,
  category: source?.categoriaDescricao?.descricaoCategoria,
  tags: source.tagLivro.map((x) => x.nomeDescricaoTag),
}))

autoMapper.createMap<BookDTO[], Shelf>("BookDTOArray", "Shelf", (source) => ({
  books: source.map((x) => autoMapper.map(x, "BookDTO", "Book")),
  id: 1,
  name: "Books",
}))

const shelf = autoMapper.map<BookDTO[], Shelf>(
  booksDTO,
  "BookDTOArray",
  "Shelf"
)

test("shelf and books should have the same length", () => {
  assert.strictEqual(shelf?.books.length, booksDTO.length)
})

test("shelf and books should have the same titles", () => {
  const bookTitles1 = booksDTO.map((x) => x.tituloLivro)
  const bookTitles2 = shelf?.books.map((x) => x.title)

  assert.deepEqual(bookTitles1, bookTitles2)
})

test("shelf and books should have the same authors", () => {
  const bookAuthors1 = booksDTO.map((x) => x?.autorLivro?.nomeAutor)
  const bookAuthors2 = shelf?.books.map((x) => x.author)

  assert.deepEqual(bookAuthors1, bookAuthors2)
})

test("each book should have the same category", () => {
  booksDTO.forEach((bookDTO) => {
    const book = shelf.books.find((x) => x.title === bookDTO.tituloLivro)

    assert.strictEqual(bookDTO.tituloLivro, book?.title)
  })
})

test("each book should have the same tags", () => {
  booksDTO.forEach((bookDTO) => {
    const book = shelf.books.find((x) => x.title === bookDTO.tituloLivro)

    assert.deepEqual(
      bookDTO.tagLivro.map((y) => y.nomeDescricaoTag),
      book?.tags
    )
  })
})
