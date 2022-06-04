import { ApolloClient, InMemoryCache, HttpLink, from } from "@apollo/client";
import { setContext } from '@apollo/client/link/context';
import { onError } from "@apollo/client/link/error";
import { message, Modal } from 'antd';
import token from './token';
import { RestLink } from 'apollo-link-rest';

export const serverURL = SERVER_URL;

const httpLink = new HttpLink({
  uri: serverURL + "/graphql"
});

// Set `RestLink` with your endpoint
const restLink = new RestLink({ uri: serverURL });

const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: token.val ? `Bearer ${token.val}` : "",
    }
  }
});

const errorLink = onError(({ graphQLErrors, networkError, response }) => {
  if (graphQLErrors) {
    graphQLErrors.forEach(({ message: msg, locations, path }) => {
      const text = `[GraphQL error]: Message: ${msg}, Location: ${locations}, Path: ${path}`;
      console.log(text);
      if (path?.includes('me') || path?.includes('login')) {
        return;
      }
      message.error(text);
    });
  }

  if (networkError) {
    const text = `[Network error]: ${networkError}`;
    message.error(text);
    if ('result' in networkError) {
      if (networkError.result.message?.includes('license')) {
        Modal.error({
          title: '软件证书失效，请联系供应商',
          content: `${networkError.result.message}`
        });
      }
    }
  }
});

// If you provide a link chain to ApolloClient, you
// don't provide the `uri` option.
export const client = new ApolloClient({
  // The `from` function combines an array of individual links
  // into a link chain
  link: from([errorLink, authLink, restLink, httpLink]),
  cache: new InMemoryCache(),
  defaultOptions: {
    query: {
      errorPolicy: 'all'
    },
    mutate: {
      errorPolicy: 'all'
    }
  }
});

export { gql } from '@apollo/client';
