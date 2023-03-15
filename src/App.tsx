import { useState, useEffect } from "react";
import styled from '@emotion/styled'
import axios from "axios";
import Card from './Card'
import { Skeleton, Typography } from '@mui/material'

const Wrapper = styled.div`
  background: #12c2e9;  /* fallback for old browsers */
  background: -webkit-linear-gradient(to right, #f64f59, #c471ed, #12c2e9);  /* Chrome 10-25, Safari 5.1-6 */
  background: linear-gradient(to right, #f64f59, #c471ed, #12c2e9); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`

const Header = styled.div`
  flex: 1;
  padding: 32px;
`

const Main = styled.div`
  flex: 4;
`

const Footer = styled.div`
  flex: 0;
`

const FooterText = styled.p`
  color: whitesmoke;
  font-size: 0.8rem;
`

type ChatResponse = {
  title: string; 
  tagline: string; 
  description: string
  keywords: string[]
}

export function App() {
  const [appTheme, setAppTheme] = useState("environmental");
  const [response, setResponse] = useState<ChatResponse | null>(null);
  const [isLoading, setIsLoading] = useState(false)

  const fetchIdeas = () => {
    setIsLoading(true)
    
    const prompt = `Give me a new app idea in the following JSON format: title, tagline, description, keywords. 
    The focus of the app should be ${appTheme}.`

    axios
      .post(`${process.env.REACT_APP_API_BASE_URL}/chat`, { prompt })
      .then((res) => {
        setResponse(res.data);
        setIsLoading(false)
      })
      .catch((err) => {
        console.error(err);
        setIsLoading(false)
      });
  };

  useEffect(() => {
    fetchIdeas()
  }, [])

  return (
    <Wrapper>
      <Header>
        <Typography variant="h1" color="whitesmoke">App Idea Generator</Typography>
      </Header>

      <Main>
      {isLoading && <>
        <Skeleton variant="circular" width={40} height={40} />
        <Skeleton variant="rectangular" width={210} height={60} />
        <Skeleton variant="rounded" width={210} height={60} />
      </>
      } 

      {!isLoading && 
        response && 
          <Card 
            title={response.title} 
            tagline={response.tagline}
            description={response.description} 
            image={`https://source.unsplash.com/random/?${response.keywords[0]}&1`} 
            keywords={response.keywords}/>
      }
      </Main>
      <Footer>
        <FooterText>Powered by ChatGPT</FooterText>
      </Footer>
    </Wrapper>
  );
}