import { Table, TableRow } from 'semantic-ui-react'
import { useQuery } from 'graphql-hooks'

interface RepositoriesData {
  id: string;
  name: string;
  url: string;
  forkCount: number;
  stargazerCount: number;
}

const REPOSITORIES_SEARCH_QUERY = `
  query{
    search(query: "react sort:stars", type: REPOSITORY, first: 20) {
      nodes {... on Repository 
        { 
          description    
          name  
          url  
          forkCount    
          stargazerCount    
          id    
        }    
    } }
  }
`

export default function GithubTable() {
  const { loading, error, data } = useQuery(REPOSITORIES_SEARCH_QUERY, {
    variables: {
      limit: 10
    }
  })

  if (loading) return <p>Loading...</p>
  if (error) return <p>Something Bad Happened</p>

  const searchResults = data?.search.nodes;

  return (
    <div>
      <Table celled>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>Name</Table.HeaderCell>
            <Table.HeaderCell>Stars</Table.HeaderCell>
            <Table.HeaderCell>Forks</Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {searchResults.map((search: RepositoriesData) => {
            return (
              <TableRow key={search.id}>
                <Table.Cell><a href={search.url}>{search.name}</a></Table.Cell>
                <Table.Cell>{search.forkCount}</Table.Cell>
                <Table.Cell>{search.stargazerCount}</Table.Cell>
              </TableRow>
            )
          })}
          <Table.Row>
          </Table.Row>
        </Table.Body>
      </Table>
    </div >
  )
}

