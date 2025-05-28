import { useParams } from "react-router-dom";
import BookingCalendar from "./BookingCalendar";

export default function CreateBooking() {
    const {id} = useParams();
    return(
        <div>
            <BookingCalendar property={id}/>
        </div>
    )
}