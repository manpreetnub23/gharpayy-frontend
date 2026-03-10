import Sidebar from "./components/Sidebar.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import Pipeline from "./pages/Pipeline.jsx";
import Leads from "./pages/Leads.jsx";
import Visits from "./pages/Visits.jsx";

import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
	return (
		<BrowserRouter>
			<div className="flex">
				<Sidebar />

				<div className="flex-1 p-6 bg-gray-100 min-h-screen">
					<Routes>
						<Route path="/" element={<Dashboard />} />

						<Route path="/leads" element={<Leads />} />

						<Route path="/pipeline" element={<Pipeline />} />

						<Route path="/visits" element={<Visits />} />
					</Routes>
				</div>
			</div>
		</BrowserRouter>
	);
}

export default App;
