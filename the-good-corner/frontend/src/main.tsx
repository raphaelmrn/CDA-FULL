import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";
import HomePage from "./pages/HomePage.tsx";
import CategoryPage from "./pages/CategoryPage.tsx";
import AdCreationPage from "./pages/AdCreationPage.tsx";
import AdPage from "./pages/AdPage.tsx";
// import { client } from "./libs/api.ts";

const router = createBrowserRouter([
	{
		path: "/",
		element: <App />,
		children: [
			{
				path: "/",
				element: <HomePage />,
			},
			{
				path: "/ads/:adId",
				element: <AdPage />,
			},
			{
				path: "/ads/new",
				element: <AdCreationPage />,
			},
			{
				path: "/categories/:catId",
				element: <CategoryPage />,
			},
		],
	},
]);

const client = new ApolloClient({
	uri: "http://localhost:3000",
	cache: new InMemoryCache(),
});

// biome-ignore lint/style/noNonNullAssertion: There *must* be a #root element for my whole page to work, this has no meaning otherwise
createRoot(document.getElementById("root")!).render(
	<StrictMode>
		<ApolloProvider client={client}>
			<RouterProvider router={router} />
		</ApolloProvider>
	</StrictMode>,
);
