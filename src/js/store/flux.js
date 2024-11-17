import { useFetchData } from "../common/hooks/useFetchData";
import { useEffect } from "react";

const getState = ({ getStore, getActions, setStore }) => {
	const { data, isLoading, error, getData } = useFetchData()
	
	useEffect(() => {
		setStore({ result: data})		
	}, [data]);

	return {
		store: {
			result:[],
			favorites: [], 
			details: null
		},
		actions: {
			getData: async (category) => {
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
			},
			getDetails: async (id) => {
				const urlDetails = getStore().result.find(element => element.uid === id)?.url
				try {
					const response = await fetch(urlDetails)
					if (!response.ok) {
						throw new Error("Failed to load data");
						
					}
					const { result } = await response.json()
					setStore({ details: result })

				} catch (error) {
					console.log(error);					
				}
				
			}
		}
	};
};

export default getState;
