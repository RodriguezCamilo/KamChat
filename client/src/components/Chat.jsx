import { Logout } from "./Logout.jsx"
import { MsgWrapper } from './MsgWrapper.jsx'
import { Listbox, ListboxItem } from "@nextui-org/react";
import { Input, Button,  Card, CardBody, CardHeader, CardFooter, Divider } from "@nextui-org/react";
import { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import { socket } from "../socket.js";
import { getCookiesByName } from "../utils/cookieUtils.js";

export const Chat = ({user}) => {
    const [msg, setMsg] = useState('')
    const [messages, setMessages] = useState([])
    const token = getCookiesByName('jwtCookie')
    const navigate = useNavigate()
    

    const handleSubmit = async (e) => {
        e.preventDefault()
        let data = {message: msg, email: user}
        socket.emit('new msg', data)
        setMsg('')
    }

    useEffect(()=>{
        if (token == null) navigate('/login')
    }, [])

    useEffect(()=>{
        socket.on('broad msg', msg =>{
            setMessages([...messages, msg])
        })
    }, [])

    return (
        <Card className='py-3 self-center border-2 border-amber-400 w-[70vw] max-h-[90] '>
            <CardHeader className="flex justify-center"><h1 className="text-2xl font-bold">KamChat</h1></CardHeader>
            <Divider />
            <CardBody className='flex justify-center'>
                <MsgWrapper>
                    <Listbox>
                        {
                            messages.map((msg, i) =>(
                                <ListboxItem key={i}>{msg}</ListboxItem>
                            ))
                        }
                    </Listbox>
                </MsgWrapper>
                <form id="login" onSubmit={handleSubmit} className="grid gap-3">
                    <Input color="warning" type="text" variant="underlined" isRequired name="firstName" value={msg} onChange={(e)=> setMsg(e.target.value)} placeholder='Mensaje...' />
                    <Button className='place-self-center' color='warning' variant='ghost' type="submit"  > Enviar </Button>
                </form>
            </CardBody>
            <Logout />
        </Card>
    )
}