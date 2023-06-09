export default function BookingWidget({place}) {
    return(
        <div className="bg-white p-4 rounded-2xl shadow ">
        <div className="text-2xl text-center">
            Cena: {place.price} zł / za noc
        </div>
        <div className="border rounded-2xl my-4">
        <div className="flex">
            <div className="py-3 px-4">
                <label>Data zameldowania </label>
                <input type="date"/>   
            </div>
            <div className="py-3 px-4 border-l">
                <label>Data wymeldowania </label>
                <input type="date"/>   
            </div>
        </div> 
        <div className="py-3 px-4 border-t">
            <label>Liczba gości: </label>
            <input type="number" value={1}/>   
        </div>
        </div>
        <button className="primary mt-4">Zarezerwuj miejsce</button>
    </div>
    );
}