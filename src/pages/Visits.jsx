import { useEffect, useState } from "react";
import { getVisits, updateVisit, updateLead } from "../services/api";
import TopBar from "../components/Topbar.jsx";
import VisitForm from "./VisitForm.jsx";

const outcomeToLeadStatus = {
	Visited: "Visit Completed",
	Interested: "Property Suggested",
	"Not Interested": "Lost",
};

const outcomeConfig = {
	Visited: { bg: "bg-black text-white" },
	Interested: { bg: "bg-red-600 text-white" },
	"Not Interested": { bg: "bg-gray-100 text-black" },
};

const CalendarIcon = () => (
	<svg
		width="12"
		height="12"
		viewBox="0 0 24 24"
		fill="none"
		stroke="currentColor"
		strokeWidth="2.5"
		strokeLinecap="round"
		strokeLinejoin="round"
	>
		<rect x="3" y="4" width="18" height="18" rx="2" />
		<line x1="16" y1="2" x2="16" y2="6" />
		<line x1="8" y1="2" x2="8" y2="6" />
		<line x1="3" y1="10" x2="21" y2="10" />
	</svg>
);

const BuildingIcon = () => (
	<svg
		width="12"
		height="12"
		viewBox="0 0 24 24"
		fill="none"
		stroke="currentColor"
		strokeWidth="2.5"
		strokeLinecap="round"
		strokeLinejoin="round"
	>
		<path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
		<polyline points="9 22 9 12 15 12 15 22" />
	</svg>
);

