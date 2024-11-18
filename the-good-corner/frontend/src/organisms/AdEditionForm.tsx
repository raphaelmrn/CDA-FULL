import type { FormEvent } from "react";
import Select from "react-select";
import { useNavigate } from "react-router-dom";
import { gql, useMutation, useQuery } from "@apollo/client";

type ApiResult = {
	id: number;
	name: string;
};
type SelectOption = {
	value: number;
	label: string;
};
export type AdEditionFormProps = {
	id: number;
	title: string;
	picture: string;
	price: number;
	description: string;
	owner: string;
	createdAt: string;
	location: string;
	category: ApiResult;
	tags: ApiResult[];
};

export default function AdEditionForm(props: AdEditionFormProps) {
	const { loading, error, data } = useQuery(GET_CATEGORIES_AND_TAGS);
	const navigate = useNavigate();
	const [replaceAd] = useMutation(RELPACE_AD);
	const [deleteAd] = useMutation(DLEETE_AD);

	const hSubmit = (evt: FormEvent) => {
		evt.preventDefault();

		const form = evt.target;
		const formData = new FormData(form as HTMLFormElement);
		const formJson = Object.fromEntries(formData.entries());

		const formattedData = {
			...formJson,
			price: Number.parseFloat(formJson.price as string),
			tags: (formJson.tags as string).split(","),
		};

		replaceAd({
			variables: { data: formattedData, adId: props.id.toString() },
		});
	};

	const hDelete = async () => {
		await deleteAd({ variables: { adId: props.id.toString() } });
		navigate("/");
	};

	if (error) return <>Error!</>;
	if (loading) return <>Loading...</>;
	return (
		<main className="main-content">
			<form onSubmit={hSubmit}>
				<label>
					Titre:
					<input
						className="text-field"
						name="title"
						defaultValue={props.title}
					/>
				</label>
				<label>
					Description:
					<input
						className="text-field"
						name="description"
						defaultValue={props.description}
					/>
				</label>
				<label>
					Owner:
					<input
						className="text-field"
						name="owner"
						defaultValue={props.owner}
					/>
				</label>
				<label>
					Price:
					<input
						className="text-field"
						name="price"
						defaultValue={props.price}
					/>
				</label>
				<label>
					Picture:
					<input
						className="text-field"
						name="picture"
						defaultValue={props.picture}
					/>
				</label>
				<label>
					Location:
					<input
						className="text-field"
						name="location"
						defaultValue={props.location}
					/>
				</label>
				<select name="category">
					{data.getCategories.map((category) => (
						<option key={category.id} value={category.id}>
							{category.name}
						</option>
					))}
				</select>
				<label>
					Tags:
					<Select
						options={data.getTags.map((apiTag: ApiTag) => ({
							value: apiTag.id,
							label: apiTag.name,
						}))}
						isMulti
						name="tags"
						delimiter=","
					/>
				</label>
				<button className="button">Update Ad!</button>
			</form>
			<button type="button" onClick={hDelete}>
				Delete Ad!
			</button>
		</main>
	);
}
