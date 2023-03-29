import React from 'react'
import { useState } from 'react'


function LoginForm({onLogin}) {
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [errors, setErrors] = useState([]);
    const [isLoading, setIsLoading] = useState(false);


    function handleSubmit(e) {
        e.preventDefault()
        setIsLoading(true);
        fetch ("http://localhost:3000/users/login", { 
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({username :username, password :password})


        })
        .then((r)=>{
          setIsLoading(false);
            if (r.ok) {
                r.json().then((user) => onLogin(user))
               ;
            }
           else {
                r.json().then((err) => setErrors(err.errors))  

           }
        })
    }
  
    return (
    <div>
        <form onSubmit={handleSubmit}>
      
        <label >Username</label>
        <input
          type="text"
          id="username"
          autoComplete="off"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
     
     
        <label htmlFor="password">Password</label>
        <input
          type="password"
          id="password"
          autoComplete="current-password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
     
      
        <button  type="submit">
            {isLoading ? "Loading..." : "Login"}
         
        </button>
     
      
        {/* {errors.map((err) => (
          <Error key={err}>{err}</Error>
        ))} */}
      
    </form>
    </div>
  )
}

export default LoginForm