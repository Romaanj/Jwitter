import React,{ useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import { collection, addDoc, onSnapshot, query, orderBy} from "firebase/firestore";
import { dbService, storageService, authService } from "../fbase.js";
import Jweet from "../components/Jweet.js";
import { signOut } from "firebase/auth"
import { ref, uploadString,getDownloadURL,deleteObject } from "firebase/storage"

const Home = ({userObj}) => {
	let fileRef;
	const [jweet,setJweet] = useState("");
	const [jweets, setJweets] = useState([]);
	const [attachment,setAttachment] = useState("");
	const jweetsRef = collection(dbService, "jweet");
	const q = query(jweetsRef, orderBy("createAt","desc"));
	
	useEffect(() => {
		onSnapshot(q,(snapshot) => {
			const jweetArray = snapshot.docs.map((doc) => ({
				id: doc.id,
				...doc.data(),
			}));
			setJweets(jweetArray);
		});
	},[]);
	
	const onChange = (event) => {
		setJweet(event.target.value);
	};
	
	const onSubmit = async (event) => {
		event.preventDefault();
		let attachmentURL;
		if(attachment !== "") {
		fileRef = ref(storageService, `${userObj.uid}/${uuidv4()}`);
		await uploadString(fileRef, attachment,'data_url');
		attachmentURL = await getDownloadURL(fileRef);
		}
		else {
			attachmentURL = "";
		}
		const jweetInclude = {
			createAt : Date.now(),
			sentence : jweet,
			creatorId : userObj.uid,
			attachmentURL,
		};
		await addDoc(jweetsRef, jweetInclude);
		setJweet("");
		setAttachment("");
	};
	
	const onFileChange = (event) => {
		const {
			target : {files,}
		} = event;
		const theFile = files[0];
		const reader = new FileReader();
		reader.onloadend = (finishedEvent) => {
			const { currentTarget: 
				{result},
			} = finishedEvent;
			setAttachment(result);
		};
		reader.readAsDataURL(theFile);
	};
	const navigate = useNavigate();
	
	const onClickSignOut = () => {
		signOut(authService);
		navigate("/", { replace: true });
	}
	
	const onClearAttachment = () => {
		setAttachment("");
		deleteObject(fileRef);
	}
	return(
	<div>
		<form onSubmit={onSubmit}>
			<input onChange={onChange} value={jweet} type="text" placeholder="What's your mind?" maxLength="120"/>
			<input className="click" type="submit" value="Jweet"/>
			<input onChange={onFileChange} type="file" accept="image/*"/>
			{attachment && (<div>
				<img src={attachment} alt="jweet" width="50px" height="50px"/>
				<button onClick={onClearAttachment}>Clear</button>
			</div>)}
		</form>
			<Link to="/profile"><button className="click">Profile</button></Link>
			<button className="click" onClick={onClickSignOut}>LogOut</button>
		<div>
        	{jweets.map((item) => ( 
				<Jweet key={item.id}
				jweetObj={item}
				isOwner={item.creatorId === userObj.uid}/>
        	))}
      	</div>
	</div>);
};

export default Home;