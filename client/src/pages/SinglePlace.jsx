import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

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
            <div className="absolute inset-0 bg-black text-white min-h-screen">
                <div className="p-8 grid gap-4 bg-black">
                    <div>
                    <h2 className="text-3xl">{place.title}</h2>    
                    <button onClick={() => setShowAllPhotos(false)} className="fixed right-12 top-6 flex gap-2 py-2 px-4 rounded-2xl shadow shadow-black-100 bg-white text-black">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                                <path fillRule="evenodd" d="M5.47 5.47a.75.75 0 011.06 0L12 10.94l5.47-5.47a.75.75 0 111.06 1.06L13.06 12l5.47 5.47a.75.75 0 11-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 01-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 010-1.06z" clipRule="evenodd" />
                            </svg>
                            Zamknij
                        </button>
                    </div>
                    {place.photos?.length > 0 && place.photos.map(photos => (
                        <div>
                            <img src={'http://localhost:4000/uploads/'+photos} alt=""/>
                        </div>
                    ))}
                </div>
            </div>
        )
    }

    return (
        <div className="mt-4 bg-gray-100 -mx-8 px-8 pt-8">
        <div className="mx-12">
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
                                <img className="aspect-square object-cover" src={'http://localhost:4000/uploads/'+place.photos[0]} alt=""/>
                            </div>
                        )}
                    </div>
                    <div className="gap-2">
                        {place.photos?.[1] && (
                            <img className="aspect-square object-cover" src={'http://localhost:4000/uploads/'+place.photos[1]} alt=""/>
                        )}
                        <div className="overflow-hidden">
                            {place.photos?.[2] && (
                                <img className="aspect-square object-cover relative top-2" src={'http://localhost:4000/uploads/'+place.photos[2]} alt=""/>
                            )}
                        </div>
                        <button onClick={() => setShowAllPhotos(true)} className="absolute bottom-2 right-3 py-2 px-4 bg-white rounded-2xl shadow shadow-md shadow-gray-500">
                            Więcej zdjęć
                        </button>
                    </div>
                </div>
            <div className="my-5">
                <h2 className="font-semibold text-2xl">Opis</h2>
                {place.description}
            </div>
            <div className="grid grid-cols-2">
                <div>
                    Godzina zameldownia: {place.checkIn} <br/>
                    Godzina wymeldowania: {place.checkOut} <br/>
                    Maksymalna liczba gości: {place.maxGuests}
                </div>
                <div>
                    <div className="bg-white p-4 rounded-2xl shadow ">
                        <div className="text-2xl text-center">
                            Cena: {place.price} zł / za noc
                        </div>
                        <div className="my-4 border py-4 px-4 rounded-2xl">
                           <label>Zamelduj się</label>
                           <input type="date"/>   
                        </div>
                        <div className="my-2 border py-4 px-4 rounded-2xl">
                           <label>Wymelduj sie</label>
                           <input type="date"/>   
                        </div>
                        <button className="primary mt-4">Zarezerwuj miejsce</button>
                    </div>
                </div>
            </div>
            </div>
        </div>
        </div>
    );
}