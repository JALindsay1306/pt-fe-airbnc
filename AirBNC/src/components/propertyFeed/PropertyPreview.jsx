import { useEffect, useState } from "react";
import axios from "axios";
import Stars from "./Stars";
import { useNavigate } from "react-router-dom";
import Property from '../../components/property/Property';

export default function PropertyPreview ({property,reviewFilter}) {
    const [reviews,setReviews] = useState(0);
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
    },[])

    const shouldHide = () => {
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
        navigate(`/property/${property.property_id}`,{ state: { property } });
      };
    

    return (
        <div 
            className={shouldHide() ? "hide" : "preview"}
            onClick={handleButtonClick}>
            <div><img className="preview-image" src={property.image}/></div>
            <div className="property-description">
                <h5 style={{ textAlign: "left" }}>{property.property_name}</h5>
                <p>{property.property_type}</p>
                <Stars rating={reviews}/>
                </div>
            <div><p>£{property.price_per_night}</p></div>
            
        </div>
    )
};