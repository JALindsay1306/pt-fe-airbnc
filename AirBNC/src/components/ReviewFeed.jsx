import { useState , useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import SearchControls from "./search/SearchControls";
import SortBy from "./search/SortBy";
import Review from "./Review";

export default function Reviews () {
    const { id } = useParams();
    const [reviews,setReviews] = useState([]);
    const [loading,setLoading] = useState({loadingProperty:true,loadingReviews:true});
    const [property,setProperty] = useState(null)
    const [deletedReview,setDeletedReview] = useState(false);

    useEffect(()=>{
        async function getReviews (id) {
            setLoading((prev) => ({ ...prev, loadingReviews: true }));
            try{
                const response = await axios.get(`https://jl-air-bnc.onrender.com/api/properties/${id}/reviews`);
                setReviews(response.data.reviews)
                setLoading((prev) => ({ ...prev, loadingReviews: false }));
            } catch (error) {
                console.error("Error fetching reviews:", error);
                setLoading((prev) => ({ ...prev, loadingReviews: false }));
              }
        }
        getReviews(id)
    },[deletedReview])

    useEffect(() => {
        async function fetchProperty() {
            setLoading((prev) => ({ ...prev, loadingProperty: true }));
          try {
            const response = await axios.get(
              `https://jl-air-bnc.onrender.com/api/properties/${id}`
            );
            setProperty(response.data.property);
            setLoading((prev) => ({ ...prev, loadingProperty: false }));
          } catch (error) {
            console.error("Error fetching property:", error);
            setLoading((prev) => ({ ...prev, loadingProperty: false }));
          }
        }
          fetchProperty();
    }, [id]);

    return (
        <div>
                <h1>Reviews{property?` for ${property.property_name}`:""}</h1>
                <SearchControls>
                    <SortBy/>
                </SearchControls>
                <div>
                    {loading.loadingProperty && loading.loadingReviews ? (
                        <h4>Loading Reviews</h4>):
                        reviews.length==0? (
                            <h4>No Reviews found</h4>
                        ):
                        reviews.map((review)=>
                    <Review review={review} setDeletedReview={setDeletedReview}/>)}
                </div>
            </div>
    )

}