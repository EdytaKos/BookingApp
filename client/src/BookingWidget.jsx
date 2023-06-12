import { useContext, useEffect, useState } from "react";
import {differenceInCalendarDays} from "date-fns";
import axios from "axios";
import {Navigate} from "react-router-dom";
import { UserContext } from "./UserContext";

export default function BookingWidget({place}) {
    const [checkIn, setCheckIn] = useState('');
    const [checkOut, setCheckOut] = useState('');
    const [numberOfGuests, setNumberOfGuests] = useState(1);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [redirect,setRedirect] = useState('');
    const {user} = useContext(UserContext);

    useEffect(() => {
        if (user) {
            setName(user.name);
            setEmail(user.email);
        }
    }, [user]);

    let numberOfNights = 0;
    if (checkIn && checkOut) {
        numberOfNights = differenceInCalendarDays(new Date (checkOut), new Date (checkIn));
    }
    
    async function bookThisPlace() {
        const response = await axios.post('/bookings' ,{
            checkIn, checkOut, numberOfGuests, name, email,
            place:place._id,
            price:numberOfNights * place.price,
        }); 
        const bookingId = response.data._id;
        setRedirect(`/account/bookings/${bookingId}`);
    }

    if (redirect) {
        return <Navigate to={redirect} />
    }

    return(
        <div className="bg-white p-4 rounded-2xl shadow ">
        <div className="text-2xl text-center">
            Cena: {place.price} zł / za noc
        </div>
        <div className="border rounded-2xl my-4 mt-4">
        <div className="flex">
            <div className="py-3 px-4">
                <label>Data zameldowania </label>
                <input type="date" 
                        value={checkIn} 
                        onChange={ev => setCheckIn(ev.target.value)}/>   
            </div>
            <div className="py-3 px-4 border-l">
                <label>Data wymeldowania </label>
                <input type="date" 
                        value={checkOut} 
                        onChange={ev => setCheckOut(ev.target.value)}/>   
            </div>
            </div> 
                <div className="py-3 px-4 border-t">
                    <label>Liczba gości</label>
                    <input type="number" 
                            value={numberOfGuests} 
                            onChange={ev => setNumberOfGuests(ev.target.value)}/>
                </div>  
                {numberOfNights > 0 && (
                    <div className="py-3 px-4 border-t">
                    <label>Inię i Nazwisko</label>
                    <input type="text" 
                            value={name} 
                            onChange={ev => setName(ev.target.value)}/>

                    <label>Adres e-mail</label>
                    <input type="text" 
                            value={email} 
                            onChange={ev => setEmail(ev.target.value)}/>
                    </div> 
              )}
        </div>
        {numberOfNights > 0 && (
            <div className="text-center">
                <h2 className="font-semibold">Łączna kwota: {numberOfNights * place.price} zł</h2>
            </div>
        )}
        <button onClick={bookThisPlace} className="primary mt-4">
            Zarezerwuj miejsce
        </button>
    </div>
    );
}