import React, { useRef, useState, VFC, memo } from "react";
import { useNavigate } from "react-router-dom";
import { DocumentData } from "firebase/firestore";
import {
  Row,
  Col,
  Form,
  Button,
  Card,
  Alert,
  ButtonGroup,
  ToggleButton,
} from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserCircle } from "@fortawesome/free-solid-svg-icons";
import moment from "moment";
import "../scss/App.scss";

import useEditChild from "../hooks/useEditChild"


interface Props {
  id: string;
  child: DocumentData;
}

export const EditChildForm: VFC<Props> = memo( ({ id, child }) => {
  const nameRef = useRef<HTMLInputElement>(child.name);
  const priceRef = useRef<HTMLInputElement>(child.price);
  const [radioValue, setRadioValue] = useState(child.isWeekly ? "1" : "2");
  const mutation = useEditChild(id)
  const navigate = useNavigate();
  const radios = [
    { name: "Weekly", value: "1" },
    { name: "Monthly", value: "2" },
  ];

  const handleSubmit =  (e: React.FormEvent<HTMLFormElement>) => {
    console.log(mutation)
    e.preventDefault();
    if (!nameRef.current || !priceRef.current) {
      return;
    }
    const monday = 1;
    const today = moment().isoWeekday();
    let nextMonday;
    // if we haven't yet passed the day of the week that I need:
    if (today <= monday) {
      // then just give me this week's instance of that day
      nextMonday = moment().isoWeekday(monday).format("YYYY-MM-DD");
    } else {
      // otherwise, give me *next week's* instance of that same day
      nextMonday = moment()
        .add(1, "weeks")
        .isoWeekday(monday)
        .format("YYYY-MM-DD");
    }

    let nextDate =
      radioValue === "1"
        ? nextMonday
        : moment().add(1, "M").startOf("month").format("YYYY-MM-DD"); // the first date of next month

        mutation.mutate({
       name: nameRef.current.value.length ? nameRef.current.value : child.name,
       price: priceRef.current.value.length
         ? parseInt(priceRef.current.value)
         : child.price,
       weekly: radioValue === "1" ? true : false,
       nextDate,
     });         
        nameRef.current.value = "";
        priceRef.current.value = "";
        setRadioValue(child.isWeekly ? "1" : "2");
        navigate("/");
      

    }

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
              {mutation.isError && (
                <Alert variant="danger">{mutation.error}</Alert>
              )}
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
                      <Form.Control
                        type="text"
                        ref={nameRef}
                        defaultValue={child.name}
                      />
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
                      <Form.Control
                        type="number"
                        min="1"
                        ref={priceRef}
                        defaultValue={child.price}
                      />
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
                    <ButtonGroup>
                      {radios.map((radio, idx) => (
                        <Col
                          key={idx}
                          xs={{ span: 2, offset: 5 }}
                          md={{ span: 2, offset: 2 }}
                        >
                          <ToggleButton
                            className="text-info my-1"
                            id={`radio-${idx}`}
                            type="radio"
                            variant="primary"
                            name="radio"
                            value={radio.value}
                            checked={radioValue === radio.value}
                            onChange={(e) =>
                              setRadioValue(e.currentTarget.value)
                            }
                          >
                            {radio.name}
                          </ToggleButton>
                        </Col>
                      ))}
                    </ButtonGroup>
                  </Row>
                </Form.Group>
                <Row>
                  <Col xs={{ span: 2, offset: 8 }} md={{ span: 2, offset: 10 }}>
                    <Button
                      disabled={mutation.isLoading}
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
