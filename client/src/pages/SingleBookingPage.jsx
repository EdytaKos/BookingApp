import { useParams } from "react-router-dom"

export default function SingleBookingPage () {
    const {id} = useParams();
    
    return (
        <div>
            pojedyńcza rezerwacja: {id}
        </div>
    )
}