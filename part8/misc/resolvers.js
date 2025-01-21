const { PubSub } = require('graphql-subscriptions')
const pubsub = new PubSub()
const Book = require('./models/book.js');
const Author = require('./models/author.js');
const User = require('./models/user.js');
const jwt = require('jsonwebtoken')

const JWT_SECRET = 'NEED_Protein'

const resolvers = {
    Query: {
      bookCount: () => Book.collection.countDocuments(),
      authorCount: () => Author.collection.countDocuments(),
      allBooks: async (root, args) => {
        const books = args.genre === undefined? await Book.find({}).populate('author') : await Book.find({genres: {$in: args.genre}}).populate('author');
        if(args.author !== undefined)
          return books.filter((b) => b.author.name === args.author)
        return books;
      },
      allAuthors: async () => {
        const author = await Author.find({}).populate('booksWritten')
        console.log(author)
        
        return author
      },
      me: (root, args, context) => {
        return context.currentUser
      }
    },
 /*   Author: {
      booksWritten : async (root) => {
        const list = await Book.find({author: root._id})
        return list
      }
    },*/
    Mutation: {
      addBook: async (root, args, context) => {
        const currentUser = context.currentUser
        if (!currentUser) {
          throw new AuthenticationError("not authenticated")
        }
        let authorId = await Author.findOne({ name: args.author });
        if (!authorId) {
          const author = new Author({ name: args.author })
          try{
            authorId = await author.save()
          }catch(error){
            throw new UserInputError(error.message, {
            invalidArgs: args,
          })
          }
        }
        const book = new Book({ ...args, author: authorId })
        try { book.save()
        } catch (error) {
          throw new UserInputError(error.message, {
            invalidArgs: args,
          })
        }
        pubsub.publish('BOOK_ADDED', { bookAdded: book })
        return book
      },
      editAuthor: async (root, args, context) => {
        const currentUser = context.currentUser
        if (!currentUser) {
          throw new AuthenticationError("not authenticated")
        }
        const authors = await Author.findOneAndUpdate({name: args.name}, { $set: {born: args.setBornTo}}, {new: true} ).catch ((error)=>{
          throw new UserInputError(error.message, {
            invalidArgs: args,
          })
        })
        return authors;
      },
      createUser: async (root, args) => {
        const user = new User({ username: args.username, favouriteGenre: args.favouriteGenre })
  
        return user.save()
          .catch(error => {
            throw new UserInputError(error.message, {
              invalidArgs: args,
            })
          })
      },
      login: async (root, args) => {
        const user = await User.findOne({ username: args.username })
        if ( !user ) {
          throw new UserInputError("user not found")
        }
        if( args.password !== 'secret' ) {
          throw new UserInputError("wrong credentials")
        }
        const userForToken = {
          username: user.username,
          id: user._id,
        }
        return { value: jwt.sign(userForToken, JWT_SECRET) }
      },
    },
    Subscription: {
      bookAdded: {
        subscribe: () => pubsub.asyncIterator('BOOK_ADDED')
      },
    },
  }

  module.exports = resolvers