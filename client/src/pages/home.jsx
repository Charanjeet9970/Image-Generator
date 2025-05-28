import React from 'react';
import styled from 'styled-components';
import SearchBar from '../components/SearchBar';
import ImageCards from '../components/ImageCards';
import { CircularProgress } from '@mui/material';
import { GetPosts } from '../api';
import { useState, useEffect } from 'react';

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
const HeadLine = styled.h1`
    font-size: 34px;
    font-weight: 500;
    color: ${({ theme }) => theme.text_primary};
    display: flex;
    align-items: center;
    flex-direction: column;
    @media (max-width: 600px) {
        font-size: 22px;
    }
`
const Span = styled.span`
    font-size: 30px;
    font-weight: 800;
    color: #854CE6;
    @media (max-width: 600px) {
        font-size: 20px;
    }
`
const Wrapper = styled.div`
    width: 100%;
    max-width: 1400px;
    padding: 32px 0px;
    display: flex;
    justify-content: center;
`
const CardWrapper = styled.div`
    display: grid;
    gap: 20px;
    @media (min-width: 1200px) {
        grid-template-columns: repeat(4,1fr);
    }
    @media (min-width: 640px) and (max-width: 1199px) {
        grid-template-columns: repeat(3,1fr);
    }
    @media (max-width:639px) {
        grid-template-columns: repeat(2,1fr);
    }
`
const Home = () => {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [search, setSearch] = useState("");
    const [filteredPost, setfilteredPost] = useState([]);

    const fetchPosts = async () => {
        setLoading(true);
        try {
            await GetPosts()
            .then((res) => {
                setLoading(false);
                setPosts(res?.data?.data);
                setfilteredPost(res?.data?.data);
                console.log(res);
            })
        } catch (error) {
            console.error('Error fetching posts:', error);
            setLoading(false);
        }
    }
    useEffect(() => {
        fetchPosts();
    }, []);
    useEffect(() => {
        if(!search){
            setfilteredPost(posts);
        }
        const filteredMatch = posts.filter((item) => {
            const authorMatch = item?.author?.toLowerCase().includes(search.toString().toLowerCase());
            const promptMatck = item?.prompt?.toLowerCase().includes(search.toString().toLowerCase());
            return authorMatch || promptMatck;
        });
        if(search){
            setfilteredPost(filteredMatch);
        }
    }, [search, posts]);
    return (
        <Container>
            <HeadLine>
                Explore the world of AI-generated images and art
            </HeadLine>
            <Span>
            ⦿ Generated with AI ⦿
            </Span>
            <SearchBar search={search} setSearch={setSearch}/>
            <Wrapper>
                {loading ? <div><CircularProgress/>Loading...</div> :
                    <CardWrapper>
                    {
                        filteredPost.length !== 0 ? (
                            filteredPost.slice().reverse().map((item,index) => (
                                <ImageCards
                                    key={index}
                                    item={item}
                                />
                            ))
                        ) : (
                            <div>No posts found</div>
                        )
                    }
                </CardWrapper>}
            </Wrapper>
        </Container>
    );
};

export default Home;