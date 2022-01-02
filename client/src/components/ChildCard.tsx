import { memo, VFC, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Row, Col, Button, Card } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUserCircle,
  faEdit,
  faArrowCircleRight,
} from "@fortawesome/free-solid-svg-icons";
import "../scss/App.scss";
import { DocumentData, doc, updateDoc } from "firebase/firestore";
import { db } from "../firebase";
import moment from "moment";
import useAddEvents from "../hooks/useAddEvents";
import useEditChild from "../hooks/useEditChild";

interface Props {
  child: DocumentData;
}

export const ChildCard: VFC<Props> = memo(({ child }) => {
  const { addEvents } = useAddEvents();
  const mutation = useEditChild();
  const isRegular = true;

  const addEventsWeekly = async () => {
    const startWeeklyDate = moment(
      child.lastDate ?? moment().format("YYYY-MM-DD")
    );
    const endWeeklyDate = moment().format("YYYY-MM-DD");
    const day = 1; // 1=monday
    let results = [];
    const current = startWeeklyDate?.clone();
    while (current?.day(7 + day).isBefore(endWeeklyDate)) {
      results.push(current.clone());
    }

    if (results && results.length > 0) {
      results.map((result) =>
        addEvents(
          child,
          child.id,
          isRegular,
          child.price,
          result.format("YYYY-MM-DD")
        )
      );
      console.log({results})
      await mutation.mutate(child.id, {
        lastDate: results[0].format("YYYY-MM-DD"),
      });
    }
    results = [];
  };
  const addEventsMonthly = async () => {
    const startMonthlyDate = moment(child.lastDate);
    const endMonthlyDate = moment().startOf("month").format("YYYY-MM-DD");
    let results = [];
    const current = startMonthlyDate.clone();

    while (current.isBefore(endMonthlyDate)) {
      current.add(1, "month");
      results.push(current.startOf("month").format("YYYY-MM-DD"));
      if (results && results.length > 0) {
        results.map((result) =>
          addEvents(child, child.id, isRegular, child.price, result)
        );
        await mutation.mutate(child.id, { lastDate: results[0] });
       
      }
    }
    results = [];
  };

  useEffect(() => {
    if (child) {
      console.log("child");
      if (child.isWeekly === true) {
        console.log("true");
        addEventsWeekly();
      } else if (child.isWeekly === false) {
        console.log("false");
        addEventsMonthly();
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [child, isRegular, child.price]);
  const navigate = useNavigate();

  const handleCardOnClick = (
    e: React.MouseEvent<SVGSVGElement, MouseEvent>
  ) => {
    e.stopPropagation();
    navigate(`/child-history/${child.id}`);
  };

  const handleEditOnClick = (
    e: React.MouseEvent<SVGSVGElement, MouseEvent>
  ) => {
    e.stopPropagation();
    navigate(`/edit-child/${child.id}`);
  };

  const handlePauseOnClick = async (
    e: React.MouseEvent<HTMLElement, MouseEvent>
  ) => {
    e.stopPropagation();
    const ref = doc(db, "children", child.id);
    await updateDoc(ref, {
      isPaused: !child.isPaused,
    });
  };

  const start = moment();
  const end = moment(child.nextDate);
  const diffDays = end.diff(start, "days") + 1;

  return (
    <>
      <Row className="my-2">
        <Col
          xs={{ span: 12 }}
          md={{ span: 8, offset: 2 }}
          lg={{ span: 6, offset: 3 }}
        >
          <Card className="rounded-lg">
            <Card.Body>
              <Col md={{ span: 12 }}>
                <Row className="mb-2">
                  <Col xs={{ span: 2 }}>
                    <FontAwesomeIcon
                      icon={faUserCircle}
                      color="#D7D4D4"
                      size="3x"
                    />
                  </Col>
                  <Col xs={{ span: 3 }} className="align-self-center">
                    <h4>{child.name}</h4>
                  </Col>
                  <Col
                    xs={{ span: 1 }}
                    md={{ span: 1, offset: 0 }}
                    className="align-self-center"
                  >
                    <FontAwesomeIcon
                      icon={faArrowCircleRight}
                      color="orange"
                      size="lg"
                      onClick={handleCardOnClick}
                    />
                  </Col>
                  <Col
                    xs={{ span: 1, offset: 4 }}
                    md={{ span: 1, offset: 5 }}
                    className="align-self-start"
                  >
                    <FontAwesomeIcon
                      icon={faEdit}
                      color="#f0ad4e"
                      size="lg"
                      onClick={handleEditOnClick}
                    />
                  </Col>
                </Row>
                <Row className="mb-2 ">
                  <Col xs={{ span: 3, offset: 2 }} md={{ span: 3, offset: 2 }}>
                    <h5>Total</h5>
                  </Col>
                  <Col xs={{ span: 3, offset: 3 }} md={{ span: 3, offset: 2 }}>
                    <h5>{child.total} kr</h5>
                  </Col>
                </Row>
                <Row className="mb-2">
                  <Col xs={{ span: 3, offset: 2 }} md={{ span: 3, offset: 2 }}>
                    {child.weekly ? <h6>Weekly</h6> : <h6>Monthly</h6>}
                  </Col>
                  <Col xs={{ span: 3, offset: 3 }} md={{ span: 3, offset: 2 }}>
                    <h6>{child.price} kr</h6>
                  </Col>
                </Row>
                <Row className="mb-2">
                  <Col xs={{ span: 10, offset: 2 }} md={{ span: 7, offset: 2 }}>
                    {child.isPaused ? (
                      <h6 className="text-danger">Paused</h6>
                    ) : (
                      <h6>{`Next Allowance in ${diffDays} day(s) +${child.price} kr`}</h6>
                    )}
                  </Col>
                  <Col className="text-center mt-3">
                    <Button
                      // disabled={isLoading}
                      variant="danger"
                      size="sm"
                      onClick={handlePauseOnClick}
                      className="text-info"
                    >
                      {child.isPaused ? <>Re Start ?</> : <>Pause</>}
                    </Button>
                  </Col>
                </Row>
              </Col>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </>
  );
});
