import { Input, Icon } from 'semantic-ui-react';
import {useCallback, useState} from 'react';

interface InputProps {
  searchTerm: string;
  setSearchTerm: (e: string) => void;
  handleSearch: (searchTerm: string) => void;
}



const InputSearch = ({ searchTerm, handleSearch, setSearchTerm }: InputProps) => {
  // const [searchTerm, setSearchTerm] = useState('');
  
  const handleKeyDown = (e: any) => {
    if (e.key === 'Enter') {
      handleSearch(searchTerm)
    }
  }



  
  return (
    <Input
      icon={<Icon onClick={handleSearch} name='search' inverted circular link />}
      placeholder='Search...'
      value={searchTerm}
      onKeyDown={handleKeyDown}
      onChange={(e) => setSearchTerm(e.target.value)}
    />
  )

}

export default InputSearch