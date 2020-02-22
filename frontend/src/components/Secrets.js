import React, {useState} from 'react' ;

export const Secrets = () => {
    const [authStatus, setAuthStatus] = useState('')
    const [secret, setSecret] = useState('')

    const accessToken = window.localStorage.getItem('accessToken')
    console.log("Access token from localStorage: " + accessToken)

    // Get secret from back-end. Here we use GET and not POST (see back end code)
    fetch('http://localhost:8080/secrets', {
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
        <div>Status: { authStatus }.<br />Secret: { secret }</div>
    )
}