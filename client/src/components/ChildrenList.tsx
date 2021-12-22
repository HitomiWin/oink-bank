import { memo, VFC, useState } from "react";
import "../App.scss";
import { ChildCard } from "./ChildCard";

export const ChildrenList: VFC = memo(() => {
  const [loading, setLoading] = useState(false);
  return (
    <>
      <h3 className='text-center'>Children</h3>
      <ChildCard />
    </>
  );
});
