import { useState } from "react";
import { collection, addDoc,DocumentData} from "firebase/firestore";

import { db } from "../firebase";

const useAddChild = () => {
  const [error, setError] = useState<null | boolean>(null);
  const [isError, setIsError] = useState<null | boolean>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isSuccess, setIsSuccess] = useState<null | boolean>(null);

  const addChild = async (childInfo:DocumentData) => {
    setError(null);
    setIsError(null);
    setIsSuccess(null);
    setIsLoading(true);

    try {

      await addDoc(collection(db, "children"), childInfo);
      setIsSuccess(true);
      setIsLoading(false);
    } catch (e: any) {
      setError(e.message);
      setIsError(true);
      setIsLoading(false);
      setIsSuccess(false);
    }
  };


  return { error, isError, isLoading, isSuccess, addChild };
};

export default useAddChild;
