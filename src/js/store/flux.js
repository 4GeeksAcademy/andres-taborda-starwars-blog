import { element } from "prop-types";
import { BASE_URL } from "../common/const";
import { useFetchData } from "../common/hooks/useFetchData";
import { useEffect } from "react";

const getState = ({ getStore, getActions, setStore }) => {
	const { data, isLoading, error, getData } = useFetchData()
	
	useEffect(() => {
		console.log(data);
		setStore({ result: data})		
	}, [data]);

	return {
		store: {
			result:[],
			favorites: [

			], 
			
		},
		actions: {
			getData: async (category) => {
				// const response = await fetch(`${BASE_URL}people/?page=1&limit=10`)
				// if (!response.ok) {
				// 	throw new Error(response.statusText);
					
				// }
				// const { results } = await response.json()
				// setStore({ result: results})
				getData({ category:category })
			},
			addFavorites: (element) => {
				const { favorites } = getStore()
				setStore({ favorites:[...favorites, element] })

				const favoritesStorage = JSON.parse(localStorage.getItem("favorites")) || []
				favoritesStorage.push(element)
				localStorage.setItem("favorites", JSON.stringify(favoritesStorage))
			},
			removeFavorites: (id) => {
				const { favorites } = getStore()
				const updatedFavorites = favorites.filter(element => element.uid !== id)
				setStore({ favorites: updatedFavorites })
				
				localStorage.setItem("favorites", JSON.stringify(updatedFavorites))
			},
			getFavorites: () => {
				const favorites = JSON.parse(localStorage.getItem("favorites")) || []
				setStore({ favorites: favorites})
			}
		}
	};
};

export default getState;
