
import { gql } from '@apollo/client'

const BOOK_DETAILS = gql`
  fragment BookDetails on Book {
    title
    published
    genres
    author {
      name
      id
    }
    id
  }
`
export const ADD_BOOK = gql`
mutation addBook($published: Int!, $genres: [String!]!, $author: String!, $title: String!){
  addBook (published: $published, genres: $genres, author: $author, title: $title){
    ...BookDetails
  }
}
${BOOK_DETAILS}
`
export const BOOK_ADDED = gql`
subscription Subscription{
  bookAdded {
    ...BookDetails
  }
}
${BOOK_DETAILS}
`

export const EDIT_AUTHOR = gql`
mutation editAuthor($name: String!, $setBornTo: Int!){
  editAuthor (name: $name, setBornTo: $setBornTo){
    name
  }
}
`
export const LOGIN = gql`
mutation Login($username: String!, $password: String!) {
  login(username: $username, password: $password) {
    value
  }
}
`
export const  ME = gql`
query Me {
  me {
    favouriteGenre
  }
}`

export const ALL_AUTHORS = gql`
query GetAuthors{
  allAuthors {
    name
    born
    id
    booksWritten
  }
}
`
export const ALL_BOOKS = gql`
query GetBooks($genre: String){
  allBooks(genre: $genre){
    ...BookDetails
  }
}
${BOOK_DETAILS}
`