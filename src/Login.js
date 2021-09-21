import React, {useState} from "react";
import { Link, useHistory } from "react-router-dom";
import "./Login.css";
import { auth } from "./firebase";
const Login = () => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const history = useHistory()
    const signIn = (e) => {
        e.preventDefault()
        auth.signInWithEmailAndPassword(email, password)
        .then(auth=>history.push('./'))
        .catch(err=>alert(err.message))
    }
    const register = (e) => {
        e.preventDefault()
        auth.createUserWithEmailAndPassword(email, password)
        .then(auth => {
            console.log(auth)
            if(auth){
                history.push('/')
            }
        }).catch(err => console.log(err))
    }
  return (
    <div className="login">
      <Link to="/">
        <img
          className="login_logo"
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Amazon_logo.svg/1024px-Amazon_logo.svg.png"
          alt=""
        />
      </Link>
      <div className="login_container">
        <h1>Sign-in</h1>
        <form action="">
          <h5>E-mail</h5>
          <input type="text" value={email} onInput={e => setEmail(e.target.value)}/>
          <h5>Password</h5>
          <input type="password" name="" id="" value={password} onInput={e=> setPassword(e.target.value)}/>
          <button className="login_signInButton" onClick={signIn}>Sign In</button>
        </form>
        <p>
          By signing-in you agree to the AMAZON FAKE CLONE Conditions of Use &
          Sale. Please see our Privacy Notice, our Cookies Notice and our
          Interest-Based Ads Notice.
        </p>
        <button className="login_registerButton" onClick={register}>
          Create your Amazon account
        </button>
      </div>
    </div>
  );
};

export default Login;
