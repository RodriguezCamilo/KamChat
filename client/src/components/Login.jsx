import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {Button, Spinner, Input, Chip, Card, CardBody, CardHeader, CardFooter, Divider } from "@nextui-org/react";

export const Login = ({setUser}) => {

    const formRef = useRef(null)
    const navigate = useNavigate()
    const [loginError, setLoginError] = useState()
    const [progress, setProgress] = useState(false)

    const handleSubmit = async (e) => {
        e.preventDefault()
        const dataForm = new FormData(formRef.current)
        const data = Object.fromEntries(dataForm)
        try {
            setProgress(true)
            await fetch('http://localhost:8080/api/sessions/login', {
                method: 'POST',
                headers: {
                    'Content-type': 'application/json'
                },
                body: JSON.stringify(data)
            })
                .then(async response => {
                    if (response.ok) {
                        const res = await response.json()
                        document.cookie = `jwtCookie=${res.token}; expires${new Date(Date.now() + 1 * 24 * 60 * 60 * 1000).toUTCString()};path=/`
                        let user = res.user
                        console.log(user)
                        setUser(user)
                        navigate('/chat')
                        setProgress(false)
                    } else {
                        setLoginError("Email o contraseña invalidos")
                        setProgress(false)
                    }
                })
        } catch (error) {
            console.log(error)
        }

    }
    
    return (
        <Card className=' py-3 self-center border-2 border-amber-400 min-w-[30vw] max-h-[70vh] '>
            <CardHeader className='flex justify-center'>
                <h1 className='text-2xl font-bold'>Inicia sesión</h1>
            </CardHeader>
            <CardBody className='flex justify-center overflow-hidden'>
                
                <form className='grid gap-3' id="login" onSubmit={handleSubmit} ref={formRef}>

                    <Input type="email" variant="underlined" isRequired name="email" label="Email" />

                    <Input type="password" variant="underlined" isRequired name="password" label="Password" />

                    {loginError && <Chip className='place-self-center' variant='bordered' color='danger'>{loginError}</Chip>}

                    {progress ? <Spinner color='warning' className='place-self-center' /> : <Button className='place-self-center' color='warning' variant='ghost' type="submit"  > Iniciar Sesion </Button>}

                </form>
            </CardBody>
            <Divider/>
            <CardFooter className='grid gap-3'>
                <h3>No tienes una cuenta?</h3>
                <Button className='place-self-center' color='primary' variant='ghost' onClick={() => navigate('/register')}>Registrate</Button>
            </CardFooter>

        </Card>
    );
}