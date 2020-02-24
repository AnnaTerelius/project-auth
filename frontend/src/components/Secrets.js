import React, {useState} from 'react' ;

const backendUrl = process.env.BACKEND_URL || "http://localhost:8080"

export const Secrets = () => {
  const [authStatus, setAuthStatus] = useState('')
  const [secret, setSecret] = useState('')

  const accessToken = window.localStorage.getItem('accessToken')
  console.log("Access token from localStorage: " + accessToken)

  // Get secret from back-end. Here we use GET and not POST (see back end code)
  fetch(backendUrl+'/secrets', {
      method: 'GET',
      headers: { 'Authorization': accessToken }
    })
      .then(res => { 
          if (!res.ok) {
            setAuthStatus('Something went wrong')
          }else{
            setAuthStatus('Success')
          }
          return res.json();
       })
      .then(res => {
          console.log("res: " + res)
        setSecret(JSON.stringify(res))
    })

    return (
      <div className='mainContainer'>
      <div className='txt-btn-container'>
        <div>Status: { authStatus }.<br />Secret: { secret }</div>
        <button className='signout-btn' onClick={() => (
           window.localStorage.removeItem('accessToken'),
           window.location.href = "/sessions"
           )} type="button"> Log Out </button>
        </div>
        </div>
         

        

      

       

       
    )
}