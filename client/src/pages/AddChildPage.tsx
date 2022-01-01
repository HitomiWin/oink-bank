import { VFC, memo } from "react";


import useAddChild from "../hooks/useAddChild";
import { AddChildForm } from "../components/AddChildForm";

export const AddChildPage: VFC = memo(() => {
  const childQuery = useAddChild();
  
  return (
    <>
      <h3 className="text-center">Add Child</h3>
      <AddChildForm childQuery={childQuery} />
    </>
  );
});
