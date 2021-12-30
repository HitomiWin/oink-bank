import { useState, useEffect } from "react";
import {
  collection,
  addDoc,
  // query,
  // where,
  // orderBy,
  DocumentData,
} from "firebase/firestore";
import { db } from "../firebase";

const useAddEvents = (child: DocumentData, isRegular: boolean) => {
  const [error, setError] = useState<null | boolean>(null);
  const [isError, setIsError] = useState<null | boolean>(null);
  const [isLoading, setIsLoading] = useState<null | boolean>(null);
  const [isSuccess, setIsSuccess] = useState<null | boolean>(null);

  const addEvents = async () => {
    setError(null);
    setIsError(null);
    setIsSuccess(null);
    setIsLoading(true);

    try {
      await addDoc(collection(db, "children", child.id, "events"), {
        paymentDate: new Date(),
        price: child.price,
        isRegular,
      });
      setIsSuccess(true);
      setIsLoading(false);
    } catch (e: any) {
      setError(e.message);
      setIsError(true);
      setIsLoading(false);
      setIsSuccess(false);
    }
  };
  useEffect(() => {
    if (isRegular) {
      addEvents();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [child]);

  return { error, isError, isLoading, isSuccess, addEvents };
};

export default useAddEvents;
