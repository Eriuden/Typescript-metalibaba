import axios from "axios"
import { useState, useEffect } from "react"
import { useNavigate, useParams, Link } from "react-router-dom"
import { ToastContainer, Toast } from "react-toastify/dist/components"

const UpdatePassword = () => {
    const {id , token} = useParams()

    const validUser = useNavigate()
  
    const [weHaveTheData, setWeHaveTheData] = useState(false)
    const [password, setPassword] = useState("")
    const [isUpdated, setIsUpdated] = useState(false)
  
    const userValid = async() => {
      const res = await axios({
        method:"get",
        url: `${process.env.REACT_APP_API_URL}api/user/updatePassword/${id}/${token}`,
        headers: {
          "Content-Type" :"application/json"
        }
      })
  
      const data = await res.data()
  
      if (data.status == 201) {
        console.log("utilisateur valide")
      } else {
        validUser("")
      }
    }
  
    const setValue = (e: any) => {
      setPassword(e.target.value)
    }
  
    const sendPassword = async(e: any) => {
      e.preventDefault()
  
      if (password === "") {
        Toast.error("Mot de passe exigé", {
          position:"top-center"
        })
      } else if (password.length < 8) {
        Toast.error("Mot de passe trop court, 8 caractères minimum", {
          position:"top-center"
        })
      } else {
        const res = await axios({
          method:"post",
          url: `/${id}/${token}`,
          headers: {
            "Content-Type": "application/json"
          },
          data: JSON.stringify({password})
        })
  
        const data = await res.data()
  
        if (data.status === 201) {
          setPassword("")
          setIsUpdated(true)
        } else {
          Toast.error(" Token expiré !", {
            position:"top-center"
          })
        }
      }
    }
  
    useEffect(()=> {
      userValid()
      setTimeout(()=> {
        setWeHaveTheData(true)
      }, 3000)
    }, [])
  
  
    return (
      <div>
        {weHaveTheData ? (
          <div>
            <div>
              <h2>
                Entrez votre nouveau mot de passe
              </h2>
            </div>
  
            <form>
              {isUpdated ? <p>Mot de passe mis à jour avec succés</p> :""}
  
              <label htmlFor='password'>Nouveau mot de passe</label>
              <input type="password" value={password} onChange={setValue}
              name="password" id='password' placeholder='Entrez votre nouveau
              mot de passe'/>
              <button onClick={sendPassword}>Envoyer</button>
            </form>
  
            <p> <Link to={"/"}>Accueil</Link></p>
            <ToastContainer/>
          </div>
        ) :""}
      </div>
    )
}

export default UpdatePassword
