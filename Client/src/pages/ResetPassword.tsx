import { useState } from "react"
import axios from "axios"
import { ToastContainer, toast } from "react-toastify"

export const ResetPassword = () => {
    const [email, setEmail] = useState("")
    const [message, setMessage] = useState(false)
  
    const mailValue = (e: any) => setEmail(e.target.value)
  
    const sendLink = async (e: any) => {
      e.preventDefault()
  
      if (email === "") {
        toast.error("Email requis", {
          position: "top-center"
        })
      } else if (!email.includes("@")) {
        toast.warning("Il faut le @ dans votre mail", {
          position:"top-center"
        })
      } else {
        const res = await axios({
          method:"post",
          url: `${process.env.REACT_APP_API_URL}api/user/resetPasswordLink`,
          headers: {
            "Content-Type": "application/json"
          },
          data: JSON.stringify({email})
        })
  
        const data = await res.data()
  
        if (data.status = 201) {
          setEmail("")
          setMessage(true)
        } else {
          toast.error("Utilisateur introuvable", {
            position: "top-center"
          })
        }
      }
    }
    return (
      <div>
        <div>
          <h2>Entre votre adresse mail</h2>
        </div>
  
        {message ? <p>Mot de passe envoyé avec succés</p> :""}
  
        <form>
          <div>
            <label htmlFor='email'>Adresse email</label>
            <input type="email" value={email} onChange={mailValue} name="email"
            id='email' placeholder='Entre votre adresse mail'/>
          </div>
  
          <button onClick={sendLink}>Envoyer</button>
        </form>
        <ToastContainer/>
      </div>
    )
}
