import styled,{ThemeProvider} from 'styled-components';
import {darkTheme} from './utils/themes';
import  Home from './pages/home';
import Navbar from './components/Navbar';
import CreatePost from './pages/createPost';
import {BrowserRouter,Routes,Route} from 'react-router-dom';

const Container = styled.div`
    width: 100%;
    display: flex;
    background-color: ${({ theme }) => theme.bg};
    color: ${({ theme }) => theme.text_primary};
    overflow: hidden;
    transition: all 0.2s ease;
`
const Wrapper = styled.div`
    height: 100%;
    position: relative;
    display: flex;
    justify-content: space-between;
    flex-direction: column;
    flex: 3;
`

function App() {
  return (
  
      <ThemeProvider theme={darkTheme}>
        <Container>
          <Wrapper>
            <BrowserRouter>
              <Navbar/>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/post" element={<CreatePost />}/>
              </Routes>
            </BrowserRouter>
            
          </Wrapper>
        </Container>
      </ThemeProvider>
  );

}

export default App;
