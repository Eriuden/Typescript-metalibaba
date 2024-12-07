import { useState } from "react"
import axios from "axios"

export const Inscription = () => {
  const [formSubmit, setFormSubmit] = useState(false)
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [address, setAddress] = useState("")
  const [password, setPassword] = useState("")
  const [passwordControl, setPasswordControl] = useState("")

  const handleRegister = async(e:any)=> {
    e.preventDefault()

    const terms = document.getElementById("terms") as HTMLInputElement
    
    const nameError = document.querySelector(".name.error") as HTMLInputElement
    const emailError = document.querySelector(".email.error") as HTMLInputElement
    const addressError = document.querySelector(".address.error") as HTMLInputElement
    const passwordError = document.querySelector(".password.error") as HTMLInputElement
    const passwordConfError = document.querySelector(".password-conf.error") as HTMLInputElement
    const termsError = document.querySelector(".terms.error") as HTMLInputElement

    passwordConfError.innerHTML=""
    termsError.innerHTML=""

    if(password !== passwordConfError.value || password.length < 8 || !terms.checked) {
      if (password !== passwordControl) {
        passwordConfError.innerHTML ="Les mots de passe ne correspondent pas"
      }
      if(password.length < 8) {
        passwordConfError.innerHTML ="Mot de passe trop court, minimum 8 caractères"
      }
      if(!terms.checked){
        termsError.innerHTML="Veuillez accepter les conditions générales"
      }
    } else {
      await axios({
        method:"post",
        url: `${process.env.REACT_APP_API_URL}api/user/register`,
        data: {
          name,
          email,
          address
        }
      })
      .then((res:any)=> {
        if (res.data.errors){
          nameError.innerHTML = res.data.errors.name 
          emailError.innerHTML = res.data.errors.email
          addressError.innerHTML = res.data.errors.address  
          passwordError.innerHTML = res.data.errors.password 
        } else {
          setFormSubmit(true)
        }
      })
      .catch((err:string)=> console.log(err))
    }
  }

  return (
    <div className='flex flex-col'>
      <>
        {formSubmit ? (
          <>
            <h4> Votre inscription s'est bien déroulé,
              vous pouvez vous connecter
            </h4>
          </>
        ) : (
          <form action='' onSubmit={handleRegister} className="bg-slate-100 flex
           flex-col border-2 border-l-4 border-b-4 rounded-md border-black mx-12
           bg-gradient-to-r from-slate-300 via-slate-400 to-slate-300
           my-4 md:mx-[20%] lg:mx-[20%]">

              <label htmlFor='name' className='mt-2 text-center text-black font-serif'>Votre nom</label>
              <input className='border-2 border-black mx-12 sm:mx-52 md:mx-[30%]
              lg:mx-[30%]' type="text" name='name' value={name} 
              onChange={(e)=> setName(e.target.value)}/>
              <div className='name error'></div>

              <label htmlFor='email' className='mt-2 text-center text-black font-serif'>Votre adresse mail</label>
              <input className='border-2 border-black mx-12 sm:mx-52 md:mx-[30%]
              lg:mx-[30%]' type="text" name='email' value={email} 
              onChange={(e)=> setEmail(e.target.value)}/>
              <div className='email error'></div>

              <label htmlFor='address' className='mt-2 text-center text-black font-serif'>Votre adresse</label>
              <input className='border-2 border-black mx-12 sm:mx-52 md:mx-[30%]
              lg:mx-[30%]' type="text" name='address' value={address} 
              onChange={(e)=> setAddress(e.target.value)}/>
              <div className='address error'></div>

              <label htmlFor='password' className='mt-2 text-center text-black font-serif'>Votre mot de passe</label>
              <input className='border-2 border-black mx-12 sm:mx-52 md:mx-[30%]
              lg:mx-[30%]' type='password' name='password' value={password} 
              onChange={(e)=> setPassword(e.target.value)}/>
              <div className='password error'></div>

              <label htmlFor='name' className='mt-2 text-center text-black font-serif'>Confirmer votre mot de passe</label>
              <input className='border-2 border-black mx-12 sm:mx-52 md:mx-[30%]
              lg:mx-[30%]' type='password' name='password-conf' value={passwordControl} 
              onChange={(e)=> setPasswordControl(e.target.value)}/>

              <label className='mx-8 mt-2 md:mx-12 text-center text-black font-serif' htmlFor='terms'>
                J'accepte les <a className='underline text-black font-serif' href='/'>Conditions générales</a>
              </label>
              <input type="checkbox" name='terms' id='terms' />
              <div className='terms error'></div>

              <input type="submit" className=' rounded-sm bg-slate-200 border-2 border-black my-4 mx-[25%] 
              xs:mx-[40%] sm:mx-[42%] md:mx-[40%] lg:mx-[43%] xl:mx-[43%]
              2xl:mx-[43%] text-black font-serif' 
              value="inscription"/>

          </form>
        )}
      </>
    </div>
  )
}

