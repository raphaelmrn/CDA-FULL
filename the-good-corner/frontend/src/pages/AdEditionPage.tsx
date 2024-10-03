import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { AdDetailProps } from "../organisms/AdDetail";
import axios from "axios";
import AdEditionForm from "../organisms/AdEditionForm";

export default function AdEditionPage() {
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
	

    if(!adId) return <>Loading...</>
    return (
        <AdEditionForm {...ad} id={Number(adId)} />
    )
}