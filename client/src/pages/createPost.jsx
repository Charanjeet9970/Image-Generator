import React, { useState } from "react";
import styled from "styled-components";
import GenerateImageForm from "../components/GenerateImageForm";
import GenerateImageCard from "../components/GenerateImageCard";

const Container = styled.div`
    height: 100%;
    overflow-y: scroll;
    background-color: ${({ theme }) => theme.bg};
    padding: 30px 30px;
    padding-bottom: 50px;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 20px;
    @media (max-width: 768px) {
        padding: 6px 10px;
    }
`;
const Wrapper = styled.div`
    flex: 1;
    height: fit-content;
    width: 100%;
    max-width: 1200px;
    padding: 32px 0px;
    gap: 8%;
    display: flex;
    justify-content: center;
    @media (max-width: 768px) {
        flex-direction: column;
    }
`

const CreatePost = () => {
    const [generateImageLoading,setGenrateImageLoading] = useState() 
    const [createPostLoading,setCreateLoading] = useState() 
    const [post,setPost] = useState({
        author:"",
        prompt:"",
        photo:""
    })
    return (
        <Container>
            <Wrapper>
                <GenerateImageForm 
                    post={post}
                    setPost={setPost}
                    createPostLoading={createPostLoading}
                    setCreateLoading={setCreateLoading}
                    generateImageLoading={generateImageLoading}
                    setGenrateImageLoading={setGenrateImageLoading}
                />
                <GenerateImageCard 
                loading={generateImageLoading}
                src={post.photo}/>
            </Wrapper>
        </Container>

    );
};    

export default CreatePost;