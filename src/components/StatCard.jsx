const StatCard = ({ title, value, accent }) => {
	return (
		<div
			className={`border-2 border-black shadow-[4px_4px_0px_#000] p-5 transition-all duration-150 hover:-translate-y-0.5 hover:shadow-[6px_6px_0px_#000]
      ${accent ? "bg-red-600" : "bg-white"}`}
		>
			<p
				className={`text-xs font-black uppercase tracking-widest mb-2
        ${accent ? "text-red-200" : "text-gray-400"}`}
			>
				{title}
			</p>

			<h2
				className={`text-3xl font-black tracking-tight
        ${accent ? "text-white" : "text-black"}`}
			>
				{value}
			</h2>

			<div
				className={`h-0.5 mt-3 w-8 ${accent ? "bg-red-400" : "bg-red-600"}`}
			/>
		</div>
	);
};

export default StatCard;
