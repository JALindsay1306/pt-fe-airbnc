import { useParams } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";


export default function Property () {
    const { id } = useParams(); // Extract the 'id' parameter from the URL
    const [property, setProperty] = useState(null);
    const [loading, setLoading] = useState(true);
  
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
  
    if (loading) {
      return <div><h4>Property Loading...</h4></div>;
    }
  
    if (!property) {
      return <div>Property not found.</div>;
    }
  
    return (
      <div>
        <h1>{property.property_name}</h1>
        <p>{property.description}</p>
      </div>
    );
  }