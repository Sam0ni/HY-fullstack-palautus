const { ApolloServer } = require("@apollo/server");
const { startStandaloneServer } = require("@apollo/server/standalone");
const { GraphQLError } = require("graphql");
const jwt = require("jsonwebtoken");

const mongoose = require("mongoose");
mongoose.set("strictQuery", false);
const Author = require("./library-author-schema");
const Book = require("./library-book-schema");
const User = require("./library-user-schema");

require("dotenv").config();

const MONGODB_URI = process.env.MONGODB_URI;

mongoose
  .connect(MONGODB_URI)
  .then(() => {
    console.log("connected to db");
  })
  .catch((error) => {
    console.log("error connecting to db! ", error.message);
  });

const typeDefs = `
  type Query {
    bookCount: Int!
    authorCount: Int!
    allBooks(author: String, genre: String): [Book!]!
    allAuthors: [Author!]!
    me: User
  },
  type Book {
  title: String!
  published: Int!
  author: Author!
  id: ID!
  genres: [String!]!
  },
  type Author {
  name: String!
  id: ID!
  born: Int
  bookCount: Int!
  },
  type Mutation {
  addBook(
  title: String!
  published: Int!
  author: String!
  genres: [String!]!
  ): Book
  editAuthor(
  name: String!
  setBornTo: Int!
  ): Author
  createUser(
    username: String!
    favoriteGenre: String!
  ): User
  login(
    username: String!
    password: String!
  ): Token
  },
  type User {
  username: String!
  favoriteGenre: String!
  id: ID!
},type Token {
  value: String!
}
`;

const resolvers = {
  Query: {
    bookCount: async () => Book.collection.countDocuments(),
    authorCount: async () => Author.collection.countDocuments(),
    allBooks: async (root, args) => {
      if (!args) {
        return Book.find({});
      }
      let booksList = await Book.find({}).populate("author");
      if (args.author) {
        booksList = booksList.filter(
          (book) => book.author.name === args.author
        );
      }
      if (args.genre) {
        booksList = booksList.filter((book) =>
          book.genres.includes(args.genre)
        );
      }
      return booksList;
    },
    allAuthors: async () => Author.find({}),
    me: async (root, args, context) => {
      return context.currentUser;
    },
  },
  Author: {
    bookCount: async (root) => {
      const allBooks = await Book.find({}).populate("author");
      return allBooks.filter((b) => b.author.name === root.name).length;
    },
  },
  Mutation: {
    addBook: async (root, args, context) => {
      console.log("JIHAAAAA");
      if (!context.currentUser) {
        throw new GraphQLError("not authenticated", {
          extensions: {
            code: "BAD_USER_INPUT",
          },
        });
      }
      try {
        const author = await Author.findOne({ name: args.author });
        if (!author) {
          const newAuthor = new Author({ name: args.author });
          await newAuthor.save();
        }
      } catch (error) {
        throw new GraphQLError("Saving New Author Failed", {
          extensions: {
            code: "BAD_USER_INPUT",
            invalidArgs: args.author,
            error,
          },
        });
      }
      try {
        const bookAuthor = await Author.findOne({ name: args.author });
        const newBook = new Book({ ...args, author: bookAuthor });

        return newBook.save();
      } catch (error) {
        throw new GraphQLError("Saving New Book Failed", {
          extensions: {
            code: "BAD_USER_INPUT",
            invalidArgs: args.title,
            error,
          },
        });
      }
    },
    editAuthor: async (root, args, context) => {
      if (!context.currentUser) {
        throw new GraphQLError("not authenticated", {
          extensions: {
            code: "BAD_USER_INPUT",
          },
        });
      }
      try {
        const author = await Author.findOne({ name: args.name });
        if (!author) {
          return null;
        }
        author.born = args.setBornTo;
        return author.save();
      } catch (error) {
        throw new GraphQLError("Editing Author Failed", {
          extensions: {
            code: "BAD_USER_INPUT",
            invalidArgs: args.author,
            error,
          },
        });
      }
    },
    createUser: async (root, args) => {
      const user = new User({
        username: args.username,
        favoriteGenre: args.favoriteGenre,
      });
      return user.save().catch((error) => {
        throw new GraphQLError("Creating new user failed", {
          extensions: {
            code: "BAD_USER_INPUT",
            invalidArgs: args.username,
            error,
          },
        });
      });
    },
    login: async (root, args) => {
      const user = await User.findOne({ username: args.username });

      if (!user || args.password !== "mrsecret") {
        throw new GraphQLError("wrong credentials", {
          extensions: {
            code: "BAD_USER_INPUT",
          },
        });
      }

      const userForToken = {
        username: user.username,
        userid: user._id,
      };
      return { value: jwt.sign(userForToken, process.env.JWT_SECRET) };
    },
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

startStandaloneServer(server, {
  listen: { port: 4000 },
  context: async ({ req, res }) => {
    const auth = req ? req.headers.authorization : null;
    if (auth && auth.startsWith("Bearer ")) {
      const decodedToken = jwt.verify(
        auth.substring(7),
        process.env.JWT_SECRET
      );
      const currentUser = await User.findById(decodedToken.userid);
      return { currentUser };
    }
  },
}).then(({ url }) => {
  console.log(`Server ready at ${url}`);
});
