const TopBar = ({
	title,
	showAddLead = false,
	showScheduleVisit = false,
	onAddLead,
	onScheduleVisit,
}) => {
	return (
		<div className="flex justify-between items-center mb-6">
			<h1 className="text-2xl font-bold">{title}</h1>

			<div className="flex gap-3">
				{showAddLead && (
					<button
						onClick={onAddLead}
						className="bg-black text-white px-4 py-2 rounded"
					>
						+ Add Lead
					</button>
				)}

				{showScheduleVisit && (
					<button
						onClick={onScheduleVisit}
						className="bg-black text-white px-4 py-2 rounded"
					>
						+ Schedule Visit
					</button>
				)}
			</div>
		</div>
	);
};

export default TopBar;
