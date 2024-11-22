import React, { useContext, useEffect } from "react";

import "../../styles/home.css";
import { Context } from "../store/AppContext";
import { CardList } from "../components/CardList";
import { useLocation } from "react-router";
import { Search } from "../components/Search";

export const Home = () => {
	const { store, actions } = useContext(Context);
  const { result } = store

	const location = useLocation()
	const category = location.pathname.replace("/", "").trim()
	
	
	useEffect(() => {
		
		actions.getData({category})
	
	}, [category]);

	return (
		<div className="text-center mb-5">		
			<Search/>						
			<CardList result={result} category={category}/>
		</div>

	)
};
