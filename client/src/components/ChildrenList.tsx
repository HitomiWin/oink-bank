import { memo, VFC} from "react";
import "../App.scss";
import { ChildCard } from "./ChildCard";

export const ChildrenList: VFC = memo(() => {

  return (
    <>
      <h3 className='text-center'>Children</h3>
      <ChildCard />
    </>
  );
});
