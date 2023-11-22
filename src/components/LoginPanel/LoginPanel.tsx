import { useState } from "react"

export const LoginPanel = () => {
    const [userCredentials,setUserCredentials] = useState({username: '', password: ''});

    //TODO: submit to backend
    const handleLogin = () => {
        //sendRequest(userCredentials)
    }

    return(
        <div style={{width:'100%', display:'flex', justifyContent:'center', alignItems:'center'}}>
        <div style={{display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', width:'30%', gap:'1.5rem',boxShadow:'8px 8px 24px 0px rgba(66, 68, 90, 1)', borderRadius:'25px', padding:'2rem'}}>
            <h2>Log In</h2>
            <div style={{display:'flex', flexDirection:'column'}}>
                <p style={{fontWeight:'bold', marginLeft:'1.5rem'}}>Username</p>
                <input placeholder='Username' type="text" style={{height:'2rem', width:'100%',  borderRadius:'25px', padding:'0.5rem'}} onChange={e => setUserCredentials(prevValue => ({...prevValue, username: e.target.value}))}/>
            </div>
            <div style={{display:'flex', flexDirection:'column'}}>
                <p style={{fontWeight:'bold', marginLeft:'1.5rem'}}>Password</p>
                <input placeholder="*******" type="password" style={{height:'2rem', borderRadius:'25px', width:'100%', padding:'0.5rem'}} onChange={e => setUserCredentials(prevValue => ({...prevValue, password: e.target.value}))}/>
            </div>
            <button style={{width:'25%', height:'3rem', borderRadius:'25px', backgroundColor:'lightblue'  }} onClick={handleLogin}> Login</button>
            <p>Don't have an account?</p><a href="/register">Sign Up</a>
        </div>
        </div>
    )
}