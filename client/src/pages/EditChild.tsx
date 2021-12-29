import { memo, VFC } from "react";
import { ChildEditForm } from "../components/ChildEditForm";
import { useParams } from "react-router-dom";
import useGetDocument from "../hooks/useGetDocument";


export const EditChild: VFC = memo(() => {
  const { id } = useParams();
  const childQuery = useGetDocument('children', id??"" );

  if (childQuery.isLoading) {
    return <p>Loading...</p>;
  }
  return childQuery.data ?(
    <>
   <h3 className="text-center">Edit {childQuery.data.name} </h3>
      <ChildEditForm id={id} child={childQuery.data} />
    </>
  ):<p>No child</p>;
});
