import { BASE_URL } from "../common/const";
import { makeUrlFetch } from "../common/helpers/makeUrlFetch";

const localCache = new Map()

const getState = ({ getStore, getActions, setStore }) => {

	return {
		store: {
			result:[],
			favorites: [], 
			details: null,
			error:null,
			isloading: false,
			searchData: {}
		},
		actions: {
			getData: async (options) => {
				const url = makeUrlFetch(options)
				
				const urlLastSearch = JSON.parse(localStorage.getItem("lastSearch"))?.url || ""

				if (localCache.get(url)) {
					setStore({ result: localCache.get(url) })
					return
				}

				if (urlLastSearch === url) {
					setStore({ result:JSON.parse(localStorage.getItem("lastSearch")).data })
					return
				}

				setStore({ error: null })
				setStore({ isLoading:true })
				
				try { 
					
					const response = await fetch(url)

					if (!response.ok) {
						const customError = {
							code: response.status,
							message: response.statusText
						}
						setStore({ error: customError })
						throw new Error("Load data fail");
						
					}
					const data = await response.json()
					let result

					if ("results" in data) {
						const newData = data.results.map(async element => {
							const urlImage = await getActions().getImageUrl(options.category,element.uid)
							return { ...element, image: urlImage}
						})
						result = await Promise.all(newData)
					}

					if ("result" in data) {
						result = data.result
					}					

					setStore({ result: result})

					localCache.set(url,result)

					localStorage.setItem("lastSearch", JSON.stringify({ url:url,data:result }))

				} catch (error) {
					console.log(error.message);      
				} finally{
					setStore({ isLoading:false })
				}
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
			getImageUrl: async (category, uid) => {
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
			},
			getByName: async (name) => {
				
				if (name === "") {
					getActions().resetDataSearch()
					return
				}
				const response1 = fetch(`${BASE_URL}people/?name=${name}`);
				const response2 = fetch(`${BASE_URL}vehicles/?name=${name}`);
				const response3 = fetch(`${BASE_URL}planets/?name=${name}`);
				
				const [respuesta1, respuesta2, respuesta3] = await Promise.all([response1, response2, response3]);

				const data1 = await respuesta1.json();
				const data2 = await respuesta2.json();
				const data3 = await respuesta3.json();

				setStore({ searchData: { people:data1.result.slice(0, 3), vehicles:data2.result.slice(0, 3), planets:data3.result.slice(0, 3) } })
			},
			resetDataSearch: async () => {
				setStore({searchData:{people:[], vehicles:[], planets:[]}})
			}
		}
	};
};

export default getState;
