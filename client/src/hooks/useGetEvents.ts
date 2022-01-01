import { useFirestoreQuery } from "@react-query-firebase/firestore";
import { collection, query,  orderBy } from "firebase/firestore";
import { db } from "../firebase";


const useGetEvents = (id:string ) => {
  const colEventsRef = collection(db, "children", id, "events");
  const queryKey = ["events", id];
  const queryRef = query(
    colEventsRef,
    orderBy("paymentDate",'desc')
  );
  const getEventsQuery = useFirestoreQuery(
    queryKey,
    queryRef,
    {
      subscribe: true,
    },
    {
      refetchOnMount: "always",
    }
  );

  return getEventsQuery;
};

export default useGetEvents;
