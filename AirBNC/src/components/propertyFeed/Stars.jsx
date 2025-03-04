import { useEffect, useState } from "react";

export default function Stars ({rating, editable, onRatingChange, propertyPage}) {
  const maxStars = 5;
  const [hoveredRating, setHoveredRating] = useState(0);
  const [currentRating, setCurrentRating] = useState(rating);
  const handleMouseMove = (event, index) => {
    if (!editable) return;
    setHoveredRating(index + 1);
  };

  const handleMouseLeave = () => {
    if (editable) setHoveredRating(0);
  };

  const handleClick = () => {
    if (editable) {
      setCurrentRating(hoveredRating);
      if (onRatingChange) {
        onRatingChange(hoveredRating);
      }
    }
  };

  useEffect(()=>{
    if(propertyPage){
      onRatingChange(hoveredRating)
    }
  },[hoveredRating])

  return (
    <div className={`stars-container ${editable ? "editable" : ""}`}>
      {Array.from({ length: maxStars }, (_, i) => {
        const displayRating = hoveredRating > 0 ? hoveredRating : currentRating;
        let fillType = "empty";

        if (displayRating > i) {
          fillType = displayRating >= i + 1 ? "full" : "half"; 
        }

        return (
          <span
            key={i}
            className={`star ${fillType} ${editable && hoveredRating > 0 ? "editable" : ""}`}
            onMouseMove={(e) => editable && handleMouseMove(e, i)}
            onMouseLeave={editable ? handleMouseLeave : undefined} 
            onClick={editable ? handleClick : undefined}
          >
            ★
          </span>
        );
      })}
    </div>
  );
}