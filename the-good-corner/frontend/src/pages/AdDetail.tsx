import { useParams } from "react-router-dom";

export default function AdDetail() {
	const { adId } = useParams();
	return 		<main className="main-content">
I iz Ad #{adId}</main>;
}
