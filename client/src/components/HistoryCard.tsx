import { memo, VFC } from "react";
import { Col, Card } from "react-bootstrap";

export const HistoryCard: VFC = memo(() => {
  const date = new Date().toDateString();
  return (
    <>
      <Col>
        <Card>
          <Card.Body className="d-flex justify-content-between align-items-center">
            <p className="text-secondary">{date}</p>
            <p>25 kr</p>
          </Card.Body>
        </Card>
      </Col>
    </>
  );
});
