import "./WizardCard.module.css";

type Props = {
	id: string;
	name: string;
	image: string;
	house: string;
};
export default function WizardCard(props: Props) {
	return (
		<a href={`/wizards/${props.id}`}>
			<article>
				<img src={props.image} alt={props.name} />
				<img src={props.house} alt={props.house} />
				<p>{props.name}</p>
			</article>
		</a>
	);
}
