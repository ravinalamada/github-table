
import { Table, TableRow, Menu, Icon } from 'semantic-ui-react'
import { useQuery } from 'graphql-hooks'
import InputSearch from './InputSearch'
import {useState } from 'react'

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
  query Search($searchTerm: String!, $after: String, $before: String, $first: Int, $last: Int) {   
    search(query: $searchTerm,  type: REPOSITORY, after: $after, before: $before, first: $first, last: $last) {
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
const defaultSearchTerm = 'react'

const GithubTable = () => {
  const [searchTerm, setSearchTerm] = useState(defaultSearchTerm);

  const { loading, error, data, refetch } = useQuery<{ search: SearchResult }>(REPOSITORIES_SEARCH_QUERY, {
    variables: {
      first: 10,
      searchTerm: getSearchTermWithSorting(defaultSearchTerm)
    }
  })

  if (loading) return <p>Loading...</p>
  if (error) return <p>Something Bad Happened</p>

  const searchResults = data?.search.nodes;
  const paginationInfo = data?.search.pageInfo

  const handleNextPage = () => {
    refetch({
      variables: {
        first: 10,
        after: paginationInfo?.endCursor,
        searchTerm: getSearchTermWithSorting(searchTerm)
      }
    })
  }

  const handlePreviousPage = () => {
    refetch({
      variables: {
        last: 10,
        before: paginationInfo?.startCursor,
        searchTerm: getSearchTermWithSorting(searchTerm)
      }
    })
  }

  const handleSearch = (searchTerm: string) => {
    refetch({
      variables: {
        first: 10,
        searchTerm: getSearchTermWithSorting(searchTerm)
      }
    })
  }

  return (
    <div>
      <InputSearch setSearchTerm={setSearchTerm} searchTerm={searchTerm} handleSearch={handleSearch} />
      <Table celled>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>Name</Table.HeaderCell>
            <Table.HeaderCell>Stars</Table.HeaderCell>
            <Table.HeaderCell>Forks</Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body data-testid='table-body'>
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
                <Menu.Item
                  as='button'
                  disabled={!paginationInfo?.hasPreviousPage}
                  icon
                  onClick={handlePreviousPage}
                >
                  <Icon name='chevron left' />
                </Menu.Item>
                <Menu.Item
                  as='button'
                  disabled={!paginationInfo?.hasNextPage}
                  icon
                  onClick={handleNextPage}
                >
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

export default GithubTable

const getSearchTermWithSorting = (searchTerm: string) => {
  return `${searchTerm} sort:stars`
}