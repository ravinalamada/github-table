import { GraphQLClient, ClientContext } from 'graphql-hooks'
import GithubTable from './components/GithubTable';

const client = new GraphQLClient({
  url: 'https://api.github.com/graphql',
  headers: {
    Authorization:`bearer ${process.env.REACT_APP_GITHUB_TOKEN}`
  }
})

export default function App() {
  return (
    <ClientContext.Provider value={client}>
      <GithubTable />
    </ClientContext.Provider>
  )
}