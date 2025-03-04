import { useEffect, useState } from "react";
import PropertyPreview from "./propertyFeed/PropertyPreview";
import axios from "axios";

export default function Favourites() {
    const [favourites, setFavourites] = useState([]); 

    useEffect(() => {
        const fetchFavourites = async () => {
            try {
                const response = await axios.get("https://jl-air-bnc.onrender.com/api/users/4/favourites");
                console.log(response)
                setFavourites(response.data.favourites);
            } catch (error) {
                console.error("Error fetching favourites:", error);
            }
        };

        fetchFavourites();
    }, []);

    useEffect(() => {
        console.log("Favourites updated:", favourites);
    }, [favourites]);

    return (
        <div>
            <h2>Your Favourites</h2>
            {favourites.length > 0 ? (
                favourites.map((property) => (
                    <PropertyPreview key={property.property_id} property={property} />
                ))
            ) : (
                <p>No favourite properties found.</p>
            )}
        </div>
    );
}