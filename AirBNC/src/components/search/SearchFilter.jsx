import { useEffect } from "react";
import { useState } from "react";
import DropDownSelect from "./DropDownSelect";
import PriceSlider from "./PriceSlider";


export default function SearchFilter ({setSearchParameters, setFavouritesOnly}) {
 

  const [selectedOption, setSelectedOption] = useState({sort_by:"None",category:"All"});
 
    const initialMinPrice = 0;
    const initialMaxPrice = 1000;

    const propertyTypes = ["All","Apartment","House","Studio","Loft","Villa","Cottage","Chalet","Cabin","Mansion","Castle"]
    const reviews = ["All", "5*","4*+","3*+","2*+"];
    const sortByOptions = ["Price per Night Asc","Price per Night Desc","Popular - Most to Least","Popular - Least to Most"];

    const handleFavouritesClick = (e) => {
      setFavouritesOnly(e.target.checked);
    }


  useEffect
    return (
        <div className="search-options">
            <label htmlFor="price">Price per night: </label>
            <PriceSlider setSearchParameters={setSearchParameters}/>
            <DropDownSelect parameter="sort_by" parameterLabel = "Sort By"options={sortByOptions} setOutput={setSearchParameters} setSelectedOption={setSelectedOption} selectedOption={selectedOption} preSelected={{sort_by:"None"}}/>
            <DropDownSelect parameter="property_type" parameterLabel = "Property Type" options={propertyTypes} setOutput={setSearchParameters} setSelectedOption={setSelectedOption} selectedOption={selectedOption} preSelected={{property_type:"All"}}/>
            <DropDownSelect parameter="reviews" parameterLabel = "Reviews" options={reviews} setOutput={setSearchParameters} setSelectedOption={setSelectedOption} selectedOption={selectedOption} preSelected={{reviews:"All"}}/>
            <label htmlFor="favourites-check">Show only my favourites</label>
            <input type="checkbox" id="favourites-check" onClick={(e)=>{handleFavouritesClick(e)}}/>
        </div>
    )
}