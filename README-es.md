# apollo-server4-sveltekit

La mejor integración de Apollo Server 4 para SvelteKit es una solución que permite a los usuarios utilizar las ventajas de Apollo Server para mejorar la experiencia de sus aplicaciones basadas en SvelteKit. Apollo Server es un marco de servidor GraphQL de código abierto que facilita la definición y exposición de APIs GraphQL, mientras que SvelteKit es un kit de herramientas para el desarrollo de aplicaciones web modernas y dinámicas. Al combinar estas dos soluciones, los usuarios pueden crear aplicaciones web de manera eficiente y sin problemas.

Version de documentación en:

- <a href="https://github.com/jjjjose/apollo-server4-sveltekit/blob/main/README.md " target="_blank">English</a>
- <a href="https://github.com/jjjjose/apollo-server4-sveltekit/blob/main/README-es.md " target="_blank">Spanish</a>

## Instalacion

Para instalar este módulo, ejecute el siguiente comando en su terminal:

```bash
npm install @apollo/server apollo-server4-sveltekit
```

o

```bash
yarn add @apollo/server apollo-server4-sveltekit
```

## Preparacion

Antes de nada debe crear un archivo `+server.ts` en la carpeta `src/routes/api/` de su proyecto SvelteKit.

## Uso

Para usar esta función, primero debe importarla en su código:

```js
// src/routes/api/+server.ts
import { ApolloServer } from '@apollo/server'
import { createHandler } from 'apollo-server4-sveltekit'
```

luego puede utilizar la funcion `createHandler` para crear un manejador de Apollo Server:

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
  context: async (context) => ({ context }),
})

export const GET = handler
export const POST = handler
export const PUT = handler
export const PATCH = handler
export const DELETE = handler
```

La función createHandler toma como argumento un servidor Apollo y un objeto de opciones opcional con una función de contexto. La función de contexto se ejecutará para cada solicitud y debería devolver un objeto con cualquier información de contexto necesaria para procesar la solicitud.

---

## Información

Si deseas hacer onfiguraciones mas avanzadas o ver la diferencia de apollo server 4 con versiones antiguas, puedes ver la documentación oficial de Apollo Server
<a href="https://www.apollographql.com/docs/apollo-server/" target="_blank">aquí</a>.

---

### License

- <a href="https://github.com/jjjjose/apollo-server4-sveltekit/blob/main/LICENSE" target="_blank">MIT</a>

---

Created by <a href="https://github.com/jjjjose" target="_blank">jjjjose</a> - 2022
