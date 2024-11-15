// import axios from "axios";
import type { Ad, Category, Tag } from "../types/Api";
import { ApolloClient, gql, InMemoryCache } from "@apollo/client";

// const api = axios.create({
// 	baseURL: "http://localhost:3000/",
// });

export const client = new ApolloClient({
	uri: "http://localhost:3000",
	cache: new InMemoryCache(),
});

// const searchAds = async (needle: string): Promise<Ad[]> => {
// const { data } = await api.get(`/ads?needle=${needle}`);
// let data;
// client
// 	.query({
// 		query: gql`getAds {
//             id
//             title
//             description
//             owner
//             price
//             picture
//             location
//             createdAt
//         }`,
// 	})
// 	.then((result) => console.log(result));
// return new Promise<Ad>(() => {});
// return data;
// };
const getCategories = async (): Promise<Category[]> => {
	// const { data } = await api.get(`/categories`);
	return data;
};
const getTags = async (): Promise<Tag[]> => {
	// const { data } = await api.get(`/tags`);
	return data;
};

export default {
	//searchAds,
	getCategories,
	getTags,
};
