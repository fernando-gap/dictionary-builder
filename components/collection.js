import Card from "react-bootstrap/Card"
import ListGroup from "react-bootstrap/ListGroup"
import Col from "react-bootstrap/Col"

import { useState, useEffect } from 'react'
import useSWR from 'swr'

// TODO: move all fetchers/endpoints to its own file
const fetcher = url => fetch(url).then(r => r.json())

export default function Collection(props) {
  if (!props.collections) {
    return null;
  }

  const [currentWord, setCurrentWord] = useState(null)
  const [currentCol, setCurrentCol] = useState(props.collections[0])
  const map = {}

  useEffect(() => {
    props.collections.map((e, index) => {
      map[e] = <Word key={index} col={e}/>
    });

    if (!currentWord) {
      setCurrentWord(map[currentCol])
    }
  }, [map]);

  function handleChange() {
    const col = document.getElementById('select-collection')
    setCurrentCol(col.value);
    setCurrentWord(map[col.value])
  }

  return (
    <>
      <Col xs={12}>
        <h1 className="text-center">Collections</h1>
        <select id="select-collection"className="btn btn-outline-primary w-100" onChange={handleChange}>
          {props.collections.map((e, index) => 
            <option key={index} value={e}>{e}</option>
          )}
        </select>
      </Col>
      <Col>
        {currentWord}
      </Col>
    </>
  )
}

function Word(props) {
  const { data, error, isLoading, mutate } 
    = useSWR(`/api/get/collection/${props.col}`, fetcher)

  return (
    <>
      <Card className="mt-2 mb-2">
        <Card.Header>Collection: {props.col}</Card.Header>
        <ListGroup variant="flush">
          {data && data.words.map((e, index) =>
            <ListGroup.Item key={index}><a href="#">{e} {Math.random()}</a></ListGroup.Item>
          )}
        </ListGroup>
      </Card>
    </>
  )
}
