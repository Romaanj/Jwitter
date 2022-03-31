import React,{useEffect, useState} from 'react';
import { useNavigate } from 'react-router-dom';
import { collection, query, where, getDocs} from "firebase/firestore";
import { dbService, authService} from "../fbase.js";
import { updateProfile, signOut } from "firebase/auth"
import { Link } from 'react-router-dom';


const Profile = ({userObj, refreshUser}) => {
	const navigate = useNavigate();
	const [newDisplayName, setNewDisplayName] = useState(userObj.displayName);
	 const onChange = (event) => {
    	const {
      	target: { value },
    	} = event;
    	setNewDisplayName(value);
  	};
	
  	const onSubmit = async (event) => {
    	event.preventDefault();
    	if (userObj.displayName !== newDisplayName) {
      	await updateProfile(authService.currentUser,({
        	displayName: newDisplayName
      	}));
		refreshUser();
    	};
	};
	
	const onClickSignOut = () => {
		signOut(authService);
		navigate("/", { replace: true });
	}
	/** const getMyJweet = async () => {
		const q = query(collection(dbService, "jweet"), where("creatorId", "==", userObj.uid));
		const jweets = await getDocs(q); 
		jweets.forEach((doc)=> {
			console.log(doc.data());
		});
	}
	useEffect(() =>{
		getMyJweet();
	} ,[]);**/
	return (
    <>
		<h3>{userObj.displayName}'s Profile</h3>
      <form onSubmit={onSubmit}>
        <input
          onChange={onChange}
          type="text"
          placeholder="Display name"
          value={newDisplayName}
        />
        <input type="submit" value="Update Profile" />
      </form>
      <button onClick={onClickSignOut}>Log Out</button>
		<Link to="/"><button>Home</button></Link>
    </>
  );
};
	
export default Profile;