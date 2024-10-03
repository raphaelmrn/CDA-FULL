import { useEffect, useState } from "react";
import AdGallery from "../organisms/AdGallery";
import { AdCardProps } from "../molecules/AdCard";
import axios from "axios";

export default function HomePage() {
    const [ads, setAds] = useState<AdCardProps[]>([]);
    
	async function fetchData() {
		const { data } = await axios.get<AdCardProps[]>(
			"http://localhost:3000/ads",
		);
		setAds(data);
	}

	useEffect(() => {
		fetchData();
	}, []);

    return <AdGallery title="Annonces les plus récentes" ads={ads} />
}