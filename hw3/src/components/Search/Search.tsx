import { useState, FC } from 'react';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputAdornment from '@mui/material/InputAdornment';
import SearchIcon from '@mui/icons-material/Search';

import styles from './Search.module.scss';

interface SearchProps {
 handleSearch?: (val) => void;
}

export const Search: FC<SearchProps> = ({ handleSearch }) => {
  const [searchedValue, setSearchedValue] = useState('');

  const onChange = (value: string) => {
    setSearchedValue(value);
    handleSearch(value);
  };

  return (
    <OutlinedInput
      className={styles.input}
      placeholder="Search by country/name/username"
      value={searchedValue}
      type="search"
      startAdornment={
        <InputAdornment position="start">
          <SearchIcon />
        </InputAdornment>
      }
      onChange={e => onChange(e.target.value)}
    />
  );
};
