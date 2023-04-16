import { useContext } from "react"
import { UserContext } from "../UserContext"
import { Link, Navigate, useParams } from "react-router-dom"

export default function AccountPage(){
    const {ready, user} = useContext(UserContext) 
  //  const [redirect, setRedirect] = useState(UserContext);

    if(!ready){
        return 'Loading...'; //przy dłuższym wczytywaniu strony
    }

    if(ready && !user){
        return <Navigate to={'/login'}/>
    }
    
    let {subpage} = useParams();
   
    
   /*function linkClasses (type=null){
    let classes= "py-2 px-6";
    if(type === subpage ||(subpage === undefined && type==='profile')){
        classes+= "bg-primary text-white rounded-full" ;
    }
   }*/

   async function logout(){
     await axios.post('/logout');
    //setRedirect('/')
    
    
   }

    return(
        <div>
            <nav className="w-full flex justify-center mt-8 gap-2 mb-8">
                <Link className="py-2 px-6 bg-primary text-white rounded-full" to={'/account'}>Moje konto</Link>
                <Link className="py-2 px-6" to={'/account/bookings'}>Moje zamówienia</Link>
                <Link className="py-2 px-6" to={'/account/places'}>Moje miejsca</Link>
            </nav>
            <div className="text-center max-w-lg mx-auto">
                Zalogowano {user.name} ({user.email})
                <Link to={'/'}>
                <button onClick={logout} className="primary max-w-sm mt-2">Logout</button>
                </Link>
                
            </div>
        </div>
    );
}