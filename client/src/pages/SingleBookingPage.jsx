import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom"
import AddressLink from "../AddressLink";
import PlaceGallery from "../PlaceGallery";
import BookingDates from "../BookingDates";

export default function SingleBookingPage () {
    const {id} = useParams();
    const [booking, setBooking] = useState(null);

    useEffect(() => {
        if(id) {
            axios.get('/bookings').then(response => {
                const foundBooking = response.data.find(({_id}) => _id === id);
                if (foundBooking) {
                    setBooking(foundBooking);
                }
            });
        }
    }, [id]);

    if (!booking) {
        return '';
    }
    
    return (
        <div className="grid grid-cols-[1fr_3fr_1fr]">
        <div></div>
        <div className="my-8">
            <h1 className="text-3xl">{booking.place.title}</h1>
            <AddressLink>{booking.place.address}</AddressLink>
            <div className="bg-gray-200 p-6 mb-6 rounded-2xl flex justify-between">
                <div>
                    <h2 className="text-xl mb-4">Informacje o rezerwacji</h2>
                    <BookingDates booking={booking}/>
                </div>
                <div className="bg-primary p-6 text-white rounded-2xl">
                    <div>Łączna kwota</div>
                    <div className="text-2xl">{booking.price} zł</div>
                </div>
            </div>
            <PlaceGallery place={booking.place}/>
        </div>
        <div></div>
        </div>
    )
}