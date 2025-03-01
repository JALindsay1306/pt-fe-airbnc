import axios from "axios";
import { useEffect, useState } from "react";
import PropertyPreview from "./propertyFeed/PropertyPreview";
import SearchControls from "./search/SearchControls";
import SearchFilter from "./search/SearchFilter";
import SortBy from "./search/SortBy";

export default function PropertyFeed () {
    const [properties,setProperties] = useState([]);
    const [searchParameters,setSearchParameters] = useState({});
    const [loading,setLoading] = useState(true);
    const [reviewFilter,setReviewFilter] = useState(null);


    useEffect(()=>{
        setLoading(true);
        async function fetchProperties(){
            let apiURL = "https://jl-air-bnc.onrender.com/api/properties/";
            let urlAdditions = ""
            if (Object.keys(searchParameters).length>0){
                console.log(searchParameters)
                urlAdditions = `?minprice=${searchParameters.minprice}&maxprice=${searchParameters.maxprice}`
                switch (searchParameters.sort_by){
                    case "Price per Night Desc":
                        urlAdditions+="&sortBy=price_per_night&sortorder=DESC";
                        break;
                    case "Price per Night Asc":
                        urlAdditions+="&sortBy=price_per_night&sortorder=ASC";
                        break;
                    case "Popular - Most to Least":
                        urlAdditions+="&sortBy=popularity&sortorder=DESC";
                        break;
                    case "Popular - Least to Most":
                        urlAdditions+="&sortBy=popularity&sortorder=ASC";
                        break;
                    default:
                        break;
                }
                if(searchParameters.property_type&&searchParameters.property_type!=="All"){
                    urlAdditions+=`&property_type=${searchParameters.property_type}`;
                }
            apiURL+=urlAdditions;
            if(searchParameters.reviews!=="All"){
                setReviewFilter(searchParameters.reviews)
            }
            }
            try{
                console.log(apiURL);
                const response = await axios.get(apiURL);
                setProperties(response.data.properties)
                setLoading(false);
            } catch (error) {
                console.error("Error fetching items:", error);
              }
        }
        fetchProperties();
    },[searchParameters])

    useEffect(()=>{
        console.log(searchParameters);
    },[searchParameters]);
    return (
        <div>
            <h1>Properties</h1>
            <SearchControls>
                <SearchFilter setSearchParameters={setSearchParameters}/>
                <SortBy/>
            </SearchControls>
            <div className="list-header">
                <div></div>
                <h3 style={{ textAlign: "left" }}>Property Name</h3>
                <h3>Price per Night</h3></div>
            <div>
                {loading ? (
                    <h4>Loading Properties</h4>):
                    properties.length==0? (
                        <h4>No Properties found, please change search parameters.</h4>
                    ):
                    properties.map((property)=>
                <PropertyPreview property={property} reviewFilter={reviewFilter}/>)}
            </div>
        </div>
    )
}