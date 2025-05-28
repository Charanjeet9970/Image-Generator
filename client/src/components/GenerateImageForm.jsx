import React from 'react'
import styled from 'styled-components'
import { AutoAwesome, CreateRounded,} from '@mui/icons-material'
import { CreatePost, GenerateAiImage } from '../api/index.js'
import { useNavigate } from 'react-router-dom'

const Form = styled.div`
    flex: 1;
    display: flex;
    justify-content: center;
    height: 100%;
    gap: 25px;
    flex-direction: column;
    padding: 16px 20px ;
    `
const Top = styled.div`
    display: flex;
    flex-direction: column;
    gap: 8px;
`
const Title = styled.div`
    font-size: 28px;
    font-weight: 600;
    color: ${({ theme }) => theme.text_primary};
`
const Disc = styled.div`
    font-size: 16px;
    font-weight: 400;
    color: ${({ theme }) => theme.text_secondary};
`
const Body = styled.div`
    display: flex;
    flex-direction: column;
    gap:9px;
    font-size: 12px;
    font-weight: 400;
    color: ${({ theme }) => theme.text_secondary};
`
const Action = styled.div`
    flex: 1;
    display: flex;
    gap: 8px;
`

const SearchConyainer = styled.div`
max-width: 600px;
width: 90%;
display: flex;
border: ${({ theme }) => theme.text_secondary + 90} 1px solid;
color: ${({ theme }) => theme.text_primary};
border-radius: 8px;
padding: 12px 16px;
gap: 6px;
cursor: pointer;
align-items: start;
`

const GenerateImageForm = ({
    post,
    setPost,
    createPostLoading,
    setCreateLoading,
    generateImageLoading,
    setGenrateImageLoading
}) => {
    const navigate = useNavigate()
    const generateImageFun = async () => {
        setGenrateImageLoading(true)
        await GenerateAiImage({prompt: post.prompt})
        .then((res) => {
            console.log("Image generated successfully",res);
            setPost({ ...post, photo: res.data.photo })
            setGenrateImageLoading(false)
        }).catch((err) => {
            console.log("Failed to load photo",err);
            setGenrateImageLoading(false)
         })
    }    
    const generatePostFun = async () => {
        setCreateLoading(true)
        await CreatePost(post)
        .then((res) => {
            setCreateLoading(false)
            navigate("/")
        }).catch((err) => {
            console.log("Failed to post",err);
            setCreateLoading(false)
         })
    }  
  return (
    <Form>
        <Top>
            <Title>Generate Image</Title>
            <Disc>Write a prompt according to the Image you want</Disc>
        </Top>
        <Body>
            <h2>Author</h2>
            <SearchConyainer>
            <input 
        placeholder='Enter your Name..'
        style={
            {
                border: "none",
                outline: "none",
                backgroundColor: "transparent",
                color: "inherit",
                width: "100%",
                fontSize: "18px",
                alignItems: "start",
            }
        }
        value={post.author}
        onChange={(e) => setPost({...post,author:e.target.value})}
        />
            </SearchConyainer>
            <h2>Prompt</h2>
            <SearchConyainer>
            <textarea
  placeholder='Enter a detailed prompt about the image...'
  rows={5}
  style={{
    border: "none",
    outline: "none",
    backgroundColor: "transparent",
    color: "inherit",
    width: "100%",
    fontSize: "18px",
    resize: "none", // optional: prevents the user from resizing
  }}
  value={post.prompt}
  onChange={(e) => setPost({...post,prompt:e.target.value})}
/>
            </SearchConyainer>
        ** You can post your Image to the Comunity **
        </Body>
        <Action>
        <button style={{
                backgroundColor: (!post.prompt || !post.author) ? "#a27ce4" : "#854CE6",
                cursor: (!post.prompt || !post.author) ? "not-allowed" : "pointer",
                width: '100%',
                height:'100%',
                borderRadius: '15px',
                border: '2px solid #1530e4',
                color: 'white',
                fontSize: '18px',
                fontWeight: 'bold',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                padding: '10px 5px',
                }}
                flex 
                type='button'
                loading={createPostLoading}
                disabled={post.prompt ==="" || post.author === ""}
                onClick={() => generateImageFun()}
                ><AutoAwesome/> Generate Image</button>

        <button style={{
                backgroundColor: (!post.prompt || !post.author) ? "#8290ea" : "#4c60e6",
                cursor: (!post.prompt || !post.author) ? "not-allowed" : "pointer",
                width: '100%',
                height:'100%',
                borderRadius: '15px',
                border: '2px solid #1530e4',
                color: 'white',
                fontSize: '18px',
                fontWeight: 'bold',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                padding: '10px 5px',
                }}
                type='button'
                loading={createPostLoading}
                disabled={!post.prompt || !post.author || !post.photo}
                onClick={() => generatePostFun()}
                ><CreateRounded/> Post Image</button>
        </Action>

    </Form>
  )
}

export default GenerateImageForm