import React, { useEffect } from 'react'
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../utils/firebase';
import { useDispatch } from 'react-redux';
import { addUser, removeUser } from '../utils/userSlice';



import { signOut } from 'firebase/auth'
import { useNavigate } from 'react-router-dom'
import {useSelector} from "react-redux"
import { LOGO } from '../utils/constants';

const Header = () => {
  const user = useSelector(store =>store.user)
  const navigate = useNavigate()
  const dispatch = useDispatch()

  
  
  const handleSignOut=()=>{
    signOut(auth).then(()=>{
      
    })
    .catch((error)=>{
      
    })
    }


    useEffect(()=>{

    const unsubscribe=  onAuthStateChanged(auth,(user)=>{
        if(user){
          
          const {uid,email,displayName,photoURL} = user;
          dispatch(
            addUser({
              uid:uid,
              email:email,
              displayName:displayName,
              photoURL:photoURL
            })
          );
  
          navigate("/browse")
          
  
  
        }else {
  
          //User is signed out
          dispatch(removeUser())
          navigate("/")
          
        }
      })
      // Unsubscribe when component unmounts
      return ()=>unsubscribe();
    },[])
   
  
  return (
  <div className='absolute px-8 py-2 bg-gradient-to-b from-black  z-10 w-full flex justify-between '>
    <img
      className='w-44'
      src={LOGO}
      alt='logo'
    />
   { (user && <div className='flex p-2'>
      <img
      className='w-12 h-12'
      alt='usericon'
      src={user?.photoURL}
      />
      <button 
      className='font-bold text-white' 
      onClick={handleSignOut}
      >(Sign Out)</button>
    </div>)}
  </div>
  )
}

export default Header