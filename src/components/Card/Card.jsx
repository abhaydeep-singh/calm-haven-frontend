import React from 'react'
import { Button } from '../ui/button'
import { useNavigate } from 'react-router-dom';
function Card({props}) {
    const navigate = useNavigate();
  return (
    <>
      <div className='rounded-xl border w-[300px] lg:w-[250px] flex flex-col items-center gap-3 py-2 transition delay-50 duration-200 ease-in-out hover:bg-gray-900'>
        <img src={props.imgUrl} className='w-[100%] h-[200px]' alt="" />
        <p className='text-2xl lg:text-xl font-semibold'>{props.title}</p>
        <p className='text-sm lg:text-[13px] text-center'>{props.desc}</p>
        <Button onClick={()=>{navigate(props.nav)}}>{props.buttText}</Button>
      </div>
    </>
  )
}

export default Card
