import { useEffect, useState } from 'react'
import { db } from '../firebase'
import { doc, onSnapshot, DocumentData } from 'firebase/firestore'

const useGetDocument = (col:string, id:string) => {
  
	const [isLoading, setIsLoading] = useState(true)
  const [isError, setIsError] =useState(false)
  const [error,setError] = useState<string | null>(null)
	const [data, setData] = useState<DocumentData| null>(null)

  const getDoc =async()=>{
    setIsLoading(true)
    setIsError(false)
    setError(null)

		// get document reference
		const ref = doc(db, col, id)

		// attach listener
		const unsubscribe = onSnapshot(ref, (snapshot) => {
			if (!snapshot.exists()) {
				setData(null)
				setIsLoading(false)
				return
			}

			setData(snapshot.data())
			setIsLoading(false)
		},(error)=>{
      setError(error.message)
      setIsError(true)
      setIsLoading(false)
      
    })
      return unsubscribe

  }
  useEffect(() => {
    getDoc()
    return () => {
      getDoc()
    }
   // eslint-disable-next-line react-hooks/exhaustive-deps
	}, [col,id])


	return {
		isLoading,
		data,
    error,
    isError
	}
}

export default useGetDocument
