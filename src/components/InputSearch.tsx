import { Input, Icon } from 'semantic-ui-react';

interface InputProps {
  searchTerm: string;
  setSearchTerm: (e: string) => void;
  handleSearch: (searchTerm: string) => void;
}

const InputSearch = ({ searchTerm, handleSearch, setSearchTerm }: InputProps) => {
 
  const handleKeyDown = (e: any) => {
    if (e.key === 'Enter') {
      handleSearch(searchTerm)
    }
  }
 
  return (
    <Input
      icon={<Icon onClick={handleSearch} name='search' inverted circular link />}
      placeholder='Search...'
      data-testid='search-input'
      value={searchTerm}
      onKeyDown={handleKeyDown}
      onChange={(e) => setSearchTerm(e.target.value)}
    />
  )

}

export default InputSearch