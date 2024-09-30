import wizards from "../data.json";
import WizardCard from "../WizardCard";

export default function Homepage() {
	return (
		<>
			<h1>Welcome in our magic Sandbox!</h1>
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
			</section>
		</>
	);
}
