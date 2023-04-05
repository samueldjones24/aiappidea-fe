import { useState, useEffect } from 'react'
import axios from 'axios'
import Card from './Card'
import { Skeleton, Typography, Fab, TextField } from '@mui/material'
import { type Idea } from './types'
import {
  Wrapper,
  Header,
  Main,
  Footer,
  FooterText,
  FooterLink,
  ActionsWrapper,
  ErrorWrapper,
  ErrorSVG,
} from './App.styles'
import { Lightbulb } from '@mui/icons-material'

const apiBaseUrl = process.env.REACT_APP_API_BASE_URL as string

export function App(): JSX.Element {
  const [appTheme, setAppTheme] = useState('')
  const [idea, setIdea] = useState<Idea | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [hasError, setHasError] = useState(false)

  const appThemeRequest =
    appTheme !== '' ? `The app theme should be ${appTheme}.` : ''

  const fetchIdeas = (): void => {
    setIsLoading(true)
    setHasError(false)

    const prompt = `Give me a new app idea (that was different to the previous one) in the following JSON format: 
    title, tagline (without referring to the title), description (maximum 400 characters), keywords (maximum 5). 
    ${appThemeRequest}
    `

    axios
      .post(`${apiBaseUrl}/idea`, { prompt })
      .then((res) => {
        if (typeof res.data === 'string') {
          setIdea(null)
        } else {
          setIdea(res.data)
        }

        setIsLoading(false)
      })
      .catch(() => {
        setIdea(null)
        setHasError(true)
        setIsLoading(false)
      })
  }

  const handleThemeChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setAppTheme(e.target.value)
  }

  useEffect(() => {
    fetchIdeas()
  }, [])

  const formattedKeywords = idea?.keywords?.map(
    (keyword) => `#${keyword.replace(/ /g, '')}`
  )

  return (
    <Wrapper>
      <Header>
        <Typography gutterBottom variant="h1" color="whitesmoke">
          AI App Idea
        </Typography>
        <Typography variant="h5" color="whitesmoke">
          Find your next big app idea with the help of AI
        </Typography>
      </Header>

      <Main>
        {!isLoading && (hasError || idea === null) && (
          <ErrorWrapper>
            <ErrorSVG />
            <Typography color="whitesmoke" variant="h6">
              Oops! Something went wrong.
            </Typography>
            <Typography color="whitesmoke" variant="body1">
              Let us plug the robots back in and then try refreshing the page.
            </Typography>
          </ErrorWrapper>
        )}
        {isLoading && (
          <>
            <Skeleton variant="rectangular" width={350} height={300} />
            <Skeleton variant="rounded" width={350} height={50} />
            <Skeleton variant="rounded" width={350} height={50} />
          </>
        )}

        {!isLoading && idea != null && (
          <Card
            title={idea.title}
            tagline={idea.tagline}
            description={idea.description}
            image={`https://source.unsplash.com/random/?${
              idea.keywords != null ? idea.keywords[0] : idea.title
            }`}
            keywords={formattedKeywords != null ? formattedKeywords : []}
          />
        )}
        <ActionsWrapper>
          <TextField
            id="change-app-theme"
            label="Change theme"
            variant="standard"
            disabled={isLoading}
            value={appTheme}
            onChange={handleThemeChange}
          />
          <Fab
            color="primary"
            variant="extended"
            sx={{ borderRadius: 1 }}
            onClick={fetchIdeas}
            disabled={isLoading}
          >
            <Lightbulb sx={{ mr: 1 }} />
            Show me a new idea
          </Fab>
        </ActionsWrapper>
      </Main>
      <Footer>
        <FooterText>
          Made with ☕ by{' '}
          <FooterLink
            href="https://twitter.com/aiappidea"
            rel="noreferrer nopener"
            target="_blank"
          >
            @aiappidea
          </FooterLink>{' '}
          | Powered by ChatGPT
        </FooterText>
      </Footer>
    </Wrapper>
  )
}
