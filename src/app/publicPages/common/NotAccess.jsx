import React from 'react'
import {useNavigate } from 'react-router-dom'
import forbidden from '../../../assets/images/forbidden.png'

const NotAccess = () => {
  const navigate = useNavigate();
	const goBack = () => {
		navigate("/");
	}
  return (
    <>
      <div className='text-center p-5'>
        <div>
          <img width="500px" src={forbidden} alt="" />
      </div >
      <div onClick={()=>goBack()} className="btn btn-primary btn-sm">&larr; Go Back</div>
  </div>
    </>
  )
}

export default NotAccess