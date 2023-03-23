import { useState, useEffect } from "react";
import axios from "axios";
import Card from './Card'
import { Skeleton, Typography, Input, InputLabel, Fab, TextField  } from '@mui/material'
import { Wrapper, Header, Main, Footer, FooterText, ActionsWrapper } from "./App.styles";
import { AcUnit, Lightbulb } from "@mui/icons-material";

const DEFAULT_THEME = 'environmental'

type ChatResponse = {
  title: string; 
  tagline: string; 
  description: string
  keywords: string[]
}

export function App() {
  const [appTheme, setAppTheme] = useState(DEFAULT_THEME);
  const [response, setResponse] = useState<ChatResponse | null>(null);
  const [isLoading, setIsLoading] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')

  const fetchIdeas = () => {
    setIsLoading(true)
    setErrorMessage('')
    
    const prompt = `Give me a new app idea in the following JSON format: 
    title, tagline (without referring to the title), description (maximum 400 characters), keywords (maximum 5). 
    The app theme should be ${appTheme}.`

    const controller = new AbortController()

    axios
      .post(`${process.env.REACT_APP_API_BASE_URL}/chat`, { prompt }, { signal: controller.signal, timeout: 10000 })
      .then((res) => {
        setResponse(res.data);
        setIsLoading(false)
      })
      .catch((err) => {
        setErrorMessage(err?.response?.data?.message || 'Oops! Something went wrong')
        setResponse(null);
        setIsLoading(false)
      });
  };

  const handleThemeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value === '') {
      setAppTheme(DEFAULT_THEME)
    } else {
      setAppTheme(e.target.value)
    }
  }

  useEffect(() => {
    fetchIdeas()
  }, [])

  const formattedKeywords = response?.keywords?.map(keyword => keyword.replace(/ /g, ''))

  return (
    <Wrapper>
      <Header>
        <Typography gutterBottom variant="h1" color="whitesmoke">AI App Ideas</Typography>
        <Typography variant="h5" color="whitesmoke">Find your next app idea with the help of AI</Typography>
      </Header>

      <Main>
      {!isLoading && errorMessage &&
      <>
        <AcUnit color="warning" />
        <Typography color='whitesmoke' variant='h6'>{errorMessage}</Typography>
        </>
      }
      {isLoading &&
        <>
          <Skeleton variant="rectangular" width={350} height={300} />
          <Skeleton variant="rounded" width={350} height={50} />
          <Skeleton variant="rounded" width={350} height={50} />
        </>
      } 

      {!isLoading && 
        response &&
          <Card 
            title={response.title} 
            tagline={response.tagline}
            description={response.description} 
            image={`https://source.unsplash.com/random/?${formattedKeywords?.[0] || response.title}`} 
            keywords={formattedKeywords || []} 
          />
      }
      <ActionsWrapper>
      <TextField id="change-app-theme" label="Change theme" 
        variant="standard" 
        color='primary' 
        disabled={isLoading} 
        value={appTheme === DEFAULT_THEME ? '' : appTheme}
        onChange={handleThemeChange}
        />
      <Fab color="primary" variant="extended" sx={{ borderRadius: 1 }} onClick={fetchIdeas} disabled={isLoading}>
            <Lightbulb sx={{ mr: 1 }} />
            Show me a new idea
      </Fab>
      </ActionsWrapper>
      </Main>
      <Footer>
        <FooterText>Powered by ChatGPT</FooterText>
      </Footer>
    </Wrapper>
  );
}