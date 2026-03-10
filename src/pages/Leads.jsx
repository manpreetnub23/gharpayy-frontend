import { useEffect, useState } from "react";
import { getLeads } from "../services/api";
import TopBar from "../components/Topbar.jsx";
import LeadForm from "./LeadForm.jsx";

const statusColors = {
	New: "bg-red-600 text-white",
	Contacted: "bg-black text-white",
	Visit: "bg-gray-800 text-white",
	Negotiation: "bg-gray-200 text-black",
	Closed: "bg-white text-black border border-black",
};

const Leads = () => {
	const [leads, setLeads] = useState([]);
	const [showLeadForm, setShowLeadForm] = useState(false);

	useEffect(() => {
		fetchLeads();
	}, []);

	const fetchLeads = async () => {
		const res = await getLeads();
		setLeads(res.data.data);
	};

	return (
		<div className="min-h-screen bg-gray-50">
			<div className="fixed top-0 left-0 h-full w-1 bg-red-600 z-10" />

			<div className="px-6 pt-8 pb-8 max-w-7xl mx-auto">
				<TopBar
					title="All Leads"
					showAddLead={true}
					onAddLead={() => setShowLeadForm(true)}
				/>

				{showLeadForm && (
					<LeadForm
						onClose={() => {
							setShowLeadForm(false);
							fetchLeads();
						}}
					/>
				)}
				{/* Table Card */}
				<div className="bg-white border-2 border-black shadow-[4px_4px_0px_#000]">
					{/* Table Header */}
					<div className="grid grid-cols-5 border-b-2 border-black bg-black">
						{["Name", "Phone", "Source", "Status", "Agent"].map((col) => (
							<div
								key={col}
								className="px-5 py-3 text-xs font-black uppercase tracking-widest text-white"
							>
								{col}
							</div>
						))}
					</div>

					{/* Rows */}
					{leads.length === 0 ? (
						<div className="flex items-center justify-center py-16 gap-3">
							<div className="w-3 h-3 bg-red-600 animate-bounce" />
							<span className="text-xs font-black uppercase tracking-widest text-gray-300">
								No leads found
							</span>
						</div>
					) : (
						leads.map((lead, index) => (
							<div
								key={lead._id}
								className={`grid grid-cols-5 border-b border-gray-100 transition-all duration-150 hover:bg-gray-50 hover:border-l-4 hover:border-l-red-600 group
                  ${index % 2 === 0 ? "bg-white" : "bg-gray-50/50"}`}
							>
								<div className="px-5 py-4 text-sm font-black text-black uppercase tracking-wide">
									{lead.name}
								</div>
								<div className="px-5 py-4 text-sm font-medium text-gray-500 flex items-center">
									{lead.phone}
								</div>
								<div className="px-5 py-4 text-sm font-black text-gray-400 uppercase tracking-widest flex items-center">
									{lead.source}
								</div>
								<div className="px-5 py-4 flex items-center">
									<span
										className={`text-xs font-black uppercase tracking-widest px-3 py-1 border-2 border-black shadow-[2px_2px_0px_#000]
                    ${statusColors[lead.status] ?? "bg-gray-100 text-black"}`}
									>
										{lead.status}
									</span>
								</div>
								<div className="px-5 py-4 text-sm font-medium text-gray-500 flex items-center">
									{lead.assignedAgent}
								</div>
							</div>
						))
					)}

					{/* Footer count */}
					{leads.length > 0 && (
						<div className="px-5 py-3 border-t-2 border-black bg-white flex items-center justify-between">
							<div className="flex items-center gap-2">
								<div className="w-2 h-2 bg-red-600" />
								<span className="text-xs font-black uppercase tracking-widest text-gray-400">
									Total
								</span>
							</div>
							<span className="text-xs font-black uppercase tracking-widest text-black">
								{leads.length} Leads
							</span>
						</div>
					)}
				</div>
			</div>
		</div>
	);
};

export default Leads;
