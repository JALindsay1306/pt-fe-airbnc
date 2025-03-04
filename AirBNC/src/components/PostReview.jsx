import { useParams } from "react-router-dom";
import Stars from "./propertyFeed/Stars";
import { useUser } from "./UserContext"
import { useEffect, useState, useRef} from "react";
import axios from "axios";
import { useLocation } from "react-router-dom"; 


export default function PostReview () {
    const { id } = useParams();
    const { user, setUser } = useUser();
    const [rating, setRating] = useState(null);
    const [comment, setComment] = useState("");
    const [loading, setLoading] = useState(true);
    const [propertyName,setPropertyName] = useState("a property");

    const location = useLocation();
    const { newRating } = location.state || {};

    const commentRef = useRef(comment);
    const typingTimeoutRef = useRef(null);

    useEffect(() => {
      if (!id || !user) return;
  
      const checkForReview = async () => {
        try {
          const userResponse = await axios.get(
            `https://jl-air-bnc.onrender.com/api/users/${user.userID}`
          );
          const userName = `${userResponse.data.user.first_name} ${userResponse.data.user.surname}`;
          const reviewsResponse = await axios.get(
            `https://jl-air-bnc.onrender.com/api/properties/${id}/reviews`
          );
          const reviews = reviewsResponse.data.reviews;
          const propertyCheck = await axios.get(`https://jl-air-bnc.onrender.com/api/properties/${id}`);
          setPropertyName(propertyCheck.data.property.property_name)
          const userReview = reviews.find((review) => review.guest === userName);
          if (userReview) {
            setRating(newRating?newRating:userReview.rating);
            setComment(userReview.comment || "");
          } else if (newRating) {
            setRating(newRating);
          }
          setLoading(false);
        } catch (error) {
          console.error("Error fetching review data:", error);
          setLoading(false);
        }
      };
  
      checkForReview();
    }, []);
  
    const handleCommentChange = (event) => {
      const newComment = event.target.value;
      commentRef.current = newComment;
  
      if (typingTimeoutRef.current) {
        clearTimeout(typingTimeoutRef.current);
      }

      typingTimeoutRef.current = setTimeout(() => {
        setComment(commentRef.current);
      }, 300);
    };

    const postNewReview = async (e) => {
      e.preventDefault();
      if (!comment|| rating === null) {
        alert("Please ensure you have provided a star rating and comment.");
        return;
      }
  
      try {
        const newReview = { guest_id: user.userID, rating, comment };
        await axios.post(
          `https://jl-air-bnc.onrender.com/api/properties/${id}/reviews`,
          newReview,
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        alert("Review submitted successfully!");
      } catch (error) {
        console.error("Error submitting review:", error.response?.data || error.message);
        alert(`Failed to submit review: ${JSON.stringify(error.response?.data, null, 2)}`);
      }
    };
  
    return (
      <div className="post-review">
        <h1>Leave a review for {loading?propertyName:propertyName}</h1>
        {loading ? ( 
          <div>Loading...</div>
        ) : (
          <Stars rating={rating} editable={true} onRatingChange={setRating} />
        )}
        <form>
          <textarea
            className={`review-input ${comment ? 'has-comment' : 'placeholder'}`}
            onChange={handleCommentChange}
            placeholder={comment?comment:"Write your review here"}
          />
          <button type="submit" onClick={(e) => postNewReview(e)}>
            Submit Review
            </button>
        </form>
      </div>
    );
  }