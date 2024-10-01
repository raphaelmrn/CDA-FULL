import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Homepage from "./pages/HomePage.tsx";
import WizardDetailPage from "./pages/WizardDetailPage.tsx";
import "./main.css";

const router = createBrowserRouter([
	{
		path: "/",
		element: <App />,
		children: [
			{
				path: "/",
				element: <Homepage />,
			},
			{
				path: "/wizards/:wizId",
				element: <WizardDetailPage />,
			},
		],
	},
]);

createRoot(document.getElementById("root")!).render(
	<StrictMode>
		<RouterProvider router={router} />,
	</StrictMode>,
);
