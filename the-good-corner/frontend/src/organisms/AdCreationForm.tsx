import axios from "axios";
import { FormEvent, useEffect, useState } from "react";
import { Category } from "../types/Api";
import Select from "react-select";
import sdk from "../libs/api";

export default function AdCreationForm() {
	const [categories, setCategories] = useState<Category[]>([]);
	const [tags, setTags] = useState([]);

	async function fetchCategories() {
		// const data = await sdk.getCategories()
		const data: Category[] = [];
		setCategories(data);
	}
	async function fetchTags() {
		// let data = await sdk.getTags();
		type ApiTag = {
			id: number;
			name: string;
		};
		// data = data.map((apiTag: ApiTag) => ({
		// 	value: apiTag.id,
		// 	label: apiTag.name,
		// }));
		const data: ApiTag[] = [];
		setTags(data);
	}

	// useEffect(() => {
	// 	fetchCategories();
	// 	fetchTags();
	// }, []);

	const hSubmit = (evt: FormEvent) => {
		evt.preventDefault();

		const form = evt.target;
		const formData = new FormData(form as HTMLFormElement);
		const formJson = Object.fromEntries(formData.entries());

		axios.post("http://localhost:3000/ads", formJson);
	};

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
					<input className="text-field" name="price" />
				</label>
				<label>
					Picture:
					<input className="text-field" name="picture" />
				</label>
				<label>
					Location:
					<input className="text-field" name="location" />
				</label>
				<select name="categoryId">
					{categories.map((category) => (
						<option key={category.id} value={category.id}>
							{category.name}
						</option>
					))}
				</select>
				<label>
					Tags:
					<Select options={tags} isMulti name="tagsIds" delimiter="," />
				</label>
				<button className="button">Create Ad!</button>
			</form>
		</main>
	);
}
