import { memo, VFC } from "react";
import { Row, Col, Card, Button, Form } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUserCircle,
  faPlusCircle,
  faMinusCircle,
} from "@fortawesome/free-solid-svg-icons";
import { useParams } from "react-router-dom";
import { Alert } from "react-bootstrap";

import useGetDocument from "../hooks/useGetDocument";
import { HistoryCard } from "../components/HistoryCard";

export const ChildHistoryList: VFC = memo(() => {
  const { id } = useParams();

  const childQuery = useGetDocument('children', id ?? "");

  if (childQuery.isError) {
    return <Alert variant="warning">{childQuery.error}</Alert>;
  }

  if (childQuery.isLoading) {
    return <p>Loading...</p>;
  }
  return (
    <>
      <Row>
        <Col
          xs={{ span: 12 }}
          md={{ span: 8, offset: 2 }}
          lg={{ span: 6, offset: 3 }}
        >
          <Row className="d-f align-items-center">
            <Col xs={{ span: 2, offset: 1 }} md={{ span: 2, offset: 1 }}>
              <FontAwesomeIcon icon={faUserCircle} color="#f0ad4e" size="3x" />
            </Col>
            <Col xs={{ span: 3 }} md={{ span: 2 }}>
              <h3>{childQuery.data?.name}  </h3>
            </Col>
            <Col xs={{ span: 4, offset: 2 }} md={{ span: 3, offset: 4 }}>
              <Col>
                <h5>Total</h5>
              </Col>
              <Col>
                <h4>500 kr</h4>
              </Col>
            </Col>
          </Row>
          <Card className="mt-3">
            <Card.Body>
              <Card.Title className="text-secondary text-center mb-4">
                Add or Reduce
              </Card.Title>
              <Form.Group controlId="formBasicEmail">
                <Row className="justify-content-between align-items-center">
                  <Col xs={2} className="text-center">
                    <FontAwesomeIcon
                      icon={faPlusCircle}
                      color="#f0ad4e"
                      size="lg"
                    ></FontAwesomeIcon>
                  </Col>
                  <Col>
                    <Form.Control type="number" placeholder="Enter price" />
                  </Col>
                  <Col xs={2} className="text-center">
                    <FontAwesomeIcon
                      icon={faMinusCircle}
                      color="#f0ad4e"
                      size="lg"
                    ></FontAwesomeIcon>
                  </Col>
                </Row>
                <Row className="justify-content-center">
                  <Col xs={2} className="mt-4">
                    <Button
                      type="submit"
                      variant="primary"
                      className="text-info"
                    >
                      Save
                    </Button>
                  </Col>
                </Row>
              </Form.Group>
            </Card.Body>
          </Card>
          <h4 className="text-center my-4">History</h4>
          <Row>
            <HistoryCard />
          </Row>
        </Col>
      </Row>
    </>
  );
});
