import { useState } from "react";
import { useParams } from "react-router-dom";
import AdDetail from "../organisms/AdDetail";
import AdEditionForm from "../organisms/AdEditionForm";
import { gql, useQuery } from "@apollo/client";

const GET_AD = gql`
query Query($adId: String!) {
  getAdById(adId: $adId) {
    id
    title
    description
    owner
    price
    picture
    location
    createdAt
  }
}`;

export default function AdPage() {
	const { adId } = useParams();
	const { loading, error, data } = useQuery(GET_AD, {
		variables: { adId: adId },
	});

	const [editionMode, setEditionMode] = useState(false);

	const hClick = () => {
		setEditionMode(!editionMode);
	};

	if (loading) return <p>Loading...</p>;
	if (error) return <p>Aw fck, something broke !</p>;
	return (
		<>
			<label>
				Edit mode:{" "}
				<input type="checkbox" checked={editionMode} onChange={hClick} />
			</label>
			{editionMode ? (
				<AdEditionForm {...data.getAdById} id={Number(adId)} />
			) : (
				<AdDetail {...data.getAdById} />
			)}
		</>
	);
}
