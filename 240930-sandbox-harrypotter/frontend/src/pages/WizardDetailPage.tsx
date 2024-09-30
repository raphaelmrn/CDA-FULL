import { useParams } from "react-router-dom";
import wizards from "../data.json";

export default function WizardDetailPage() {
	const { wizId } = useParams();
	const wizard = wizards.find((wizard) => {
		return wizard.id === wizId;
	});

	if (!wizard) return <>Wiz not found é_è</>;

	return (
		<>
			<h1>Details about {wizard.name}</h1>
			<section>Soon</section>
		</>
	);
}
