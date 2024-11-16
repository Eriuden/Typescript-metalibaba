import { useState, useContext, useEffect } from "react";
import {useSelector} from "react-redux"
import {Link} from "react-router-dom"
import {UidContext} from "./AppContext"
import { Squash as Hamburger } from "hamburger-react";
import {Logout} from "./Logout"
import { Connexion } from "./Connexion";
import { Inscription } from "./Inscription";
import ReactModal from "react-modal"

export const Header = () => {
  const [hamburger, setHamburger] = useState(false)
  const [connexionModal, setConnexionModal] = useState(false)
  const [inscriptionModal, setInscriptionModal] = useState(false)
  const [uidMessage, setUidMessage] = useState("")
  const [cartNumber, setCartNumber] = useState(0)
  
  const uid = useContext(UidContext)

  const userData = useSelector((state: any)=> state.userReducer)
  const cartData = useSelector((state: any)=> state.cartReducer)

  const switchConnexion = () => {
    setConnexionModal(!connexionModal) 
    setInscriptionModal(false)
  }

  const switchInscription = () => {
    setInscriptionModal(!inscriptionModal) 
    setConnexionModal(false)
  }

  useEffect(()=> {
    if (uid) {
      setUidMessage(`Bienvenue ${userData.name}`)
      setCartNumber(`${cartData.cart.length}`)
    }
  },[uid, userData, cartData])

  return (
    <div className='bg-gradient-to-r from-slate-950 via-slate-900 to-slate-950 bg-cover'>
      <h1 className='text-gray-400 font-serif text-center'>
        Metalibaba 
      </h1>

      <nav className='hidden sticky flex-row justify-around mt-2 sm:flex'>
        <Link to={"/"} className ="text-gray-100 font-serif text-xl">Accueil</Link>

        {uid ? (
          <>
            <Link className ="text-gray-100 font-serif text-xl" to={"/user-profile/:id"}>
              <h5>{uidMessage}</h5>
            </Link>

            <Logout/>

            <div>
                <span className='spanCart'>{cartNumber}</span>
                <Link className ="text-gray-100 font-serif text-xl" to={"/cart"}/>
            </div>
          </>
        ) :(
          <>
            <span className ="text-gray-100 font-serif text-xl cursor-pointer" onClick={switchConnexion}>
              Connexion
            </span>

            <span className ="text-gray-100 font-serif text-xl cursor-pointer " onClick={switchInscription}>
              Inscription
            </span>

            {connexionModal ? (
              <ReactModal ariaHideApp={false} className="max-w-[100%] p-2"
              shouldCloseOnOverlayClick={true}
              shouldCloseOnEsc={true} isOpen={connexionModal ? true : false}>
                <span className='bg-slate-50 py-2 px-4 mx-[83%] md:mx-[74%] lg:mx-[57%] xl:mx-[65%] 2xl:mx-[75%]
                mt-[20%] rounded-md cursor-pointer'
                onClick={switchConnexion}>
                  X
                </span>
                <Connexion/>
              </ReactModal>
            ) : ""}

            {inscriptionModal ? (
              <ReactModal ariaHideApp={false} className= "max-w-[100%] p-2"
              shouldCloseOnOverlayClick={true}
              shouldCloseOnEsc={true} isOpen={inscriptionModal ? true : false}>
                <span className='bg-slate-50 py-2 px-4 mx-[75%] mt-[20%] rounded-md cursor-pointer'
                onClick={switchInscription}>
                  X
                </span>
                <Inscription/>
              </ReactModal>
            ) : ""}
          </>      
        )}
      </nav>

      <h2 className='flex m-3 sm:hidden sticky text-white' onClick={()=> setHamburger(!hamburger)}>
        <Hamburger/>
      </h2>

      {hamburger ? (
        <nav className='flex flex-col items-start justify-start
        ml-2 py-2  absolute border-2 border-black opacity-100 border-l-4 border-b-4
        sm:hidden rounded-s max-w-[50%] min-w-[25%]
        bg-gradient-to-r from-slate-200 via-slate-300 to-slate-400'>
          <Link className='w-[100%] text-center m-auto text-black' to={"/"}>Acceuil</Link>

          {uid ? (
            <>
              <Link className='w-[100%] text-center m-auto text-black' to={"/user-profile/:id"}>
                <h5>{uidMessage}</h5>
              </Link>

              <Logout/>

              <div className='w-[100%] text-center m-auto text-black'>
                <span >{cartNumber}</span>
                <Link to={"/cart"}/>
              </div>
              
            </>
          ) : (
            <>
              <span className='w-[100%] text-center m-auto text-black' 
                onClick={switchConnexion} >Connexion</span>
              <span className='w-[100%] text-center m-auto text-black' 
                onClick={switchInscription}>Inscription</span>
            </>
          )}
        </nav>
      ): ""}
    </div>
  )
}

