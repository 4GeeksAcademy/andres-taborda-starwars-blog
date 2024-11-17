import React, { useContext } from 'react'
import { Context } from "../store/AppContext";
import { CardList } from '../components/CardList';

export const Favorites = () => {
  const { store, actions } = useContext(Context);
  const { favorites } = store

	return (
		<div className="text-center">								
			<CardList result={favorites}/>
		</div>

	)
}
