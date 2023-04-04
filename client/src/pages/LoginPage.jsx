import { Link } from "react-router-dom";

export default function LoginPage(){
    return (
        <div className="mt-4 grow flex items-center justify-around" >
            <div className="mb-64">
            <h1 className="text-4xl text-center">Logowanie</h1>
            <form className="max-w-md mx-auto">
                <input type="email" placeholder='moj@email.com' />
                <input type="password" placeholder="Hasło"/>
                <button className="primary">Zaloguj</button>
                <div className="text-center py-2 text-gray-500"> Nie masz jeszcze konta?    
                    <Link className="underline" to={'/register'}> Załóż je tutaj!</Link> 
                </div>
            </form>
            </div>
         
        </div>
    )
}