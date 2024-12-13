import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateUser } from "../redux/actions/user.actions";
import UpdatePassword from "./UpdatePassword";

export const UserProfile = () => {
    type appDispatch = () => any

    const [name, setName] = useState("")
    const [address, setAddress] = useState("")
    const [updateForm, setUpdateForm] = useState(false)
  
    const userData = useSelector((state: any) => state.userReducer)
    const useAppDispatch = () => useDispatch<appDispatch>()
    const dispatch = useAppDispatch()
  
    const handleUpdate = () => {
      dispatch(updateUser(userData._id, name, address))
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
            <input type="text" defaultValue={userData.name} onChange={(e)=> setName
            (e.target.value)}/>
            <textarea defaultValue={userData.address} onChange={(e)=>
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
