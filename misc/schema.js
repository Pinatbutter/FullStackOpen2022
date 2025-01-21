const { gql } = require('graphql-tag');

const typeDefs = gql`
type User {
  username: String!
  favouriteGenre: String!
  id: ID!
}
type Token {
  value: String!
}
type Author {
  name: String!
  born: Int
  id: ID!
  booksWritten: Int!
}
type Book {
  title: String!
  published: Int!
  author: Author!
  id: ID!
  genres: [String!]!
}
type Mutation {
  addBook (
    title: String!,
    author: String!,
    published: Int!,
    genres: [String!]!
  ): Book
  editAuthor(
    name: String!
    setBornTo: Int!
  ): Author
  createUser(
    username: String!
    favouriteGenre: String!
  ): User
  login(
    username: String!
    password: String!
  ): Token
}
type Query {
  bookCount: Int!
  authorCount: Int!
  allBooks(author: String, genre: String): [Book!]!
  allAuthors: [Author!]!
  me: User!
}
type Subscription {
  bookAdded: Book!
}
`
module.exports = typeDefs