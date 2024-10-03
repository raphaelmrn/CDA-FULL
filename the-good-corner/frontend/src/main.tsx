import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import AdDetail from "./pages/AdDetail.tsx";
import AdCreaForm from "./pages/AdCreaForm.tsx";
import HomePage from "./pages/HomePage.tsx";
import CategoryPage from "./pages/CategoryPage.tsx";

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
				element: <AdDetail />,
			},
			{
				path: "/ads/new",
				element: <AdCreaForm />,
			},
			{
				path: "/categories/:catId",
				element: <CategoryPage />,
			},
			
		],
	},
]);

// biome-ignore lint/style/noNonNullAssertion: There *must* be a #root element for my whole page to work, this has no meaning otherwise
createRoot(document.getElementById("root")!).render(
	<StrictMode>
		<RouterProvider router={router} />
	</StrictMode>,
);
