import { memo, VFC } from "react";
import { ChildrenList } from "../components/ChildrenList";
export const HomePage: VFC = memo(() => {
  return (
    <ChildrenList />
  );
});

