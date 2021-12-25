import React,{VFC, memo} from "react";
import { ChildForm } from "../components/ChildForm";

export const RegisterChild: VFC = memo(() => {
 return (
   <>
   <h3 className='text-center'>Add Child</h3>
   <ChildForm />
   </>
 )
  
});
