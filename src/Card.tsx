import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Button, CardActionArea, CardActions, Fade } from '@mui/material';
import { Share } from '@mui/icons-material';
import styled from '@emotion/styled'

const KeywordWrapper = styled.div`
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    width: 100%;
    gap: 4px;
`

type CardProps = {
    title: string; 
    tagline: string; 
    description: string; 
    image: string; 
    keywords: string[]
}


export default function MultiActionAreaCard({ title, tagline, description, image, keywords }: CardProps) {
  return (
    <Fade in={Boolean(title)}>
    <Card sx={{ maxWidth: 345 }}>
      <CardActionArea>
        <CardMedia
          component="img"
          height="140"
          alt={title}
          src={image}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {title}
          </Typography>
          <Typography gutterBottom variant="h6" component="div">
            {tagline}
          </Typography>
          <Typography gutterBottom variant="body2" color="text.secondary">
            {description}
          </Typography>
            <KeywordWrapper>
          {keywords.map(keyword => (
                <Typography variant="body2" color="text.secondary" fontWeight={500}>#{keyword}</Typography>
            ))}
            </KeywordWrapper>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Button size="small" color="primary" startIcon={<Share />}>
          Share idea
        </Button>
      </CardActions>
    </Card>
    </Fade>
  );
}
