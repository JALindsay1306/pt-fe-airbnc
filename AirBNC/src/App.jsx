import { createContext, useContext, useEffect, useState } from 'react'
import { Routes, Route } from "react-router-dom";
import './App.css'
import PropertyFeed from './components/PropertyFeed'
import Property from './components/property/Property';
import ReviewFeed from './components/ReviewFeed';
import { UserProvider } from './components/UserContext';
import PostReview from './components/PostReview';
import Favourites from './components/Favourites';
import axios from 'axios';


function App() {
  const [userID, setUserID] = useState(4)

  return (
    <UserProvider initialUserID={userID}>
    <Routes>
            <Route path="/" element={<PropertyFeed />} />
            <Route path="/property/:id" element={<Property/>} />
            <Route path="/property/:id/reviews" element={<ReviewFeed/>} />
            <Route path="/favourites" element={<Favourites/>} />
            <Route path="/property/:id/post-review" element={<PostReview/>} />
          </Routes>
    </UserProvider>
  )
}

export default App
