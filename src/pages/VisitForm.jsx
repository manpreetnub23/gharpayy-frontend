import { useState, useEffect } from "react";
import { getLeads, scheduleVisit } from "../services/api";

const CalendarIcon = () => (
	<svg
		width="14"
		height="14"
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
		width="14"
		height="14"
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

const UserIcon = () => (
	<svg
		width="14"
		height="14"
		viewBox="0 0 24 24"
		fill="none"
		stroke="currentColor"
		strokeWidth="2.5"
		strokeLinecap="round"
		strokeLinejoin="round"
	>
		<path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
		<circle cx="12" cy="7" r="4" />
	</svg>
);

const StaffIcon = () => (
	<svg
		width="14"
		height="14"
		viewBox="0 0 24 24"
		fill="none"
		stroke="currentColor"
		strokeWidth="2.5"
		strokeLinecap="round"
		strokeLinejoin="round"
	>
		<path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
		<circle cx="9" cy="7" r="4" />
		<path d="M23 21v-2a4 4 0 0 0-3-3.87" />
		<path d="M16 3.13a4 4 0 0 1 0 7.75" />
	</svg>
);

const ChevronIcon = () => (
	<svg
		width="12"
		height="12"
		viewBox="0 0 24 24"
		fill="none"
		stroke="currentColor"
		strokeWidth="3"
		strokeLinecap="round"
		strokeLinejoin="round"
	>
		<polyline points="6 9 12 15 18 9" />
	</svg>
);

const PROPERTIES = [
	"CloudNine PG",
	"Comfort Zone PG",
	"Gharpayy Heights - Marathahalli",
	"Gharpayy Homes - BTM",
	"Gharpayy Nest - Electronic City",
	"Gharpayy Residency - Indiranagar",
	"Gharpayy Villa - Whitefield",
	"Green Valley PG",
	"Heritage PG Homes",
	"Lakeview Women's PG",
	"Maple Residency",
	"Phoenix Ladies PG",
	"Skyline Premium PG",
	"Sunrise PG for Men",
	"TechNest Co-Living",
	"Urban Nest Coliving",
	"Zenith Co-Living Hub",
];

const STAFF = ["Anita Desai", "Priya Sharma", "Rahul Verma", "Vikram Singh"];

const VisitForm = ({ onClose }) => {
	const [formData, setFormData] = useState({
		lead: "",
		propertyName: "",
		assignedStaff: "",
		visitDate: "",
	});
	const [focused, setFocused] = useState(null);
	const [submitted, setSubmitted] = useState(false);
	const [loading, setLoading] = useState(false);
	const [leads, setLeads] = useState([]);

	useEffect(() => {
		getLeads()
			.then((res) => setLeads(res.data.data))
			.catch(console.error);
	}, []);

	const handleChange = (e) =>
		setFormData({ ...formData, [e.target.name]: e.target.value });

	const handleSubmit = async (e) => {
		e.preventDefault();
		setLoading(true);
		try {
			await scheduleVisit(formData);
			setSubmitted(true);
			setTimeout(() => {
				setSubmitted(false);
				setFormData({
					lead: "",
					propertyName: "",
					assignedStaff: "",
					visitDate: "",
				});
				if (onClose) onClose();
			}, 1200);
		} catch (err) {
			console.error(err);
		} finally {
			setLoading(false);
		}
	};

	const filledCount = Object.values(formData).filter(Boolean).length;

	const selectClass = (name) =>
		`w-full appearance-none bg-white text-black px-4 py-3 text-sm outline-none font-medium border-2 transition-all duration-150 pr-10
    ${
			focused === name
				? "border-red-600 shadow-[3px_3px_0px_#dc2626]"
				: "border-gray-200 hover:border-black shadow-[3px_3px_0px_#e5e7eb] hover:shadow-[3px_3px_0px_#000]"
		}`;

	return (
		<div
			className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 px-4"
			onClick={(e) => e.target === e.currentTarget && onClose?.()}
		>
			<div className="relative w-full max-w-lg bg-white border-2 border-black shadow-[8px_8px_0px_#000]">
				{/* Two-tone top bar */}
				<div className="flex h-1.5">
					<div className="w-1/2 bg-red-600" />
					<div className="w-1/2 bg-black" />
				</div>

				{submitted ? (
					<div className="flex flex-col items-center justify-center py-16 gap-4">
						<div className="w-16 h-16 bg-red-600 border-2 border-black shadow-[3px_3px_0px_#000] flex items-center justify-center">
							<svg
								width="28"
								height="28"
								viewBox="0 0 24 24"
								fill="none"
								stroke="white"
								strokeWidth="3.5"
								strokeLinecap="round"
								strokeLinejoin="round"
							>
								<polyline points="20 6 9 17 4 12" />
							</svg>
						</div>
						<div className="text-center">
							<p className="text-black font-black tracking-widest uppercase text-sm">
								Visit Scheduled
							</p>
							<p className="text-gray-400 text-xs font-medium mt-1 tracking-wide">
								Successfully added to visits
							</p>
						</div>
					</div>
				) : (
					<div className="p-8">
						{/* Header */}
						<div className="flex items-start justify-between mb-8">
							<div>
								<div className="flex items-center gap-2 mb-2">
									<div className="w-6 h-0.5 bg-red-600" />
									<span className="text-xs font-black tracking-[4px] text-red-600 uppercase">
										New Visit
									</span>
								</div>
								<h2 className="text-2xl font-black text-black tracking-tight uppercase leading-none">
									Schedule Visit
								</h2>
								<p className="text-xs text-gray-400 font-medium mt-1.5 tracking-wide">
									Fill in the visit details below
								</p>
							</div>
							<button
								onClick={onClose}
								className="w-9 h-9 border-2 border-black flex items-center justify-center text-black hover:bg-black hover:text-white transition-all duration-150 font-black text-sm shadow-[2px_2px_0px_#000] hover:shadow-none hover:translate-x-0.5 hover:translate-y-0.5"
							>
								✕
							</button>
						</div>

						<form onSubmit={handleSubmit}>
							<div className="space-y-4 mb-6">
								{/* Lead */}
								<div>
									<label className="flex items-center gap-1.5 text-xs font-black tracking-widest text-black uppercase mb-2">
										<span className="text-gray-400">
											<UserIcon />
										</span>
										Lead <span className="text-red-600 ml-0.5">*</span>
									</label>
									<div className="relative">
										<select
											name="lead"
											value={formData.lead}
											onChange={handleChange}
											onFocus={() => setFocused("lead")}
											onBlur={() => setFocused(null)}
											required
											className={selectClass("lead")}
										>
											<option value="">Select lead</option>
											{leads.map((lead) => (
												<option key={lead._id} value={lead._id}>
													{lead.name} — {lead.phone}
												</option>
											))}
										</select>
										<div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400">
											<ChevronIcon />
										</div>
									</div>
								</div>

								{/* Property */}
								<div>
									<label className="flex items-center gap-1.5 text-xs font-black tracking-widest text-black uppercase mb-2">
										<span className="text-gray-400">
											<BuildingIcon />
										</span>
										Property <span className="text-red-600 ml-0.5">*</span>
									</label>
									<div className="relative">
										<select
											name="propertyName"
											value={formData.propertyName}
											onChange={handleChange}
											onFocus={() => setFocused("propertyName")}
											onBlur={() => setFocused(null)}
											required
											className={selectClass("propertyName")}
										>
											<option value="">Select property</option>
											{PROPERTIES.map((p) => (
												<option key={p} value={p}>
													{p}
												</option>
											))}
										</select>
										<div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400">
											<ChevronIcon />
										</div>
									</div>
								</div>

								{/* Staff + Date */}
								<div className="grid grid-cols-2 gap-4">
									<div>
										<label className="flex items-center gap-1.5 text-xs font-black tracking-widest text-black uppercase mb-2">
											<span className="text-gray-400">
												<StaffIcon />
											</span>
											Assign Staff
										</label>
										<div className="relative">
											<select
												name="assignedStaff"
												value={formData.assignedStaff}
												onChange={handleChange}
												onFocus={() => setFocused("assignedStaff")}
												onBlur={() => setFocused(null)}
												className={selectClass("assignedStaff")}
											>
												<option value="">Select staff</option>
												{STAFF.map((s) => (
													<option key={s} value={s}>
														{s}
													</option>
												))}
											</select>
											<div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400">
												<ChevronIcon />
											</div>
										</div>
									</div>

									<div>
										<label className="flex items-center gap-1.5 text-xs font-black tracking-widest text-black uppercase mb-2">
											<span className="text-gray-400">
												<CalendarIcon />
											</span>
											Date & Time <span className="text-red-600 ml-0.5">*</span>
										</label>
										<input
											type="datetime-local"
											name="visitDate"
											value={formData.visitDate}
											onChange={handleChange}
											onFocus={() => setFocused("visitDate")}
											onBlur={() => setFocused(null)}
											required
											className={`w-full bg-white text-black px-4 py-3 text-sm outline-none font-medium border-2 transition-all duration-150
                        ${
													focused === "visitDate"
														? "border-red-600 shadow-[3px_3px_0px_#dc2626]"
														: "border-gray-200 hover:border-black shadow-[3px_3px_0px_#e5e7eb] hover:shadow-[3px_3px_0px_#000]"
												}`}
										/>
									</div>
								</div>
							</div>

							{/* Progress bar */}
							<div className="mb-6">
								<div className="flex justify-between mb-1.5">
									<span className="text-xs font-black uppercase tracking-widest text-gray-400">
										Completion
									</span>
									<span className="text-xs font-black text-black">
										{filledCount}/4
									</span>
								</div>
								<div className="h-1.5 bg-gray-100 border border-gray-200">
									<div
										className="h-full bg-red-600 transition-all duration-300"
										style={{ width: `${(filledCount / 4) * 100}%` }}
									/>
								</div>
							</div>

							<div className="h-px bg-gray-100 mb-6" />

							<div className="flex gap-3">
								<button
									type="submit"
									disabled={loading}
									className="flex-1 bg-red-600 hover:bg-red-700 active:shadow-none active:translate-x-0.5 active:translate-y-0.5 text-white font-black py-3 px-6 uppercase tracking-widest text-xs transition-all duration-150 border-2 border-black shadow-[3px_3px_0px_#000] flex items-center justify-center gap-2 disabled:opacity-60"
								>
									<CalendarIcon />
									{loading ? "Scheduling..." : "Schedule Visit"}
								</button>
								<button
									type="button"
									onClick={onClose}
									className="px-6 py-3 border-2 border-black text-black hover:bg-black hover:text-white active:shadow-none active:translate-x-0.5 active:translate-y-0.5 transition-all duration-150 text-xs font-black uppercase tracking-widest shadow-[3px_3px_0px_#000]"
								>
									Cancel
								</button>
							</div>
						</form>
					</div>
				)}
			</div>
		</div>
	);
};

export default VisitForm;
