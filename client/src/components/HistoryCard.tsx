import { memo, VFC } from "react";
import { Col, Card } from "react-bootstrap";

interface Event {
  id:string,
  paymentDate:Date,
  price:number
}

interface Props {
  event: Event
}
export const HistoryCard: VFC<Props> = memo(({event}) => {
  if (!event){
    <p>No history</p>
  }
  return event && (
    <>
      <Col>
        <Card>
          <Card.Body className="d-flex justify-content-between align-items-center">
            <p className="text-secondary">{event.paymentDate.toString()}</p>
            <p>{event.price.toString()}kr</p>
      
          </Card.Body>
        </Card>
      </Col>
    </>
  )
});
