import React, { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Spinner, Input, Chip, Card, CardBody, CardHeader, CardFooter, Divider } from "@nextui-org/react";

export const Register = () => {

    const formRef = useRef(null)
    const navigate = useNavigate()

    const [loginError, setLoginError] = useState()
    const [progress, setProgress] = useState(false)

    const handleSubmit = async (e) => {
        e.preventDefault();
        const dataForm = new FormData(formRef.current)
        const data = Object.fromEntries(dataForm)
        try {
            setProgress(true)
            await fetch('http://localhost:8080/api/sessions/register', {
                method: 'POST',
                headers: {
                    'Content-type': 'application/json'
                },
                body: JSON.stringify(data)
            })
                .then(response => {
                    if (response.ok) {
                        navigate('/login')
                        setProgress(false)
                    } else {
                        setLoginError("Usuario ya registrado y/o faltan datos")
                        setProgress(false)
                    }
                })
        } catch (error) {
            console.log(error)
        }

    };

    return (
        <Card className=' py-3 self-center border-2 border-amber-400 min-w-[30vw] max-h-[90vh] '>
            <CardHeader className='flex justify-center'>
                <h1 className='text-2xl font-bold'>Registrarse</h1>
            </CardHeader>
            <CardBody className='flex justify-center overflow-hidden'>
                <form className='grid gap-3' id="register" onSubmit={handleSubmit} ref={formRef}>

                    <Input type="text" variant="underlined" isRequired name="firstName" label="Nombre" placeholder='Andrea' />

                    <Input type="text" variant="underlined" isRequired name="lastName" label="Apellido" placeholder='Rodriguez' />

                    <Input type="email" variant="underlined" isRequired name="email" label="Email" placeholder='andrea@mail.com' />

                    <Input type="password" variant="underlined" isRequired name="password" label="Password" />

                    {progress ? <Spinner color='warning' className='place-self-center' /> : <Button className='place-self-center' color='warning' variant='ghost' type="submit"  > Registrarme </Button>}

                    {loginError && <Chip className='place-self-center' variant='bordered' color='danger'>{loginError}</Chip>}
                </form>
            </CardBody>
            <Divider />
            <CardFooter className='grid gap-3'>
                <h3>Ya tienes una cuenta?</h3>
                <Button className='place-self-center' color='primary' variant='ghost' onClick={() => navigate('/login')}>Iniciar sesión</Button>
            </CardFooter>
        </Card>
    );
}