import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import BookingWidget from "../BookingWidget";

export default function SinglePlace() {
    const {id} = useParams();
    const [place, setPlace] = useState(null);
    const [showAllPhotos, setShowAllPhotos] = useState(false);
    useEffect(() => {
        if(!id){
            return;
        }
        axios.get(`/places/${id}`).then(response => {
            setPlace(response.data);
          });
    }, [id]);

    if (!place) return '';
    
    if(showAllPhotos) {
        return(
            <div className="absolute inset-0 bg-black text-white min-h-screen grid grid-cols-[1fr_4fr_1fr]">
            <div className="bg-black"></div>    
            <div className="p-8 grid gap-4 bg-black">
                    <div>
                        <h2 className="text-3xl mr-36">{place.title}</h2>    
                        <button onClick={() => setShowAllPhotos(false)} className="fixed right-12 top-6 flex gap-2 py-2 px-4 rounded-2xl shadow shadow-black-100 bg-white text-black">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                                <path fillRule="evenodd" d="M5.47 5.47a.75.75 0 011.06 0L12 10.94l5.47-5.47a.75.75 0 111.06 1.06L13.06 12l5.47 5.47a.75.75 0 11-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 01-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 010-1.06z" clipRule="evenodd" />
                            </svg>
                            Zamknij
                        </button>
                    </div>
                    {place.photos?.length > 0 && place.photos.map(photos => (
                        <div className="flex items-center justify-around mt-2">
                            <img src={'http://localhost:4000/uploads/'+photos} alt=""/>
                        </div>
                    ))}
                </div>
                <div className="bg-black"></div>
            </div>
        )
    }

    return (
        <div className="mt-4 bg-gray-100 -mx-8 px-8 pt-8 grid grid-cols-[1fr_3fr_1fr]">
        <div></div>
        <div>
            <h1 className="text-3xl">{place.title}</h1>
            <a className="flex gap-1 my-2 block font-semibold underline" target="_blank" href={'https://maps.google.com/?q='+place.address}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
                </svg>
                {place.address}
            </a>
            <div className="relative">
                <div className="grid gap-2 grid-cols-[2fr_1fr] rounded-3xl overflow-hidden">
                    <div>
                        {place.photos?.[0] && (
                            <div>
                                <img onClick={() => setShowAllPhotos(true)} className="aspect-square cursor-pointer object-cover" src={'http://localhost:4000/uploads/'+place.photos[0]} alt=""/>
                            </div>
                        )}
                    </div>
                    <div className="gap-2">
                        {place.photos?.[1] && (
                            <img onClick={() => setShowAllPhotos(true)} className="aspect-square cursor-pointer object-cover" src={'http://localhost:4000/uploads/'+place.photos[1]} alt=""/>
                        )}
                        <div className="overflow-hidden">
                            {place.photos?.[2] && (
                                <img onClick={() => setShowAllPhotos(true)} className="aspect-square cursor-pointer object-cover relative top-2" src={'http://localhost:4000/uploads/'+place.photos[2]} alt=""/>
                            )}
                        </div>
                        <button onClick={() => setShowAllPhotos(true)} className="relative bottom-12 right-0 py-2 px-4 bg-white rounded-2xl shadow shadow-md shadow-gray-500">
                            Więcej zdjęć
                        </button>
                    </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-[2fr_1fr] mt-4 mb-8 gap-8">
                    <div>
                        <div className="my-5">
                            <h2 className="font-semibold text-2xl">Opis</h2>
                            {place.description}
                        </div>
                        Godzina zameldownia: {place.checkIn}:00 <br/>
                        Godzina wymeldowania: {place.checkOut}:00 <br/>
                        Maksymalna liczba gości: {place.maxGuests}
                    </div>
                    <div>
                        <BookingWidget place={place}/>
                    </div>
                </div>
                <div className="mt-2 bg-white -mx-8 px-8 pt-8 border">
                    <div className="mt-1">
                        <h1 className="font-semibold text-2xl">Dodatkowe informacje</h1>
                    </div>
                    <div className="mb-4 mt-1 text-sm text-gray-700 leading-5">{place.extraInfo}</div>
                </div>
            </div>
            </div>
            <div></div>
        </div>
    );
}