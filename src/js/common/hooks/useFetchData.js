import { useState } from "react";



export const useFetchData = () => {
  const [imageUrl, setImageUrl] = useState("https://starwars-visualguide.com/assets/img/big-placeholder.jpg");
  
  const getImageUrl = async (category, uid) => {

    try {
      const urlImage = `https://starwars-visualguide.com/assets/img/${category === "people" ? 'characters': category}/${uid}.jpg`
      const response = await fetch(urlImage)
      if (response.ok) {
        setImageUrl(urlImage)				
      }
    } catch (error) {
      console.log(error);
      
    }
  }


  return { imageUrl, getImageUrl }
}
