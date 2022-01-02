import { useState } from "react";
import {
  collection,
  addDoc,
  // query,
  // where,
  orderBy,
  DocumentData,
} from "firebase/firestore";
import { db } from "../firebase";

const useAddEvents = () => {
  const [error, setError] = useState<null | boolean>(null);
  const [isError, setIsError] = useState<null | boolean>(null);
  const [isLoading, setIsLoading] = useState<null | boolean>(null);
  const [isSuccess, setIsSuccess] = useState<null | boolean>(null);

  const addEvents = async (child: DocumentData, id:string, isRegular: boolean, price:number, paymentDate:string) => {
    setError(null);
    setIsError(null);
    setIsSuccess(null);
    setIsLoading(true);
    

    try {isRegular?
      await addDoc(collection(db, "children", id, "events"), {
        paymentDate,
        price,
        isRegular,
      }): await addDoc(collection(db,"children", id,"events"),{
        paymentDate,
        price,
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


  return { error, isError, isLoading, isSuccess, addEvents };
};

export default useAddEvents;
