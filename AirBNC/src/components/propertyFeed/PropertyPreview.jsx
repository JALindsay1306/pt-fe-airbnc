import { useEffect, useState } from "react";
import axios from "axios";
import Stars from "./Stars";
import { useNavigate } from "react-router-dom";
import { useUser } from "../UserContext";

export default function PropertyPreview ({property,reviewFilter,favouritesOnly}) {
    const [reviews,setReviews] = useState(0);
    const { user, setUser } = useUser();
    const [isFavourited, setIsFavourited] = useState(!!property.favourited);

    const navigate = useNavigate();
    useEffect(()=>{
        async function getReviews (propertyId) {
            try{
                const response = await axios.get(`https://jl-air-bnc.onrender.com/api/properties/${propertyId}/reviews`);
                setReviews(response.data.average_rating)
            } catch (error) {
                console.error("Error fetching items:", error);
              }
        }
        getReviews(property.property_id)
    },[isFavourited])

    const shouldHide = () => {
      if(favouritesOnly&&!property.favourited){
        return true;
      };
        if (reviewFilter === "All" || !reviewFilter) {
          return false;
        }
    
        switch (reviewFilter) {
          case "5*":
            return reviews < 5;
          case "4*+":
            return reviews < 4;
          case "3*+":
            return reviews < 3;
          case "2*+":
            return reviews < 2;
          default:
            return false;
        }
      }

      const handleButtonClick = () => {
        navigate(`/property/${property.property_id}`)
      };

      const handleToggleFavourite = async (e) => {
        console.log({guest_id:[user.userID]})
        e.stopPropagation();
        setIsFavourited((prev) => !prev);
        try {
          if(isFavourited){
          await axios.delete(`https://jl-air-bnc.onrender.com/api/favourites/${property.favourited}`)
        } else {
          await axios.post(`https://jl-air-bnc.onrender.com/api/properties/${property.property_id}/favourite`,{guest_id:user.userID})
        }
      } catch (error) {
        console.error("Error toggling favourite:", error);
        if (error.response && error.response.status === 404) {
          setIsFavourited(false);
        } else if (error.response && error.response.data.msg === 'You have already favourited this property') {
            setIsFavourited(true);
          }else {
          setIsFavourited((prev) => !prev);
        }

      }
      }

    return (
        <div 
            className={shouldHide() ? "hide" : "preview"}
            onClick={handleButtonClick}>
            <div><img className="preview-image" src={property.image}/></div>
            <div className={isFavourited ? "heart favourited" : "heart"} onClick={((e)=>handleToggleFavourite(e))}>❤</div>
            <div className="property-description">
                <h5 style={{ textAlign: "left" }}>{property.property_name}</h5>
                <p>{property.property_type}</p>
                </div>
                {reviews !== 0 && <Stars rating={reviews} editable={false} />}
            <div><p>£{property.price_per_night}</p></div>
            
        </div>
    )
};