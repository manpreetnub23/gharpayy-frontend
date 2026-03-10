import { useEffect, useState } from "react";
import { getDashboardStats } from "../services/api";
import LeadForm from "../pages/LeadForm.jsx";
import StatCard from "../components/StatCard.jsx";
import PipelineChart from "../components/PipelineChart.jsx";
import TopBar from "../components/Topbar.jsx";

const TrendIcon = () => (
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
		<polyline points="23 6 13.5 15.5 8.5 10.5 1 18" />
		<polyline points="17 6 23 6 23 12" />
	</svg>
);

const Dashboard = () => {
	const [stats, setStats] = useState(null);
	const [showLeadForm, setShowLeadForm] = useState(false);

	useEffect(() => {
		fetchStats();
	}, []);

	const fetchStats = async () => {
		const res = await getDashboardStats();
		setStats(res.data.data);
	};

	if (!stats)
		return (
			<div className="min-h-screen bg-gray-50 flex items-center justify-center">
				<div className="flex flex-col items-center gap-4">
					<div className="flex gap-1.5">
						<div
							className="w-2 h-2 bg-red-600 animate-bounce"
							style={{ animationDelay: "0ms" }}
						/>
						<div
							className="w-2 h-2 bg-black animate-bounce"
							style={{ animationDelay: "150ms" }}
						/>
						<div
							className="w-2 h-2 bg-gray-300 animate-bounce"
							style={{ animationDelay: "300ms" }}
						/>
					</div>
					<span className="text-xs font-black uppercase tracking-[4px] text-gray-400">
						Loading Dashboard
					</span>
				</div>
			</div>
		);

	const date = new Date().toLocaleDateString("en-US", {
		weekday: "long",
		year: "numeric",
		month: "long",
		day: "numeric",
	});

	return (
		<div className="min-h-screen bg-gray-50">
			{/* Left red strip */}
			<div className="fixed top-0 left-0 h-full w-1 bg-red-600 z-10" />

			<div className="pl-8 pr-8 pt-8 pb-12 max-w-7xl mx-auto">
				{/* TopBar */}
				<TopBar
					title="Dashboard"
					showAddLead={false}
					onAddLead={() => setShowLeadForm(true)}
				/>

				{/* Date + Summary Row */}
				<div className="flex items-center justify-between mb-6 -mt-2">
					<p className="text-xs font-medium text-gray-400 tracking-widest uppercase">
						{date}
					</p>
					{/* <div className="flex items-center gap-1.5 bg-white border-2 border-black px-3 py-1.5 shadow-[2px_2px_0px_#000]">
						<div className="w-1.5 h-1.5 bg-green-500" />
						<span className="text-xs font-black uppercase tracking-widest text-black">
							Live
						</span>
					</div> */}
				</div>

				{/* Stats Grid */}
				<div className="grid grid-cols-5 gap-4 mb-6">
					<StatCard title="Total Leads" value={stats.totalLeads} accent />
					<StatCard title="Visits Scheduled" value={stats.visitsScheduled} />
					<StatCard title="Bookings Closed" value={stats.bookingsClosed} />
					<StatCard
						title="Conversion Rate"
						value={`${stats.conversionRate}%`}
					/>
					<StatCard title="New Today" value={stats.newToday} />
				</div>

				{/* Quick Insights Row */}
				<div className="grid grid-cols-3 gap-4 mb-6">
					{/* Insight 1 */}
					<div className="bg-white border-2 border-black shadow-[3px_3px_0px_#000] p-4 flex items-center gap-4">
						<div className="w-10 h-10 bg-red-600 border-2 border-black flex items-center justify-center shrink-0">
							<TrendIcon />
						</div>
						<div>
							<p className="text-xs font-black uppercase tracking-widest text-gray-400 mb-0.5">
								Pipeline Health
							</p>
							<p className="text-lg font-black text-black leading-none">
								{stats.bookingsClosed && stats.totalLeads
									? `${((stats.bookingsClosed / stats.totalLeads) * 100).toFixed(1)}%`
									: "—"}
							</p>
							<p className="text-xs text-gray-400 font-medium mt-0.5">
								Close rate
							</p>
						</div>
					</div>

					{/* Insight 2 */}
					<div className="bg-white border-2 border-black shadow-[3px_3px_0px_#000] p-4 flex items-center gap-4">
						<div className="w-10 h-10 bg-black border-2 border-black flex items-center justify-center shrink-0">
							<svg
								width="14"
								height="14"
								viewBox="0 0 24 24"
								fill="none"
								stroke="white"
								strokeWidth="2.5"
								strokeLinecap="round"
								strokeLinejoin="round"
							>
								<rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
								<line x1="16" y1="2" x2="16" y2="6" />
								<line x1="8" y1="2" x2="8" y2="6" />
								<line x1="3" y1="10" x2="21" y2="10" />
							</svg>
						</div>
						<div>
							<p className="text-xs font-black uppercase tracking-widest text-gray-400 mb-0.5">
								Scheduled
							</p>
							<p className="text-lg font-black text-black leading-none">
								{stats.visitsScheduled}
							</p>
							<p className="text-xs text-gray-400 font-medium mt-0.5">
								Upcoming visits
							</p>
						</div>
					</div>

					{/* Insight 3 */}
					<div className="bg-white border-2 border-black shadow-[3px_3px_0px_#000] p-4 flex items-center gap-4">
						<div className="w-10 h-10 bg-gray-100 border-2 border-black flex items-center justify-center shrink-0">
							<svg
								width="14"
								height="14"
								viewBox="0 0 24 24"
								fill="none"
								stroke="black"
								strokeWidth="2.5"
								strokeLinecap="round"
								strokeLinejoin="round"
							>
								<path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
								<circle cx="9" cy="7" r="4" />
								<path d="M23 21v-2a4 4 0 0 0-3-3.87" />
								<path d="M16 3.13a4 4 0 0 1 0 7.75" />
							</svg>
						</div>
						<div>
							<p className="text-xs font-black uppercase tracking-widest text-gray-400 mb-0.5">
								New Today
							</p>
							<p className="text-lg font-black text-black leading-none">
								{stats.newToday}
							</p>
							<p className="text-xs text-gray-400 font-medium mt-0.5">
								Fresh leads
							</p>
						</div>
					</div>
				</div>

				{/* Chart */}
				<PipelineChart data={stats.pipelineDistribution} />

				{/* Footer */}
				<div className="mt-8 pt-5 border-t border-gray-200 flex items-center justify-between">
					<div className="flex items-center gap-3">
						<div className="w-1 h-4 bg-red-600" />
						<span className="text-xs font-black uppercase tracking-[4px] text-gray-300">
							Gharpayy CRM
						</span>
					</div>
					<div className="flex items-center gap-4">
						<span className="text-xs font-medium text-gray-300 tracking-wide">
							Lead Management System
						</span>
						<div className="flex gap-1">
							<div className="w-2 h-2 bg-red-600" />
							<div className="w-2 h-2 bg-black" />
						</div>
					</div>
				</div>
			</div>

			{showLeadForm && <LeadForm onClose={() => setShowLeadForm(false)} />}
		</div>
	);
};

export default Dashboard;
