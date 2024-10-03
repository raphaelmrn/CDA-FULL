import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import AdDetail, { AdDetailProps } from "../organisms/AdDetail";

export default function AdPage() {
    const {adId} = useParams()
    const [ad, setAd] = useState<AdDetailProps|null>(null);
    
	async function fetchData() {
		const { data } = await axios.get<AdDetailProps>(
			`http://localhost:3000/ads/${adId}`,
		);
		setAd(data);
	}

	useEffect(() => {
		fetchData();
	}, [adId]);

	if(!ad) return <p>Loading...</p>
	
    return <AdDetail {...ad} />
}
