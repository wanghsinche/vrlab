import { ApolloClient, InMemoryCache, HttpLink, from } from "@apollo/client";
import { setContext } from '@apollo/client/link/context';
import { onError } from "@apollo/client/link/error";
import { message } from 'antd';
import token from './token';

export const serverURL = 'http://localhost:1337';

const httpLink = new HttpLink({
  uri: serverURL + "/graphql"
});

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

const errorLink = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors)
    graphQLErrors.forEach(({ message:msg, locations, path }) =>
    { 
      const text = `[GraphQL error]: Message: ${msg}, Location: ${locations}, Path: ${path}`;
      console.log(text);
      if (path?.includes('me') || path?.includes('login')) {
        return;
      }
      message.error(text);
    });

  if (networkError) {
    const text = `[Network error]: ${networkError}`;
    console.log(text);
    message.error(text);
  }
});
  
// If you provide a link chain to ApolloClient, you
// don't provide the `uri` option.
export const client = new ApolloClient({
  // The `from` function combines an array of individual links
  // into a link chain
  link: from([errorLink, authLink, httpLink]),
  cache: new InMemoryCache()
});

export { gql } from '@apollo/client';
