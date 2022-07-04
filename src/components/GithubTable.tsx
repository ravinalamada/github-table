import { Table, TableRow, Menu, Icon } from 'semantic-ui-react'
import { useQuery } from 'graphql-hooks'

interface RepositoriesData {
  id: string;
  name: string;
  url: string;
  forkCount: number;
  stargazerCount: number;
}

interface PageInfoData {
  startCursor: boolean
  endCursor: string;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
}

interface SearchResult {
  nodes: RepositoriesData[]
  pageInfo: PageInfoData
}

const REPOSITORIES_SEARCH_QUERY = `
  query Search($after: String, $before: String, $first: Int, $last: Int) {   
    search(query: "react sort:stars", type: REPOSITORY, after: $after, before: $before, first: $first, last: $last) {
      pageInfo {    
        endCursor,    
        hasNextPage,    
        hasPreviousPage,    
        startCursor,    
      }
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
  const { loading, error, data } = useQuery<{search: SearchResult}>(REPOSITORIES_SEARCH_QUERY, {
    variables: {
      first: 20,
    }
  })

  if (loading) return <p>Loading...</p>
  if (error) return <p>Something Bad Happened</p>

  const searchResults = data?.search.nodes;
  const paginationInfo = data?.search.pageInfo

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
          {searchResults?.map((search: RepositoriesData) => {
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
        <Table.Footer>
          <Table.Row>
            <Table.HeaderCell colSpan='3'>
              <Menu floated='right' pagination>
                <Menu.Item as='button' disabled={!paginationInfo?.hasPreviousPage} icon>
                  <Icon name='chevron left' />
                </Menu.Item>
                <Menu.Item as='button' disabled={!paginationInfo?.hasNextPage} icon>
                  <Icon name='chevron right' />
                </Menu.Item>
              </Menu>
            </Table.HeaderCell>
          </Table.Row>
        </Table.Footer>
      </Table>
    </div >
  )
}

