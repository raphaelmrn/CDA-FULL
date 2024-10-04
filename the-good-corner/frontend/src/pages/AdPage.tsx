import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import AdDetail, { AdDetailProps } from "../organisms/AdDetail";
import AdEditionForm from "../organisms/AdEditionForm";


export default function AdPage() {
    const {adId} = useParams()
	const [editionMode, setEditionMode] = useState(false)
    const [ad, setAd] = useState<AdDetailProps|null>(null);
    
	async function fetchData() {
		const { data } = await axios.get<AdDetailProps>(
			`http://localhost:3000/ads/${adId}`,
		);
		setAd(data);
	}

	const hClick = ()=>{
		setEditionMode(!editionMode)
	}

	useEffect(() => {
		fetchData();
	}, [adId]);

	if(!adId) return <p>Huh, we're missing the ad number :/</p>
	
	if(!ad) return <p>Loading...</p>

	return (
		<>
			<label>
				Edit mode: <input type='checkbox' checked={editionMode} onChange={hClick} />
			</label>
			{editionMode ?
				<AdEditionForm {...ad} id={Number(adId)} />
				:
				<AdDetail {...ad} />
			}
		</>
	)
}
