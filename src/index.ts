import type { HTTPGraphQLRequest } from '@apollo/server'
// @ts-ignore
import type { RequestHandler, RequestEvent } from './$types'
import { parse as urlParse } from 'url'

// Exports a function that creates a request handler for an Apollo GraphQL server
export function createHandler(server: any, options?: any) {
  // Defines a default context function that always returns a resolved promise with an empty object
  const defaultContext = async () => ({})

  // Sets the context function to the 'context' property in the options object or the default context function if no options object is provided
  const contextFunction = options?.context ?? defaultContext

  // Starts the GraphQL server in the background and handles any startup errors by logging them and failing all requests
  server.startInBackgroundHandlingStartupErrorsByLoggingAndFailingAllRequests()

  // Defines the request handler function that takes in a request event object and returns a response object
  const req = (async (params:any) => {
    // Stores the request method in the 'method' variable
    const method = params.request.method

    // Allowed methods
    const methods = ['GET', 'POST']

    // If the request method is not allowed, returns a 'Method not allowed' response
    if (!methods.includes(method)) {
      return new Response('Method not allowed', {
        status: 405,
        statusText: 'Method not allowed',
      })
    }

    // Executes the GraphQL request on the server and stores the result in the 'response' variable
    const response = await server.executeHTTPGraphQLRequest({
      // The GraphQL request
      httpGraphQLRequest: await toGraphqlRequest(params),
      // The context function that will be executed for this request
      context: () => contextFunction(params),
    })

    // Extracts the body, headers, and status from the response
    let { body, headers, status } = response
    status = response.status
    headers = Object.fromEntries(response.headers)

    // Returns a response with the status code, body, and headers from the GraphQL response
    return new Response(body.string, {
      status,
      headers,
    })
  }) satisfies RequestHandler

  // Returns the request handler function
  return req
}

// Converts the request event object into a GraphQL request object
async function toGraphqlRequest(
  params: RequestEvent
): Promise<HTTPGraphQLRequest> {
  // Converts the request headers map to an object
  let headers = Object.fromEntries(params.request.headers)

  // Returns an object with the 'method', 'headers', 'search', and 'body' properties
  return {
    // Sets the 'method' property to the request method of the event object or 'POST' if no method is provided
    method: params.request.method,

    // Sets the 'headers' property to the normalized headers of the event object
    headers: normalizeHeaders(headers) as any,

    // Sets the 'search' property to the normalized query string of the event object
    search: urlParse(params.request.url).search ?? '',

    // Sets the 'body' property to the normalized body of the event object
    body: await normalizeBody(params),
  }
}

// Normalizes the request body by converting it to a string and, if the request's content-type is 'application/json', parsing it as a JSON object
async function normalizeBody(params: RequestEvent) {
  // Converts the request body to a string or an empty string if the body is null
  const body: any = await params.request.text()
  const content = typeof body === 'string' ? body : body?.toString()

  // If the request's content-type is 'application/json', parses the body as a JSON object and returns it
  if (params.request.headers.get('content-type') === 'application/json') {
    return content ? JSON.parse(content) : {}
  } else {
    // If the content-type is not 'application/json', returns the body as a string
    return content || ''
  }
}

// Define una función para normalizar un objeto de encabezados
function normalizeHeaders(headers: any) {
  // Crea un Map vacío
  const headerMap = /* @PURE */ new Map()

  // Itera sobre cada par clave-valor del objeto de encabezados
  for (const [key, value] of Object.entries(headers)) {
    // Si el valor es un array de cadenas, establece la clave en el Map y une todas las cadenas con comas
    if (Array.isArray(value)) {
      headerMap.set(key, value.join(','))
    } else if (value) {
      // Si el valor no es un array vacío, establece la clave en el Map con el valor proporcionado
      headerMap.set(key, value)
    }
  }

  // Devuelve el Map
  return headerMap
}
