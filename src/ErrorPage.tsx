import { Typography } from '@mui/material'
import { ErrorWrapper, ErrorSVG } from './App.styles'

export const ErrorPage = (): JSX.Element => 
     (
        <ErrorWrapper>
            <ErrorSVG />
            <Typography color="whitesmoke" variant="h6">
              Oops! Something went wrong.
            </Typography>
            <Typography color="whitesmoke" variant="body1">
              Let us plug the robots back in and then try refreshing the page.
            </Typography>
          </ErrorWrapper>
    )
