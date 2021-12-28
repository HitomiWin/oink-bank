import { memo, VFC } from "react";
import "../scss/App.scss";
import { Alert } from "react-bootstrap";
import { ChildCard } from "./ChildCard";
import useChildren from "../hooks/useGetChildren";

export const ChildrenList: VFC = memo(() => {
  const childrenQuery = useChildren();
  const snapshot = childrenQuery.data;
  const snapDoc = snapshot?.docs.map((d) => {
    return { id: d.id, ...d.data() };
  });

  if (childrenQuery.isError) {
    return <Alert variant="warning">{childrenQuery.error}</Alert>;
  }

  if (childrenQuery.isLoading) {
    return <p>Loading...</p>;
  }
  return snapDoc ? (
    <>
      <h3 className="text-center">Children</h3>
      {snapDoc.map((child)=>(
        <ChildCard key={child.id} child={child} />
      ))}
    </>
  ) : (
    <p>No children</p>
  );
 
});
