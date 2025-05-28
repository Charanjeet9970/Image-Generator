import React from "react";
import styled from "styled-components";
import { useNavigate,useLocation } from "react-router-dom";
import ExploreIcon from '@mui/icons-material/Explore';
import AddIcon from '@mui/icons-material/Add';

const Container = styled.div`
    flex: 1;
    background-color: ${({ theme }) => theme.navbar};
    color: ${({ theme }) => theme.primary};
    font-weight: bold;
    font-size:22px;
    padding: 14px 50px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.15);
    @media only screen and (max-width: 600px) {
        padding-right: 50px;
    }
    

`
const Navbar = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const path = location.pathname.split('/');
    return(
        <Container>
            TopAI
            {path[1]==="post" ? (
                <button style={{
                backgroundColor: "#4c60e6",
                width: "20%",
                height: "100%",
                borderRadius: "20px",
                color: "white",
                fontSize: "18px",
                fontWeight: "bold",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                cursor: "pointer",
                marginLeft: "8%",
                boxShadow: "0 4px 8px rgba(0, 0, 0, 0.15)",
                transition: "all 0.3s ease"
                }}
                hover={{
                    backgroundColor: "#4c60e6",
                    transform: "scale(1.05)",
                    boxShadow: "0 8px 16px rgba(0, 0, 0, 0.2)"
                }}
                onClick={()=> navigate('./')}
                ><ExploreIcon/> Explore the Posts</button>)
            :(
                <button style={{
                    backgroundColor:"#854CE6",
                    width: "20%",
                    height: "100%",
                    borderRadius: "20px",
                    color: "white",
                    fontSize: "18px",
                    fontWeight: "bold",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    cursor: "pointer",
                    marginLeft: "8%",
                    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.15)",
                    transition: "all 0.3s ease"
                    }}
                    onClick={()=> navigate('./post')}
                    ><AddIcon/> Create New Post</button>
            )}
        </Container>
    )
};    

export default Navbar;