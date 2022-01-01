import { memo, VFC } from "react";
import { Col, Card } from "react-bootstrap";
import useGetEvents from "../hooks/useGetEvents"

interface Props {
  id: string 
}

export const HistoryCard: VFC<Props> = memo(({id}) => {
  const eventsQuery = useGetEvents(id)
  const snapshot = eventsQuery.data;
  const snapDoc = snapshot?.docs.map((d) => {
    return { id: d.id, ...d.data() };
  });
  console.log(snapDoc?.map((s)=>s))
  return (
    <>
      <Col>
        <Card>
          <Card.Body className="d-flex justify-content-between align-items-center">
            <p className="text-secondary">date</p>
            <p>25 kr</p>
          </Card.Body>
        </Card>
      </Col>
    </>
  );
});
