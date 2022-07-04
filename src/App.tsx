import { GraphQLClient, ClientContext } from 'graphql-hooks'
import GithubTable from './components/GithubTable';

const client = new GraphQLClient({
  url: 'https://api.github.com/graphql',
  headers: {
    Authorization: "bearer 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"
  }
})

export default function App() {
  return (
    <ClientContext.Provider value={client}>
      <GithubTable />
    </ClientContext.Provider>
  )
}