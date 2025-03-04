import { Navigate, useParams } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";
import ImageGallery from "./ImageGallery";
import Stars from "../propertyFeed/Stars";
import { useNavigate } from "react-router-dom";
import PostReview from "../PostReview";


export default function Property () {
    const { id } = useParams();
    const [property, setProperty] = useState(null);
    const [loading, setLoading] = useState(true);
    const [reviews, setReviews] = useState({ reviews: [], average_rating: 0 });
    const [tempRating,setTempRating] = useState(0);
    const [newRating,setNewRating] = useState(0);
    const navigate = useNavigate();

     
    useEffect(() => {
      async function fetchProperty() {
        try {
          const response = await axios.get(
            `https://jl-air-bnc.onrender.com/api/properties/${id}`
          );
          setProperty(response.data.property);
          setLoading(false);
        } catch (error) {
          console.error("Error fetching property:", error);
          setLoading(false);
        }
      }
        fetchProperty();
    }, [id]);


    useEffect(()=>{
      async function getReviews (id) {
          try{
              const response = await axios.get(`https://jl-air-bnc.onrender.com/api/properties/${id}/reviews`);
              setReviews(response.data)
          } catch (error) {
              console.error("Error fetching reviews:", error);
            }
      }
      getReviews(id)
    },[])

    const handleReviewsClick = () => {
      navigate(`/property/${id}/reviews`);
    };

    useEffect(()=>{
      setNewRating(tempRating);
      console.log(tempRating,newRating);
    },[tempRating]);

    const handleRatingChange = () => {
      console.log("Navigating with rating:", newRating);
      navigate(`/property/${id}/post-review`, { state: { newRating } });
    };
  
    if (loading) {
      return <div><h4>Property Loading...</h4></div>;
    }
  
    if (!property) {
      return <div>Property not found.</div>;
    }
  
    return (
      <div>
        <h1>{property.property_name}</h1>
        <ImageGallery images={property.images}/>
        <p>{property.description}</p>
        <div><h5>£{property.price_per_night}</h5></div>
        <button>Favourite</button>
        <button>Book</button>
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