const Visits = () => {
	const [visits, setVisits] = useState([]);
	const [outcomes, setOutcomes] = useState({});
	const [showVisitForm, setShowVisitForm] = useState(false);

	useEffect(() => {
		fetchVisits();
	}, []);

	const fetchVisits = async () => {
		try {
			const res = await getVisits();
			setVisits(res.data.data);
		} catch (error) {
			console.error(error);
		}
	};

	const handleOutcomeChange = async (visitId, outcome) => {
		setOutcomes((prev) => ({ ...prev, [visitId]: outcome }));
		try {
			await updateVisit(visitId, { outcome }); // backend handles lead sync
			fetchVisits();
		} catch (err) {
			console.error(err);
		}
	};
	const upcoming = visits.filter((v) => !v.outcome);
	const completed = visits.filter((v) => v.outcome);

	return (
		<div className="min-h-screen bg-gray-50">
			<div className="fixed top-0 left-0 h-full w-1 bg-red-600 z-10" />

			<div className="pl-8 pr-8 pt-8 pb-12 max-w-7xl mx-auto">
				<TopBar
					title="Visits"
					showScheduleVisit
					onScheduleVisit={() => setShowVisitForm(true)}
				/>

				{/* ── UPCOMING ── */}
				<div className="mb-10">
					<div className="flex items-center justify-between mb-5">
						<div className="flex items-center gap-3">
							<div className="w-1 h-6 bg-red-600" />
							<h2 className="text-xs font-black uppercase tracking-[4px] text-black">
								Upcoming Visits
							</h2>
						</div>
						<div className="flex items-center gap-2 bg-white border-2 border-black px-3 py-1 shadow-[2px_2px_0px_#000]">
							<div className="w-1.5 h-1.5 bg-red-600" />
							<span className="text-xs font-black uppercase tracking-widest">
								{upcoming.length} Pending
							</span>
						</div>
					</div>

					{upcoming.length === 0 ? (
						<div className="bg-white border-2 border-dashed border-gray-200 flex flex-col items-center justify-center py-12 gap-2">
							<div className="w-2 h-2 bg-gray-200" />
							<span className="text-xs font-black uppercase tracking-widest text-gray-300">
								No upcoming visits
							</span>
						</div>
					) : (
						<div className="grid grid-cols-3 gap-4">
							{upcoming.map((visit) => (
								<div
									key={visit._id}
									className="bg-white border-2 border-black shadow-[4px_4px_0px_#000] hover:-translate-y-0.5 hover:shadow-[5px_5px_0px_#000] transition-all duration-150"
								>
									<div className="h-1 w-full bg-red-600" />
									<div className="p-5">
										<div className="flex items-start justify-between gap-2 mb-4">
											<div>
												<p className="text-xs font-black uppercase tracking-[3px] text-red-600 mb-1">
													Lead
												</p>
												<h3 className="text-base font-black uppercase tracking-wide text-black leading-tight">
													{visit.lead?.name}
												</h3>
											</div>
											<div className="w-8 h-8 bg-black flex items-center justify-center shrink-0">
												<span className="text-white text-xs font-black">
													{visit.lead?.name?.charAt(0).toUpperCase()}
												</span>
											</div>
										</div>

										<div className="flex items-center gap-2 mb-2 pb-4 border-b border-gray-100">
											<span className="text-gray-400">
												<BuildingIcon />
											</span>
											<span className="text-xs font-medium text-gray-500 tracking-wide truncate">
												{visit.propertyName}
											</span>
										</div>

										<div className="flex items-center gap-2 mb-5">
											<span className="text-gray-400">
												<CalendarIcon />
											</span>
											<span className="text-xs font-black text-black tracking-wide">
												{new Date(visit.visitDate).toLocaleString()}
											</span>
										</div>

										{/* ✅ Pass visit.lead?._id here */}
										<div className="relative">
											<select
												value={outcomes[visit._id] || ""}
												onChange={(e) =>
													handleOutcomeChange(
														visit._id,
														e.target.value,
														visit.lead?._id,
													)
												}
												className="w-full appearance-none bg-white border-2 border-black shadow-[2px_2px_0px_#000] px-4 py-2.5 text-xs font-black uppercase tracking-widest text-black outline-none cursor-pointer hover:bg-black hover:text-white transition-all duration-150 pr-8"
											>
												<option value="">Record Outcome...</option>
												<option value="Visited">Visited</option>
												<option value="Interested">Interested</option>
												<option value="Not Interested">Not Interested</option>
											</select>
											<div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
												<svg
													width="10"
													height="10"
													viewBox="0 0 24 24"
													fill="none"
													stroke="currentColor"
													strokeWidth="3"
													strokeLinecap="round"
													strokeLinejoin="round"
												>
													<polyline points="6 9 12 15 18 9" />
												</svg>
											</div>
										</div>
									</div>
								</div>
							))}
						</div>
					)}
				</div>

				{/* ── COMPLETED ── */}
				<div>
					<div className="flex items-center justify-between mb-5">
						<div className="flex items-center gap-3">
							<div className="w-1 h-6 bg-black" />
							<h2 className="text-xs font-black uppercase tracking-[4px] text-black">
								Completed Visits
							</h2>
						</div>
						<div className="flex items-center gap-2 bg-white border-2 border-black px-3 py-1 shadow-[2px_2px_0px_#000]">
							<div className="w-1.5 h-1.5 bg-black" />
							<span className="text-xs font-black uppercase tracking-widest">
								{completed.length} Done
							</span>
						</div>
					</div>

					{completed.length === 0 ? (
						<div className="bg-white border-2 border-dashed border-gray-200 flex flex-col items-center justify-center py-12 gap-2">
							<div className="w-2 h-2 bg-gray-200" />
							<span className="text-xs font-black uppercase tracking-widest text-gray-300">
								No completed visits
							</span>
						</div>
					) : (
						<div className="bg-white border-2 border-black shadow-[4px_4px_0px_#000]">
							<div className="grid grid-cols-4 bg-black border-b-2 border-black">
								{["Lead", "Property", "Date & Time", "Outcome"].map((col) => (
									<div
										key={col}
										className="px-5 py-3 text-xs font-black uppercase tracking-widest text-white"
									>
										{col}
									</div>
								))}
							</div>

							{completed.map((visit, index) => {
								const oc = outcomeConfig[visit.outcome] ?? {
									bg: "bg-gray-100 text-black",
								};
								return (
									<div
										key={visit._id}
										className={`grid grid-cols-4 border-b border-gray-100 hover:border-l-4 hover:border-l-red-600 transition-all duration-150 ${index % 2 === 0 ? "bg-white" : "bg-gray-50/50"}`}
									>
										<div className="px-5 py-4 flex items-center gap-2">
											<div className="w-6 h-6 bg-black flex items-center justify-center shrink-0">
												<span className="text-white text-xs font-black leading-none">
													{visit.lead?.name?.charAt(0).toUpperCase()}
												</span>
											</div>
											<span className="text-sm font-black text-black uppercase tracking-wide">
												{visit.lead?.name}
											</span>
										</div>
										<div className="px-5 py-4 flex items-center">
											<span className="text-sm text-gray-500 font-medium">
												{visit.propertyName}
											</span>
										</div>
										<div className="px-5 py-4 flex items-center">
											<span className="text-xs font-black text-black tracking-wide">
												{new Date(visit.visitDate).toLocaleString()}
											</span>
										</div>
										<div className="px-5 py-4 flex items-center">
											<span
												className={`text-xs font-black uppercase tracking-widest px-3 py-1 border-2 border-black shadow-[2px_2px_0px_#000] ${oc.bg}`}
											>
												{visit.outcome}
											</span>
										</div>
									</div>
								);
							})}

							<div className="px-5 py-3 bg-white border-t-2 border-black flex items-center justify-between">
								<div className="flex items-center gap-2">
									<div className="w-2 h-2 bg-red-600" />
									<span className="text-xs font-black uppercase tracking-widest text-gray-400">
										Total
									</span>
								</div>
								<span className="text-xs font-black uppercase tracking-widest text-black">
									{completed.length} Visits
								</span>
							</div>
						</div>
					)}
				</div>

				<div className="mt-10 pt-5 border-t border-gray-200 flex items-center justify-between">
					<div className="flex items-center gap-3">
						<div className="w-1 h-4 bg-red-600" />
						<span className="text-xs font-black uppercase tracking-[4px] text-gray-300">
							Gharpayy CRM
						</span>
					</div>
					<div className="flex gap-1">
						<div className="w-2 h-2 bg-red-600" />
						<div className="w-2 h-2 bg-black" />
					</div>
				</div>
			</div>

			{showVisitForm && (
				<VisitForm
					onClose={() => {
						setShowVisitForm(false);
						fetchVisits();
					}}
				/>
			)}
		</div>
	);
};

export default Visits;
