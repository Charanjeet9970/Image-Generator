import React from 'react';
import styled from 'styled-components'; 
import { Search } from '@mui/icons-material';

const SearchBarContainer = styled.div`
    max-width: 600px;
    width: 90%;
    display: flex;
    border: ${({ theme }) => theme.text_secondary + 90} 1px solid;
    color: ${({ theme }) => theme.text_primary};
    border-radius: 8px;
    padding: 12px 16px;
    gap: 6px;
    cursor: pointer;
    align-items: center;
`

const SearchBar = ({search,setSearch}) => {
  return (
    <SearchBarContainer>
        <Search/>
        <input 
        placeholder='Search for images, art, or anything...'
        style={
            {
                border: "none",
                outline: "none",
                backgroundColor: "transparent",
                color: "inherit",
                width: "100%",
                fontSize: "18px",
            }
        }
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        />
    </SearchBarContainer>
  )
}

export default SearchBar