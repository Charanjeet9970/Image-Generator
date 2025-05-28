import React from 'react'
import styled from 'styled-components'
import {LazyLoadImage} from "react-lazy-load-image-component"
import { Avatar } from '@mui/material'
import { DownloadRounded } from '@mui/icons-material'
import FileSaver from 'file-saver'

const Card = styled.div`
    position: relative;
    display: flex;
    border-radius: 20px;
    box-shadow: 1px 1px 5px 8px  ${({ theme }) => theme.black};
    transition: all 0.2s ease;
    &:hover {
      box-shadow: 1px 1px 5px 8px  ${({ theme }) => theme.black};
      scale: 1.05;
    }  
    &:nth-child(7n+1){
        grid-column: auto/span 2;
        grid-row: auto/span 2;
      }
`
const HoverOverLay = styled.div`
    opacity: 0;
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    display: flex;
    flex-direction: column;
    align-items: start;
    backdrop-filter: blur(1px);
    gap: 2px;
    color: ${({ theme }) => theme.white}; 
    background: rgba(0, 0, 0, 0.5);
    transition: opacity 0.2s ease;
    border-radius: 5px;
    padding: 10px;
    justify-content: end;

    ${Card}:hover & {
        opacity: 1;
    }
`
const Prompt = styled.div`
    font-size: 15px;
    font-weight: 500;
    color: ${({ theme }) => theme.white};
`
const Author = styled.div`
font-size: 15px;
    font-weight: 500;
    color: ${({ theme }) => theme.white};
`
const ImageCards = ({item}) => {
  return (
    <Card>
        <LazyLoadImage 
        style={{
            borderRadius: "15px",}}
        width="100%"
        alt='item.prompt'
        src={item.photo}/>
        <HoverOverLay>
          <Prompt>{item?.prompt}</Prompt>
          <div style={{display: "flex", 
            gap: "10px",
            alignItems: "center",
            width: "100%",
            justifyContent: "space-between"}}>
            <Author>
              <Avatar>{item?.author[0]}</Avatar>{item?.author}
            </Author>  
            <DownloadRounded 
               style={{
                cursor: 'pointer',
                transition: 'color 0.2s ease, transform 0.2s ease',
              }}
              onClick ={() => FileSaver.saveAs(item?.photo,'Download.jpg') } />
         </div>
         </HoverOverLay>
     </Card> 
    
  )
}

export default ImageCards;