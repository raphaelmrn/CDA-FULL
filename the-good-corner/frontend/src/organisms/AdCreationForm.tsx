import { useEffect, type FormEvent } from "react";
import Select from "react-select";
import { gql, useMutation, useQuery } from "@apollo/client";
import { useNavigate } from "react-router-dom";

const GET_CATEGORIES_AND_TAGS = gql`
query GetCategories {
  getCategories {
    id
    name
  }
  getTags {
    id
    name
  }
}`;
const CREATE_AD = gql`
mutation Mutation($data: AdInput!) {
  createAd(data: $data) {
    id
  }
}`;

export default function AdCreationForm() {
	const { loading, error, data } = useQuery(GET_CATEGORIES_AND_TAGS);
	const [createAd, { data: dataSub, loading: subLoading, error: subError }] =
		useMutation(CREATE_AD);
	const navigate = useNavigate();

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

		createAd({ variables: { data: formattedData } });
	};

	useEffect(() => {
		if (!dataSub) return;
		navigate(`/ads/${dataSub.createAd.id}`);
	}, [dataSub, navigate]);

	if (error || subError) return <>Error!</>;
	if (loading) return <>Loading...</>;
	return (
		<main className="main-content">
			<form onSubmit={hSubmit}>
				<label>
					Titre:
					<input className="text-field" name="title" />
				</label>
				<label>
					Description:
					<input className="text-field" name="description" />
				</label>
				<label>
					Owner:
					<input className="text-field" name="owner" />
				</label>
				<label>
					Price:
					<input className="text-field" name="price" type="number" />
				</label>
				<label>
					Picture:
					<input className="text-field" name="picture" />
				</label>
				<label>
					Location:
					<input className="text-field" name="location" />
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
				<button className="button" disabled={subLoading}>
					Create Ad!
				</button>
			</form>
		</main>
	);
}
