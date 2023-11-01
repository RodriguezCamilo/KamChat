import React from 'react'
import { useNavigate } from 'react-router-dom'
import {Button} from "@nextui-org/react";


export  const Logout = () => {
    const navigate = useNavigate()
    const handleClick = async (e) => {
        try {
            await fetch('http://localhost:8080/api/sessions/logout', {
                method: 'GET',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',
                }
            })
            .then(response =>{
                if (response.ok){
                    navigate('/login')
                }
            })
            .catch(error=>{
                throw(error)
            })
    
        } catch (error) {
            console.error(error);
        }
    }
    
  return (
    <Button color='danger' variant='ghost' onClick={handleClick}>Cerrar Sesion</Button>
  )
}