import Card from "react-bootstrap/Card"
import ListGroup from "react-bootstrap/ListGroup"

export default function Word(props) {
  if (!props.data) {
    return null;
  }
  return (
    <>
      <Card className="mt-2 mb-2">
        <Card.Header>Collection: {props.data.collection}</Card.Header>
        <ListGroup variant="flush">
          {props.data.words.map((e, index) =>
            <ListGroup.Item key={index}><a href="#">{e}</a></ListGroup.Item>
          )}
        </ListGroup>
      </Card>
    </>
  )
}
