import { CircularProgress } from '@mui/material'
import React from 'react'
import styled from 'styled-components'

const Container = styled.div`
  flex: 1;
  min-height: 300px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  padding: 16px;
  border: 2px dashed yellow;
  border-radius: 20px;
  color: ${({ theme }) => theme.arrow + 80};
`

const Image = styled.img`
  width: 100%;
  max-height: 500px;
  object-fit: cover;
  border-radius: 24px;
  background-color: ${({ theme }) => theme.text_secondary + 50};
`;
const GenerateImageCard = ({src,loading}) => {
  return (
    <Container>
      {
        loading ? <div style={{display:'flex',gap:'8px',alignItems:'center'}}>
          <CircularProgress style={{color:"inherit",width:'24px',height:'24px'}}/> 
          Generating your Image...</div>:
          
        src ?<Image src={src} alt="Generated Image"/> : <>Write the prompt to Generate an Image...</>
      }
    </Container>
  )
}

export default GenerateImageCard