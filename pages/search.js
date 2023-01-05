import Container from "react-bootstrap/Container"
import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"
import Form from "react-bootstrap/Form"
import Button from "react-bootstrap/Button"

import Collection from "../components/dropdown"
import Word from "../components/word"

export default function Search({ collections, words }) {
  return (
    <>
      <Container>
        <form method="post">
          <Row className="row-cols-1">
            <Col>
              <h1 className="text-center">Word it!</h1>
                <Form.Control
                  type="text"
                  placeholder="Any word you want!"
                >
                </Form.Control>
                <div className="d-grid gap-2">
                  <Button type="submit" className="mt-2">Search</Button>
                </div>
            </Col>
            <Col>
              <Collection cols={collections}/>   
            </Col>
            <Col>
              <Word words={words}/>
            </Col>
          </Row>
        </form>
      </Container>
    </>
  );
}

export async function getServerSideProps({ req, res }) {
  return {
    props: {
      collections: ['default 0', 'default 1'],
      words: [
        'this',
      ]
    }
  }
}
