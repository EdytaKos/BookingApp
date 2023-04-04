import { Link } from "react-router-dom";
import { useState } from "react";
import axios from 'axios';

export default function RegisterPage(){
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    function registerUser(){
        axios.post('/register',{
            name,
            email,
            password
        });
    }


    return (
        <div className="mt-4 grow flex items-center justify-around" >
            <div className="mb-64">
            <h1 className="text-4xl text-center">Rejestracja</h1>
            <form className="max-w-md mx-auto" onSubmit={registerUser}>
                <input type="text" placeholder="Jan Kowalski" 
                value={name} 
                onChange={ev =>setName(ev.target.value)}/>
                <input type="email" placeholder='moj@email.com'
                value={email} 
                onChange={ev =>setEmail(ev.target.value)} />
                <input type="password" placeholder="Hasło"
                value={password} 
                onChange={ev =>setPassword(ev.target.value)}/>
                <button className="primary">OK</button>
                <div className="text-center py-2 text-gray-500"> Masz już konto?    
                    <Link className="underline" to={'/login'}> Zaloguj się!</Link> 
                </div>
            </form>
            </div>
         
        </div>
    )
}