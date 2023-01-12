import Container from "react-bootstrap/Container"
import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"
import Form from "react-bootstrap/Form"
import Button from "react-bootstrap/Button"
import Collection from "../components/collection"

import { useState } from "react"
import { useSWRConfig } from 'swr'
import { withIronSessionSsr } from "iron-session/next"
import { ironConfig } from "../lib/config.js"

export default function Search({ collections }) {
  const { mutate } = useSWRConfig()
  const [currentCol, setCurrentCol] = useState(collections[0])
  return (
    <>
      <Container>
          <Row className="mx-auto px-3" style={{marginTop: '8rem'}}>
            <Col xs={12}>
              <h1 className="text-center">Word it!</h1>
                <Form.Control
                  type="text"
                  placeholder="Any word you want!"
                >
                </Form.Control>
                <div className="d-grid gap-2 mt-2">
                  <Button type="submit" onClick={() => {
                    mutate(`/api/get/collection/${currentCol}`)
                  }}>Search</Button>
                </div>
            </Col>
            <Collection 
              collections={collections}
              setCol={setCurrentCol}
            />
          </Row>
      </Container>
    </>
  )
}

export const getServerSideProps = withIronSessionSsr(
  async function getServerSideProps({ req }) {
    const { user } = req.session

    if (!user) {
      return {
        redirect: {
          destination: '/login',
          permanent: false
        }
      }
    }
    return {
      props: {
        collections: ['default', 'pizza']
      }
    }
  }, ironConfig
)
