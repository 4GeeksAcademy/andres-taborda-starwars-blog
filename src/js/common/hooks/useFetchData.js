import { useState } from "react";
import { BASE_URL } from "../const";

const localCache = new Map()

export const useFetchData = () => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  
  const getImageUrl = async (category, uid) => {
    try {
      const urlImage = `https://starwars-visualguide.com/assets/img/${category === "people" ? 'characters': category}/${uid}.jpg`
      const response = await fetch(urlImage)
      if (response.ok) {
        return urlImage					
      }
    } catch (error) {
      console.log(error);
      
    }
    return "https://starwars-visualguide.com/assets/img/big-placeholder.jpg"
  }

  const getData = async (options = {}) => {
    //?page=1&limit=10
    const { category, page } = options
    const url = `${BASE_URL}${category}?page=${page|| "1"}&limit=10`

    const urlLastSearch = JSON.parse(localStorage.getItem("lastSearch"))?.url || ""

    if (localCache.get(url)) {
      setData(localCache.get(url))
      return
    }

    if (urlLastSearch === url) {
      setData(JSON.parse(localStorage.getItem("lastSearch")).data)
      console.log("load storage");
      
      return
    }

    setError(null)
    setIsLoading(true)

    try {
      const response = await fetch(url)

      if (!response.ok) {
        const customError = {
          code: response.status,
          message: response.statusText
        }
        setError(customError)
        throw new Error("Load data fail");
        
      }
      const { results } = await response.json()

      const newData =  results.map(async element => {
        let url = await getImageUrl(category, element.uid)
        return { ...element, image: url}
      })
      
      const data = await Promise.all(newData); 
      setData(data)

      localCache.set(url,data)

      localStorage.setItem("lastSearch", JSON.stringify({ url:url,data:data }))

    } catch (error) {
      console.log(error.message);      
    } finally{
      setIsLoading(false)
    }
  }

  return { data, isLoading, error, getData }
}
