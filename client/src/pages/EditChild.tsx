import { memo, VFC } from "react";
import { useLocation } from 'react-router-dom'
import { ChildForm } from "../components/ChildForm";
export const EditChild: VFC = memo(() => {
  const location =useLocation()
  return (
    <>
    <h3 className='text-center'>
      {location.state.name}
    </h3>
    <ChildForm />
    </>
  );
});  