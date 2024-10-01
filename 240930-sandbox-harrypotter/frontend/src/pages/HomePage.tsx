import { useEffect, useState } from "react";
import wizards from "../data.json";
import WizardCard from "../WizardCard";
import { Link } from "react-router-dom";

export default function Homepage() {
	const [nbClicks, setNbClicks] = useState<number>(0);
	const [red, setRed] = useState<number>(0);
	const [green, setGreen] = useState<number>(0);
	const [blue, setBlue] = useState<number>(0);

	const hClick = () => {
		console.log("hey, hi !!! =d");
		setNbClicks(nbClicks + 1);
	};

	const changeColor = () => {
		// May render our component 3 times, beware !
		setRed(Math.floor(Math.random() * 255));
		setGreen(Math.floor(Math.random() * 255));
		setBlue(Math.floor(Math.random() * 255));
	};

	// First render only
	// useEffect(() => {
	// 	changeColor();
	// }, []);

	// First render + everytime nbClicks changes
	// useEffect(() => {
	// 	changeColor();
	// }, [nbClicks]);

	// useEffect(() => {
	// 	if (nbClicks) changeColor();
	// }, [nbClicks]);

	// useEffect(() => {
	// 	const handleInterval = setInterval(() => {
	// 		changeColor();
	// 	}, 2500);

	// 	return () => {
	// 		clearInterval(handleInterval);
	// 	};
	// }, []);

	// Au montage: premier console.log
	// Au démontage: second console.log
	// useEffect(() => {
	// 	console.log("I iz ALIVE ! Owi <3 ");

	// 	return () => {
	// 		console.log("I iz dead é_è");
	// 	};
	// }, []);

	// Execute une fonction toutes les deux secondes
	// setInterval(()=>{}, 2000)

	// Execute une fonction APRES deux secondes
	// setTimeout(()=>{}, 2000)

	// On *every* render. Don't do this unless you know what you're doing !
	useEffect(() => {});

	// useEffect->changecolor->setState->render->useEffect->changecolor->setState->render->useEffect->changecolor->setState->render->useEffect->changecolor->setState->render->useEffect->changecolor->setState->render->useEffect->changecolor->setState->render->useEffect->changecolor->setState->render->useEffect->changecolor->setState->render->useEffect->changecolor->setState->render->useEffect->changecolor->setState->render->...
	// useEffect(() => {
	// 	changeColor();
	// });

	return (
		<>
			Nb Clicks: {nbClicks}
			<button onClick={hClick}>Clickme !</button>
			<div style={{ color: `rgb(${red}, ${green}, ${blue})` }}>
				<h2>I iz a Unicorn ! \o/</h2>
			</div>
			<Link to="/wizards/1">Let me go!</Link>
			{/* <h1>Welcome in our magic Sandbox!</h1>
			<section>
				<h2>Wizards</h2>
				<ul>
					{wizards
						.filter((wizard) => wizard.house === "Slytherin")
						.map((wizard) => {
							const { id, name, image, house } = wizard;
							return (
								<li key={wizard.id}>
									<WizardCard {...{ id, name, image, house }} />
								</li>
							);
						})}
				</ul>
			</section>
			<section>
				<h2>Magic creatures</h2>
				<ul>
					{wizards
						.filter((element) => element.species !== "human")
						.map((creature) => (
							<li key={creature.id}>
								<WizardCard {...creature} />
							</li>
						))}
				</ul>
			</section> */}
		</>
	);
}
