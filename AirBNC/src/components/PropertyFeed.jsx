import axios from "axios";
import { useEffect, useState } from "react";
import PropertyPreview from "./propertyFeed/PropertyPreview";

export default function PropertyFeed () {
    const [properties,setProperties] = useState([]);
    useEffect(()=>{
        async function fetchProperties(){
            let apiURL = "https://jl-air-bnc.onrender.com/api/properties/";
            try{
                const response = await axios.get(apiURL);
                console.log(response)
                setProperties(response.data.properties)
            } catch (error) {
                console.error("Error fetching items:", error);
              }
        }
        fetchProperties();
    },[])
    return (
        <div>
            <h1>Properties</h1>
            <div className="list-header">
                <div></div>
                <h3 style={{ textAlign: "left" }}>Property Name</h3>
                <h3>Price per Night</h3></div>
            <div>{properties.map((property)=>
                <PropertyPreview property={property}/>)}
                </div>
        </div>
    )
}