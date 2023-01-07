import Navbar from 'react-bootstrap/Navbar'
import Container from 'react-bootstrap/Container'

export default function Layout(props) {
  return (
    <>
      <Navbar bg="primary" expand="lg" variant="dark">
        <Container>
          <Navbar.Brand href="/">Vocab. Builder</Navbar.Brand>
        </Container>
      </Navbar>
      {props.children}
    </>
  )
}
