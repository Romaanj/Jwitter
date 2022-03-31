import React,{useState} from "react";
import { deleteDoc, doc, updateDoc } from "firebase/firestore";
import { dbService } from "../fbase.js";

const Jweet = ({jweetObj, isOwner}) => {
	const [editing, setEditing] = useState(false);
	const [newJweet, setNewJweet] = useState(jweetObj.sentence);
	
	const onDeleteClick = async () => {
		const ok = window.confirm("Are you sure you want to delete your jweet??");
		if (ok) {
			await deleteDoc(doc(dbService, "jweet", `${jweetObj.id}`));
		}
	};
	
	const toggleEditing = () => setEditing((prev) => !prev);
	
	const onSubmit = async (event) => {
		event.preventDefault();
		await updateDoc(doc(dbService,"jweet", `${jweetObj.id}`),{sentence:newJweet,});
		setEditing(false);
	};
	
	const onChange = (event) => {
		const {
			target : {value},
		} = event;
		setNewJweet(value);
	};
	
	return(
	<div>	
			{editing ? (<>
			<form onSubmit={onSubmit}>
			 <input value={newJweet}
				 type="text"
				 placeholder="Edit your jweet"
				 required
				 onChange={onChange}/>
			<input type="submit" value="Update Jweet" />
			 </form>
			<button onClick={toggleEditing}>Cancel</button>
			</>) : ( <>
			<h4>{jweetObj.sentence}</h4>
			{jweetObj.attachmentURL && (
            <img src={jweetObj.attachmentURL} alt="" width="50px" height="50px" />
          	)}
			{isOwner && (<>
			 <button onClick={onDeleteClick}>Delete jweet!</button>
			 <button onClick={toggleEditing}>Edit jweet!</button>
			 </>)}
	</>
	)
	}
    </div>
	)
};

export default Jweet;