import axios from "axios";
import { useEffect, useState } from "react"

export default function BookingsPage () {
    const [bookings, setBookings] = useState([]);
    useEffect(() => {
        axios.get('/bookings').then(response => {
            setBookings(response.data);
        });
    }, []);

    return (
        <div className="grid grid-cols-[1fr_3fr_1fr]">
           <div></div>
           <div>
                {bookings?.length > 0 && bookings.map(booking =>(
                    <div>
                        {booking.checkIn} - {booking.checkOut}
                    </div>
                ))}
           </div>
           <div></div>
        </div>
    );
}