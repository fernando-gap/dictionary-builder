import Card from "react-bootstrap/Card"
import ListGroup from "react-bootstrap/ListGroup"

export default function Word(props) {
  return (
    <>
      <Card className="mt-2">
        <Card.Header>Words from Collection's</Card.Header>
        <ListGroup variant="flush">
          {props.words.map((e, index) =>
            <ListGroup.Item key={index}><a href="#">{e}</a></ListGroup.Item>
          )}
        </ListGroup>
      </Card>
    </>
  )
}
