import Container from "react-bootstrap/Container"
import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"
import Form from "react-bootstrap/Form"
import Button from "react-bootstrap/Button"

import Collection from "../components/dropdown"
import Word from "../components/word"

import { useState } from 'react'
import useSWR from 'swr'

const fetcher = url => fetch(url).then(r => r.json())

export default function Search({ collections }) {
  // TODO: Move all endpoint fetchers to a file
  const { data, error, isLoading, mutate } = useSWR(`/api/get/collection/${collections[0]}`, fetcher)
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
            <Col xs={12}>
              <h1 className="text-center">Collections</h1>
              <Collection cols={collections}/>   
            </Col>
            <Col>
              {<Word data={data}/>}
            </Col>
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
