import { memo, VFC } from "react";
import { ChildForm } from "../components/ChildForm";
export const EditChild: VFC = memo(() => {
  return (
    <>
    <h3 className='text-center'>
      Edit Name
    </h3>
    <ChildForm />
    </>
  );
});  