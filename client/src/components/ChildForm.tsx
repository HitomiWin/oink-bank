import React, { useRef, useState, VFC, memo } from "react";
import { Row, Col, Form, Button, Card, Alert } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserCircle } from "@fortawesome/free-solid-svg-icons";
import "../App.scss";

export const ChildForm: VFC = memo(() => {
  const nameRef = useRef<HTMLInputElement>(null);
  const priceRef = useRef<HTMLInputElement>(null);
  const [error] = useState(null);
  const [loading] = useState(false);
  const [isWeekly, setIsWeekly] = useState(true);

  const handleWeeklyOnClick = () => {
    setIsWeekly(true);
  };
  const handleMonthlyOnClick = () => {
    setIsWeekly(false);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  return (
    <>
      <Row>
        <Col
          xs={{ span: 12 }}
          md={{ span: 8, offset: 2 }}
          lg={{ span: 6, offset: 3 }}
        >
          <Card className="rounded-lg">
            <Card.Body>
              {error && <Alert variant="danger">{error}</Alert>}

              <Form onSubmit={handleSubmit}>
                <Form.Group id="name" className="mb-3  text-secondary">
                  <Row>
                    <Col
                      xs={{ span: 12, order: 2, offset: 0 }}
                      md={{ span: 2, order: 1, offset: 0 }}
                    >
                      <Form.Label>Name</Form.Label>
                    </Col>
                    <Col
                      xs={{ span: 12, order: 2, offset: 0 }}
                      md={{ span: 8, offset: 0, order: 2 }}
                    >
                      <Form.Control type="text" ref={nameRef} required />
                    </Col>
                    <Col
                      xs={{ span: 2, order: 1, offset: 9 }}
                      md={{ span: 2, order: 3, offset: 0 }}
                    >
                      <FontAwesomeIcon
                        icon={faUserCircle}
                        color="#D7D4D4"
                        size="3x"
                      />
                    </Col>
                  </Row>
                </Form.Group>

                <Form.Group id="price" className="mb-3  text-secondary">
                  <Row>
                    <Col xs={12} md={2}>
                      <Form.Label>Price</Form.Label>
                    </Col>
                    <Col>
                      <Form.Control type="number" ref={priceRef} required />
                    </Col>
                    <Col xs={2} className="d-flex">
                      <p className="mb-0 align-self-end">Kr</p>
                    </Col>
                  </Row>
                </Form.Group>

                <Form.Group id="frequency" className="mb-3 text-secondary">
                  <Row>
                    <Col xs={3} md={2}>
                      <Form.Label>Frequency</Form.Label>
                    </Col>
                    <Col
                      xs={{ span: 2, offset: 5}}
                      md={{ span: 2, offset: 2 }}
                    >
                      <Button
                        variant={isWeekly ? "primary" : "light"}
                        className="text-info my-1"
                        onClick={handleWeeklyOnClick}
                      >
                        Weekly
                      </Button>
                    </Col>
                    <Col
                      xs={{ span: 2, offset: 8}}
                      md={{ span: 2, offset: 2 }}
                    >
                      <Button
                        variant={isWeekly ? "light" : "primary"}
                        className="text-info my-1"
                        onClick={handleMonthlyOnClick}
                      >
                        Monthly
                      </Button>
                    </Col>
                  </Row>
                </Form.Group>
                <Row>
                  <Col  xs={{ span: 2, offset: 8 }}md={{ span: 2, offset: 10 }}>
                    <Button
                      disabled={loading}
                      type="submit"
                      className="text-info mt-1"
                    >
                      Save
                    </Button>
                  </Col>
                </Row>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </>
  );
});
