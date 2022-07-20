const { buildSchema } = require('graphql');

module.exports = buildSchema(`
    type Post {
        _id: ID!
        title: String!
        content: String!
        imageUrl: String!
        creator: User!
        createdAt: String!
        updatedAt: String!
    }

    type User {
        _id: ID!
        email: String!
        name: String!
        password: String
        status: String!
        posts: [Post!]!
    }

    type AuthData {
        token: String!
        userId: String!
    }

    type PostData {
      posts: [Post!]!
      totalPosts: Int!
    }

    input UserInputData {
        email: String!
        name: String!
        password: String!
    }

    input PostInputData {
        title: String!
        content: String!
        imageUrl: String
    }

    type RootQuery {
        login(email: String!, password: String!): AuthData!
        posts(page: Int, perPage: Int): PostData!
    }

    type RootMutation {
        createUser(userInput: UserInputData): User!
        createPost(postInput: PostInputData): Post!
    }

    schema {
        query: RootQuery
        mutation: RootMutation
    }
`);

/*

mutation {
  createUser(userInput: {email: "test1test.com", name: "John", password: "tes1"}) {
    _id
    email
  }
}

{
  login(email: "test@test.com", password: "test1") {
    token
    userId
  }
}

mutation {
  createPost(postInput: {title: "Title", content: "Content"}) {
    _id
    title
  }
}

{
  posts(page: 1, perPage: 1) {
    posts {
      _id
      title
      content
      imageUrl
    }
    totalPosts
  }
}

*/
