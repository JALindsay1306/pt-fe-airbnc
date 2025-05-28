import { Navigate, useParams } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";
import ImageGallery from "./ImageGallery";
import Stars from "../propertyFeed/Stars";
import { useNavigate } from "react-router-dom";
import PostReview from "../PostReview";
import CreateBooking from "./CreateBooking";


export default function Profile () {
    const { id } = useParams();
    const [user, setUser] = useState(null);

    useEffect(() => {
      async function fetchUser() {
        try {
          const response = await axios.get(
            `https://jl-air-bnc.onrender.com/api/users/${id}`
          );
          setUser(response.data.user);
          setLoading(false);
        } catch (error) {
          console.error("Error fetching user:", error);
          setLoading(false);
        }
      }
        fetchUser();
    }, [id]);

     
   
    return (
      <div>
        <h1>{{property.property_name}}</h1>
        <ImageGallery images={property.images}/>
        <p>{property.description}</p>
        <div><h5>£{property.price_per_night}</h5></div>
        <button onClick={handleToggleFavourite}>Favourite</button>
        <button onClick={handleBookClick}>Book</button>
        <div className="stars-container" onClick={() => handleRatingChange()}>
        {reviews.average_rating !== 0 && (
          <Stars
            rating={reviews.average_rating}
            editable={true}
            onRatingChange={setTempRating}
            propertyPage={true}
          />
        )}
      </div>        <button 
          onClick={handleReviewsClick}>
          Read {reviews.reviews.length} {reviews.reviews.length===1?"review":"reviews"}
        </button>
      </div>
    );
  }