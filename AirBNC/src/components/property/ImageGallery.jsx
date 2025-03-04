import { useState } from "react"



export default function ImageGallery ({images}) {
    if(!images||images.length===0){
        return <div className="gallery-container no-images">No images available</div>;
    }

    const [currentIndex,setCurrentIndex] = useState(0);
    const [animationClass,setAnimationClass] = useState("");

    const goToPrevious = () => {
        setAnimationClass("slide-left");
        setTimeout(()=>{
            setCurrentIndex((prevIndex)=>(prevIndex===0?images.length-1:prevIndex-1));
            setAnimationClass("");
        },300);
    };

    const goToNext = () => {
        setAnimationClass("slide-right");
        setTimeout(()=>{
            setCurrentIndex((prevIndex)=>(prevIndex=== images.length - 1? 0 :prevIndex+1));
            setAnimationClass("");
        },300);
    }
    return (
        <div className="gallery-container">
            <img
                key={currentIndex}
                src={images[currentIndex].image}
                alt={images[currentIndex].alt}
                className={`gallery-image ${animationClass}`}
            />
            {images.length > 1 && (
                <>
                <button onClick={goToPrevious} className="gallery-button left">&#9664;</button>
                <button onClick={goToNext} className="gallery-button right">&#9654;</button>
                </>
            )}
        </div>

)
};