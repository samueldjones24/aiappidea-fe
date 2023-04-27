import {
  Card,
  CardActions,
  Fade,
  CardContent,
  Typography,
  CardMedia,
} from '@mui/material'
import { KeywordWrapper } from './Card.styles'
import {
  FacebookShareButton,
  TwitterShareButton,
  LinkedinShareButton,
  FacebookIcon,
  LinkedinIcon,
  TwitterIcon,
} from 'react-share'

// TODO: check social content

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
      <Card sx={{ maxWidth: 400, maxHeight: 800 }}>
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
                {keyword}
              </Typography>
            ))}
          </KeywordWrapper>
        </CardContent>
        <CardActions
          sx={{ display: 'flex', justifyContent: 'flex-end', mr: 1 }}
        >
          <FacebookShareButton
            url="https://www.aiappidea.com"
            quote={`Check out this new app idea: ${title} - ${tagline}`}
            hashtag={keywords[0]}
          >
            <FacebookIcon size={24} borderRadius={8} />
          </FacebookShareButton>
          <TwitterShareButton
            url="https://www.aiappidea.com"
            title={`Check out this new app idea: ${title} - ${tagline}`}
            hashtags={keywords}
          >
            <TwitterIcon size={24} borderRadius={8} />
          </TwitterShareButton>
          <LinkedinShareButton
            url="https://www.aiappidea.com"
            title={`Check out this new app idea: ${title} - ${tagline}`}
            source="AI App Idea"
          >
            <LinkedinIcon size={24} borderRadius={8} />
          </LinkedinShareButton>
        </CardActions>
      </Card>
    </Fade>
  )
}
