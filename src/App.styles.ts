import styled from '@emotion/styled'
import { ReactComponent as Error } from './error.svg'

export const Wrapper = styled.div`
  background: #12c2e9; /* fallback for old browsers */
  background: -webkit-linear-gradient(
    to right,
    #f64f59,
    #c471ed,
    #12c2e9
  ); /* Chrome 10-25, Safari 5.1-6 */
  background: linear-gradient(
    to right,
    #f64f59,
    #c471ed,
    #12c2e9
  ); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  gap: 2rem;
  padding: 1rem;
`

export const Header = styled.div`
  flex: 0;
  text-align: center;

  @media only screen and (max-width: 600px) {
    h1 {
      font-size: 4rem;
    }
  }
`

export const Main = styled.div`
  display: flex;
  align-items: center;
  flex: 2;
  flex-direction: column;
  gap: 2rem;
`

export const Footer = styled.div`
  flex: 0;
`

export const FooterText = styled.p`
  color: whitesmoke;
  font-size: 0.8rem;
`

export const ActionsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 32px;
  width: 100%;
  margin-top: 2rem;

  @media (min-width: 600px) {
    justify-content: center;
    flex-direction: row;
  }
`

export const FooterLink = styled.a`
  color: inherit;

  &:hover {
    text-decoration: none;
  }
`
export const ErrorWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`

export const ErrorSVG = styled(Error)`
  height: 340px;
  width: 340px;
`
