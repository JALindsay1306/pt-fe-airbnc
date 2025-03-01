import { Star } from "lucide-react";

export default function Stars ({rating}) {
    const maxStars=5;
    return (
        <div className="flex space-x-1">
      {Array.from({ length: maxStars }, (_, i) => (
            <Star
            key={i}
            size={24}
            className={i < rating ? "star filled" : "star"}
        />
      ))}
    </div>
    )
};