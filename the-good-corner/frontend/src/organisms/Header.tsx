import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Category } from "../types/Api";
import Search from "../molecules/Search";
import api from "../libs/api";

function Header() {
    const [categories, setCategories]=useState<Category[]>([])

    async function fetchCategories() {
        const data = await api.getCategories()
        setCategories(data)
    }

    useEffect( ()=>{
        fetchCategories()
    }, [] )
	return (
		<header className="header">
			<div className="main-menu">
				<h1>
					<Link to="/" className="button logo link-button">
						<span className="mobile-short-label">TGC</span>
						<span className="desktop-long-label">THE GOOD CORNER</span>
					</Link>
				</h1>
				<Search />
				<Link to="/ads/new" className="button link-button">
					<span className="mobile-short-label">Publier</span>
					<span className="desktop-long-label">Publier une annonce</span>
				</Link>
			</div>
			<nav className="categories-navigation">
				{categories.map((cat, id) => (
					<span key={cat.id}>
						{id > 0 && "•"}
						<Link to={`/categories/${cat.id}`} className="category-navigation-link" >
							{cat.name}
						</Link>
					</span>
				))}
			</nav>
		</header>
	);
}

export default Header;
