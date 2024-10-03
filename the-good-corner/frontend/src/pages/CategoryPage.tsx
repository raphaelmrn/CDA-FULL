import { useEffect, useState } from "react";
import AdGallery from "../organisms/AdGallery";
import { AdCardProps } from "../molecules/AdCard";
import axios from "axios";
import { useParams } from "react-router-dom";

export default function CategoryPage() {
    const [ads, setAds] = useState<AdCardProps[]>([]);
    const {catId} = useParams()
    
	async function fetchData() {
		const { data } = await axios.get<AdCardProps[]>(
			`http://localhost:3000/ads?categoryId=${catId}`,
		);
		setAds(data);
	}

	useEffect(() => {
		fetchData();
	}, [catId]);

    return <AdGallery title={`Annonces de la catégorie n°${catId}`} ads={ads} />
}