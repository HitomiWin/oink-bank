import React, { memo, VFC, useRef } from "react";
import { Row, Col, Card, Button, Form } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUserCircle,
  faPlusCircle,
  faMinusCircle,
} from "@fortawesome/free-solid-svg-icons";
import { useParams } from "react-router-dom";
import { Alert } from "react-bootstrap";
import { DocumentData } from "firebase/firestore";
import moment from "moment";

import useGetDocument from "../hooks/useGetDocument";
import { HistoryCard } from "../components/HistoryCard";
import useAddTransAction from "../hooks/useAddTransaction";
import useGetTransActions from "../hooks/useGetTransactions";

interface Transaction {
  id: string;
  paymentDate: Date;
  price: number;
}

export const ChildHistoryList: VFC = memo(() => {
  const { id } = useParams();
  const priceRef = useRef<HTMLInputElement>(null);

  const childQuery = useGetDocument("children", id ?? "");

  const child = childQuery.data ?? null;
  const TransActionsQuery = useAddTransAction();
  const getTransActionsQuery = useGetTransActions(id ?? "");
  const TransActions = getTransActionsQuery.data?.docs.map(
    (Transaction: DocumentData) => {
      return { id: Transaction.id, ...Transaction.data() };
    }
  );

  const handleOnSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const isRegular = false;

    if (!priceRef.current || !priceRef.current.value.length) {
      return;
    }
    if (child && id) {
      await TransActionsQuery.addTransaction(
        id,
        isRegular,
        parseInt(priceRef.current.value),
        moment().format("YYYY/MM/DD HH:mm:ss")
      );
    }
  };

  if (childQuery.isError) {
    return <Alert variant="warning">{childQuery.error}</Alert>;
  }

  if (childQuery.isLoading) {
    return <p>Loading...</p>;
  }

  if (TransActionsQuery && priceRef.current) {
    priceRef.current.value = "";
  }
  return TransActionsQuery && child ? (
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
              <h3>{child.name} </h3>
            </Col>
            <Col xs={{ span: 4, offset: 2 }} md={{ span: 3, offset: 4 }}>
              <Col>
                <h5>Total</h5>
              </Col>
              <Col>
                <h4>{child.total} kr</h4>
              </Col>
            </Col>
          </Row>
          <Card className="mt-3">
            <Card.Body>
              {TransActionsQuery.isError && (
                <Alert variant="danger"> {TransActionsQuery.error} </Alert>
              )}
              {TransActionsQuery.isSuccess && (
                <Alert variant="success">Sucsess!</Alert>
              )}
              <Card.Title className="text-secondary text-center mb-4">
                Add or Reduce
              </Card.Title>
              <Form onSubmit={handleOnSubmit}>
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
                      <Form.Control
                        type="number"
                        placeholder="Enter price"
                        ref={priceRef}
                      />
                    </Col>
                    <Col xs={2} className="text-center">
                      <FontAwesomeIcon
                        icon={faMinusCircle}
                        color="#f0ad4e"
                        size="lg"
                      ></FontAwesomeIcon>
                    </Col>
                  </Row>
                  <Row className="j ">
                    <Col xs={2} className="mt-4">
                      <Button
                        type="submit"
                        variant="primary"
                        disabled={TransActionsQuery.isLoading === true}
                        className="text-info"
                      >
                        Save
                      </Button>
                    </Col>
                  </Row>
                </Form.Group>
              </Form>
            </Card.Body>
          </Card>

          <h4 className="text-center my-4">History</h4>
          <Row>
            {getTransActionsQuery.isError && (
              <Alert variant="danger"> {getTransActionsQuery.error} </Alert>
            )}
            {getTransActionsQuery.isLoading && <p>Loading...</p>}

            {TransActions ? (
              TransActions.map((transaction: Transaction) => (
                <HistoryCard key={transaction.id} transaction={transaction} />
              ))
            ) : (
              <p>No History</p>
            )}
          </Row>
        </Col>
      </Row>
    </>
  ) : (
    <p>No child</p>
  );
});
