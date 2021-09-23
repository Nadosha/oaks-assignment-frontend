import ReactDOM from 'react-dom';
import Progress from "./components/Progress";
import {ApolloClient, ApolloProvider, from, HttpLink, InMemoryCache} from "@apollo/client";
import {onError} from "@apollo/client/link/error";
import {GlobalStyle} from "./global.style";

const errorLink = onError(({ graphQLErrors, networkError }) => {
    if (graphQLErrors) {
        graphQLErrors.forEach(({ message}) => {
            alert(`GraphQL error: ${message}`);
        });
    }
    if(networkError) {
        alert(`Network error: ${networkError}`);
    }
});

const link = from([
    errorLink,
    new HttpLink({ uri: "http://localhost:3030/graphql" }),
]);

const client = new ApolloClient({
    cache: new InMemoryCache(),
    link: link,
});


ReactDOM.render(
    <ApolloProvider client={client}>
        <GlobalStyle/>
        <Progress />
    </ApolloProvider>,
  document.getElementById('root')
);
