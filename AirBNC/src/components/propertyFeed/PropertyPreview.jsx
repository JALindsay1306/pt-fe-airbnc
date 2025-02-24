import { useEffect, useState } from "react";
import axios from "axios";
import Stars from "./Stars";

export default function PropertyPreview ({property}) {
    const [reviews,setReviews] = useState(0);
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
    return (
        <div className="preview">
            <div><img className="preview-image" src={property.image}/></div>
            <div className="property-description">
                <h2>{property.property_name}</h2>
                <p>{property.property_type}</p>
                <Stars rating={reviews}/>
                </div>
            <div><p>£{property.price_per_night}</p></div>
            
        </div>
    )
};