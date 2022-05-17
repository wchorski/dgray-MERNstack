import { Outlet } from "react-router-dom";
import { useState, useEffect } from "react";
import useRefreshToken  from '../hooks/useRefreshToken'
import useAuth from '../hooks/useAuth'
import { ImSpinner9 } from 'react-icons/im'

export const LoginPersist = () => {
  const [isLoading, setisLoading] = useState(true)
  const refresh = useRefreshToken()
  const { auth, persist } = useAuth()

  useEffect(() => {
    let isMounted = true

    const verifyRefreshToken = async () => {
      try{
        await refresh()
      } catch (err){
        console.error(err);
      } finally {
        isMounted && setisLoading(false)
      }
    }

    !auth?.accessToken ? verifyRefreshToken() : setisLoading(false)
  
    return () => isMounted = false
  }, [])

  useEffect(() => {
    console.log(`isLoading: ${isLoading}`);
    console.log(`accessToken: ${JSON.stringify(auth?.accessToken)}`);
  }, [isLoading])


  return(
    <>
      {!persist
        ? <Outlet />  
        : isLoading
          ? <p>Loading... <ImSpinner9 className="loadingicon"/></p>
          :<Outlet />
      }
    </>
  )
}