import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateUser } from "../redux/actions/user.actions";
import UpdatePassword from "./UpdatePassword";

export const UserProfile = (userProps:any) => {

    const userData = useSelector((state: any) => state.userReducer)
    const dispatch = useDispatch

    const [name, setName] = useState(userData.name)
    const [address, setAddress] = useState(userData.adress)
    const [updateForm, setUpdateForm] = useState(false)
  
    const handleUpdate = () => {
      updateUser(userProps, dispatch)
      setUpdateForm(false)
    }
    return (
      <div>
        <h1>Profil de {userData.name}</h1>
        <h3>{userData.address}</h3>
  
        {updateForm === false && (
          <>
            <p onClick={() => setUpdateForm(!updateForm)}>Modifier votre profil</p>
          </>
        )}
  
        {updateForm && (
          <>
            <input type="text" defaultValue={name} onChange={(e)=> setName
            (e.target.value)}/>
            <textarea defaultValue={address} onChange={(e)=>
            setAddress(e.target.value)}/>
  
            <button onClick={handleUpdate}>Valider les modifications</button>
          </>
        )}
  
        <div>
          <h2>Modifier votre mot de passe</h2>
          <UpdatePassword/>
        </div>
        
      </div>
    )
}
