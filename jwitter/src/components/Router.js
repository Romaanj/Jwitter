import React from 'react';
import {BrowserRouter,Routes,Route} from 'react-router-dom';
import Auth from "../routes/Auth.js";
import Home from "../routes/Home.js";
import Profile from "../routes/Profile.js";

const AppRouter = ({isLoggedIn, userObj, refreshUser}) => {
	return (
		<BrowserRouter>
			<Routes>
				{isLoggedIn ? <>
					<Route path ='/' element={<Home userObj={userObj}/>}/>
				<Route path ='/profile' element={<Profile userObj={userObj} refreshUser={refreshUser}/>}/> 
				</> : <Route path ='/' element={<Auth/>}/>};
			</Routes>
		</BrowserRouter>
		);
};

export default AppRouter;