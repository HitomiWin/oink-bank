import { collection, doc } from "firebase/firestore";
import { useFirestoreDocumentMutation } from "@react-query-firebase/firestore";
// import { DocumentData} from "firebase/firestore";

import { db } from "../firebase";

const useEditChild =  ( id:string) => {
  
    const ref = doc(collection(db, "children"), id)
    const mutation = useFirestoreDocumentMutation(ref,{
      merge: true,
    });

  return  mutation;
};

export default useEditChild;


