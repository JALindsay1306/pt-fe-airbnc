import Stars from "./propertyFeed/Stars";
import { useUser } from "./UserContext";
import axios from "axios";

export default function Review ({review,setDeletedReview}) {
    const { user, setUser } = useUser();
    
    const userOwnsReview = user.fullName==review.guest;

    const handleDelete = async () => {
        if (!window.confirm("Are you sure you want to delete this review?")) return;

        try {
            await axios.delete(`https://jl-air-bnc.onrender.com/api/reviews/${review.review_id}`);
            alert("Review deleted successfully!");
            setDeletedReview(true);
        } catch (error) {
            console.error("Error deleting review:", error.response?.data || error.message);
            alert("Failed to delete review.");
        }
    };

    return (
            <div 
                className="review"
                >
                <div><p>{review.comment}</p></div>
                {userOwnsReview && (
                    <button className="delete-button" onClick={handleDelete}>
                        ❌
                    </button>
                )}
                <div className="user-mini-profile">
                    <img src={review.guest_avatar}/>
                    <p>{review.guest}</p>
                </div>
                <Stars rating={review.rating}/>
            </div>
        )
};