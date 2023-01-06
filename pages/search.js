import Container from "react-bootstrap/Container"
import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"
import Form from "react-bootstrap/Form"
import Button from "react-bootstrap/Button"
import Collection from "../components/collection"

export default function Search({ collections }) {
  return (
    <>
      <Container>
          <Row>
            <Col xs={12}>
              <h1 className="text-center">Word it!</h1>
                <Form.Control
                  type="text"
                  placeholder="Any word you want!"
                >
                </Form.Control>
                <div className="d-grid gap-2 mt-2">
                  <Button type="submit">Search</Button>
                </div>
            </Col>
            <Collection collections={collections}/>
          </Row>
      </Container>
    </>
  );
}

export function getServerSideProps({ req, res }) {
  // TODO fetch user's collections
  return {
    props: {
      collections: ['Default 0', 'Default 1']
    }
  }
}
