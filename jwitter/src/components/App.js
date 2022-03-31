import AppRouter from './Router.js';
import {cloneDeep} from "lodash";
import React, {useState,useEffect} from 'react';
import { authService } from '../fbase.js';
import { onAuthStateChanged, updateProfile } from "firebase/auth";

function App() {
	const [init, setInit] = useState(false);
	const [isLoggedIn,setIsLoggedIn] = useState(false);
	const [userObj,setUserObj] = useState(null);
	useEffect(() => {
		onAuthStateChanged(authService, (user) => {
			if(user) {
				setIsLoggedIn(true);
				setUserObj(user);
			}
			else{
				setIsLoggedIn(false);
			}
			setInit(true);
		});
	},[]);
	
	const refreshUser = () => {
		setUserObj({...authService.currentUser});
	};
	
  return(
	  init ? <AppRouter 
		isLoggedIn={isLoggedIn} 
		userObj={userObj}
		refreshUser={refreshUser}/> : "Initializing..."
);       
}

export default App;
