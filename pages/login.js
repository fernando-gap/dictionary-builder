import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";


export default function Login() {
  return (
    <>
      <Container className="wrapper d-flex justify-content-center align-items-center">
        <Row className="justify-content-center align-items-center">
          <Col xs={10}>
            <div className="shadow px-4 py-5 rounded">
              <Form.Group className="mb-3">
                <Form.Label>Username</Form.Label>
                <Form.Control type="text" required></Form.Control>
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" required></Form.Control>
                <Form.Check type="checkbox" label="keep logged in" />
              </Form.Group>
              <div className="d-grid gap-2">
                <Button variant="primary" type="submit" >Login</Button>
              </div>
            </div>
          </Col>
          <Col xs={10}>
            <div 
              className="text-center mt-3" 
              style={{'font-size': '0.9rem'}}
            >Don’t have an account? <a href="#">Sign up</a></div>
          </Col>
        </Row>
      </Container>
    </>
  )
}
