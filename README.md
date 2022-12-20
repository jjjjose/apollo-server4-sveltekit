# apollo-server4-sveltekit

The best integration of Apollo Server 4 for SvelteKit is a solution that allows users to utilize the advantages of Apollo Server to enhance the experience of their SvelteKit-based applications. Apollo Server is an open-source GraphQL server framework that makes it easy to define and expose GraphQL APIs, while SvelteKit is a toolkit for developing modern and dynamic web applications. By combining these two solutions, users can create web applications efficiently and smoothly.

Documentation available in:

- <a href="https://github.com/jjjjose/apollo-server4-sveltekit/blob/main/README.md " target="_blank">English</a>
- <a href="https://github.com/jjjjose/apollo-server4-sveltekit/blob/main/README-es.md " target="_blank">Spanish</a>

## Installation

To install this module, run the following command in your terminal:

```bash
npm install @apollo/server apollo-server4-sveltekit
```

o

```bash
yarn add @apollo/server apollo-server4-sveltekit
```

## Preparation

Before anything, you must create a file `+server.ts` in the `src/routes` folder of your SvelteKit project.

## Usage

- To use this function, first import it in your code:

  ```js
  // src/routes/+server.ts
  import { ApolloServer } from '@apollo/server'
  import { createHandler } from 'apollo-server4-sveltekit'
  ```

- then you can use the `createHandler` function to create an Apollo Server handler:

  ```js
  const typeDefs = `
    type Query {
      ping: String
    }
  `

  const resolvers = {
    Query: {
      ping: () => 'pong',
    },
  }

  const server = new ApolloServer({
    typeDefs,
    resolvers,
  })

  const handler = createHandler(server, {
    context: async (context: any) => ({ context }),
  })

  export const GET = handler
  export const POST = handler
  export const PUT = handler
  export const PATCH = handler
  export const DELETE = handler
  ```

  The createHandler function takes as an argument an Apollo server and an optional options object with a context function. The context function will be executed for each request and should return an object with any necessary context information to process the request.

---

## Information

If you want to make more advanced configurations or see the difference of apollo server 4 with older versions, you can see the official Apollo Server documentation
<a href="https://www.apollographql.com/docs/apollo-server/" target="_blank">here</a>.

## License

- <a href="https://github.com/jjjjose/apollo-server4-sveltekit/blob/main/LICENSE" target="_blank">MIT</a>

---

Created by <a href="https://github.com/jjjjose" target="_blank">jjjjose</a> - 2022
