import {
  Card,
  Button,
  CardActions,
  Fade,
  CardContent,
  Typography,
  CardMedia,
} from '@mui/material'
import { Share } from '@mui/icons-material'
import styled from '@emotion/styled'

const KeywordWrapper = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  width: 100%;
  gap: 4px;
  margin-top: 16px;
`

interface CardProps {
  title: string
  tagline: string
  description: string
  image: string
  keywords: string[]
}

export default function IdeaCard({
  title,
  tagline,
  description,
  image,
  keywords,
}: CardProps): JSX.Element {
  return (
    <Fade in={Boolean(title)}>
      <Card sx={{ maxWidth: 400, maxHeight: 600 }}>
        <CardMedia component="img" height="160" alt={title} src={image} />
        <CardContent>
          <Typography gutterBottom variant="h5">
            {title}
          </Typography>
          <Typography gutterBottom variant="h6">
            {tagline}
          </Typography>
          <Typography gutterBottom variant="body2" color="text.secondary">
            {description}
          </Typography>
          <KeywordWrapper>
            {keywords.map((keyword) => (
              <Typography
                key={keyword}
                variant="body2"
                color="text.secondary"
                fontWeight={500}
              >
                #{keyword}
              </Typography>
            ))}
          </KeywordWrapper>
        </CardContent>
        <CardActions>
          <Button size="small" color="primary" startIcon={<Share />}>
            Share idea
          </Button>
        </CardActions>
      </Card>
    </Fade>
  )
}
