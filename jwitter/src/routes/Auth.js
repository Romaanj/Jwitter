import React,{useState} from 'react';
import { createUserWithEmailAndPassword,signInWithEmailAndPassword } from "firebase/auth";
import { authService } from "../fbase.js";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";

const Auth =  () => {
	const [email,setEmail] = useState("");
	const [password,setPassword] = useState("");
	const [newAccount,setNewAccount] = useState(true);
	const [error, setError] = useState("");
	const onChange = (event) => {
		const {name, value} = event.target;
		if (name === "email") {
			setEmail(value);
		}
		else if (name === "password") {
			setPassword(value);
		}
	};
	const onSubmit = async (event) => {
		event.preventDefault();
		try {
			let data;
			if (newAccount) {
				data=await createUserWithEmailAndPassword(authService, email, password);
			}
			else {
				data = await signInWithEmailAndPassword(authService, email, password);
			}
		}
		catch (error) {
      	setError(error.message);
		};
	}
	const toggleAccount = () => setNewAccount( (prev) => !prev );
	const onSocialClick = async (event) => {
		const provider = new GoogleAuthProvider();
		const data1= await signInWithPopup(authService, provider);
	}
return ( 
	<div>
		<form onSubmit={onSubmit}>
			<input 
				name="email" 
				type="email" 
				placeholder="Email" 
				required 
				value={email}
				onChange={onChange}/>
			<input 
				name="password" 
				type="password" 
				placeholder="Passwored" 
				required 
				value={password}
				onChange={onChange}/>
			<input type="submit" value={newAccount ? "Create Account" : "Log In"}  />
			<span>{error}</span>
		</form>
		<span onClick={toggleAccount}>{newAccount ? "Sign in" : "Create Account"}</span>
		<div>
		<button name="Google" onClick={onSocialClick}>Continue with Google!</button>
		</div>
	</div>
)};
export default Auth;