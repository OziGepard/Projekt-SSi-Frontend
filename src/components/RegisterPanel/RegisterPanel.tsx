import { useState } from "react"

export const RegisterPanel = () => {
    const [userCredentials,setUserCredentials] = useState({username: '', email:'', password: '', confirmPassword: ''});

    //TODO: submit to backend
    const handleSignUp = () => {
        //sendRequest(userCredentials)
    }

    return(
        <div style={{width:'100%', display:'flex', justifyContent:'center', alignItems:'center'}}>
        <div style={{display:'flex', flexDirection:'column', width:'30%', alignItems:'center', gap:'1.5rem',boxShadow:'8px 8px 24px 0px rgba(66, 68, 90, 1)', borderRadius:'25px', padding:'2rem'}}>
            <h2>Sign Up</h2>
            <div style={{display:'flex', flexDirection:'column'}}>
                <p style={{fontWeight:'bold', marginLeft:'1.5rem'}}>Username</p>
                <input placeholder='Username' type="text" style={{height:'2rem',  borderRadius:'25px', padding:'0.5rem'}} onChange={e => setUserCredentials(prevValue => ({...prevValue, username: e.target.value}))}/>
            </div>
            <div style={{display:'flex', flexDirection:'column'}}>
                <p style={{fontWeight:'bold', marginLeft:'1.5rem'}}>Email</p>
                <input placeholder='Email' type='email' style={{height:'2rem',  borderRadius:'25px', padding:'0.5rem'}} onChange={e => setUserCredentials(prevValue => ({...prevValue, username: e.target.value}))}/>
            </div>
            
            <div style={{display:'flex', flexDirection:'column'}}>
                <p style={{fontWeight:'bold', marginLeft:'1.5rem'}}>Password</p>
                <input placeholder="*******" type="password" style={{height:'2rem', borderRadius:'25px', padding:'0.5rem'}} onChange={e => setUserCredentials(prevValue => ({...prevValue, password: e.target.value}))}/>
            </div>
            <div style={{display:'flex', flexDirection:'column'}}>
                <p style={{fontWeight:'bold', marginLeft:'1.5rem'}}>Confirm Password</p>
                <input placeholder="*******" type="password" style={{height:'2rem', borderRadius:'25px', padding:'0.5rem'}} onChange={e => setUserCredentials(prevValue => ({...prevValue, password: e.target.value}))}/>
            </div>
            <button style={{width:'25%', height:'3rem', borderRadius:'25px', backgroundColor:'lightblue'  }} onClick={handleSignUp}> SignUp</button>
            <p>Already have an account?</p><a href="/login">Sign In</a>
        </div>
        </div>
    )
}