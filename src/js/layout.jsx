import React from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";



import injectContext from "./store/AppContext";


import { Footer } from "./components/Footer";
import { Navbar } from "./components/Navbar";
import { Details } from "./views/Details";
import { Favorites } from "./views/Favorites";
import { Home } from "./views/Home";



//create your first component
const Layout = () => {
	//the basename is used when your project is published in a subdirectory and not in the root of the domain
	// you can set the basename on the .env file located at the root of this project, E.g: BASENAME=/react-hello-webapp/
	const basename = process.env.BASENAME || "";

	return (
		<>
			<BrowserRouter 
				basename={basename} 
				future={{
					v7_startTransition: true,
					v7_relativeSplatPath:true
				}}>
				<main className="d-flex flex-row bg-dark">
					<Navbar />
					<Routes>
						<Route path="/" element={<Navigate to="/people" replace />} />
						<Route path="/:category" element={<Home />} />
						<Route path="/favorites" element={<Favorites />} />
						<Route path="/details/:id" element={<Details />} />
						<Route path="*" element={<h1>Not found!</h1>} />
					</Routes>
				</main>
				<Footer />
			</BrowserRouter>
		</>
	);
};

export default injectContext(Layout);
