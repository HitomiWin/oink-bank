import { memo, VFC } from "react";
import "../scss/App.scss";
import { Alert } from "react-bootstrap";
import { DocumentData } from "firebase/firestore";
import { ChildCard } from "./ChildCard";
import useChildren from "../hooks/useChildren";
// import useGetCollectioin from "../hooks/useGetCollection";

export interface Child {
  _id: string;
  name: string;
  weekly: boolean;
  isPaused: boolean;
  price: Number;
  nextDate?: Date;
  lastDate?: Date;
  parent: string;
}

export const ChildrenList: VFC = memo(() => {
  // const childrenQuery = useGetCollectioin('children', 'name')
  const childrenQuery = useChildren();

  if (childrenQuery.isError) {
    return <Alert variant="warning">{childrenQuery.error}</Alert>;
  }
  
  if (childrenQuery.isLoading) {
    return <p>Loading...</p>;
  }

  return (
    <>
      <h3 className="text-center">Children</h3>
      {childrenQuery.data && (
        <>
          {childrenQuery.data.length ? (
            childrenQuery.data.map((child: DocumentData) => (
              <ChildCard key={child._id} child={child} />
            ))
          ) : (
            <p>No children</p>
          )}
        </>
      )}
    </>
  );
});
