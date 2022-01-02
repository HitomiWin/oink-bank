import { memo, VFC } from "react";
import { EditChildForm } from "../components/EditChildForm";
import { useParams } from "react-router-dom";
import { Alert } from "react-bootstrap";

import useGetDocument from "../hooks/useGetDocument";

export const EditChildPage: VFC = memo(() => {
  const { id } = useParams();
  const childQuery = useGetDocument("children", id ?? "");


  if (childQuery.isError) {
    return <Alert variant="warning">{childQuery.error}</Alert>;
  }

  if (childQuery.isLoading) {
    return <p>Loading...</p>;
  }
  return childQuery.data ? (
    <>
      <h3 className="text-center">Edit {childQuery.data.name} </h3>
      <EditChildForm
        id={id ?? ""}
        child={childQuery.data}
      />
    </>
  ) : (
    <p>No child</p>
  );
});
