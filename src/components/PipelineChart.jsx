import {
	BarChart,
	Bar,
	XAxis,
	YAxis,
	Tooltip,
	ResponsiveContainer,
	Cell,
} from "recharts";

const CustomTooltip = ({ active, payload, label }) => {
	if (active && payload && payload.length) {
		return (
			<div className="bg-white border-2 border-black shadow-[3px_3px_0px_#000] px-4 py-2">
				<p className="text-xs font-black uppercase tracking-widest text-red-600">
					{label}
				</p>
				<p className="text-xl font-black text-black">{payload[0].value}</p>
				<p className="text-xs font-black uppercase tracking-widest text-gray-400">
					Leads
				</p>
			</div>
		);
	}
	return null;
};

const PipelineChart = ({ data }) => {
	return (
		<div className="bg-white border-2 border-black shadow-[4px_4px_0px_#000] p-6 mt-6">
			{/* Header */}
			<div className="flex items-center justify-between mb-6 pb-4 border-b-2 border-black">
				<div className="flex items-center gap-2">
					<div className="w-3 h-3 bg-red-600" />
					<h2 className="text-xs font-black uppercase tracking-widest text-black">
						Pipeline Distribution
					</h2>
				</div>
				<span className="text-xs font-black uppercase tracking-widest text-gray-300">
					All Stages
				</span>
			</div>

			<ResponsiveContainer width="100%" height={280}>
				<BarChart data={data} barCategoryGap="35%">
					<XAxis
						dataKey="_id"
						axisLine={{ stroke: "#000", strokeWidth: 2 }}
						tickLine={false}
						tick={{
							fontSize: 11,
							fontWeight: 900,
							fill: "#000",
							textTransform: "uppercase",
							letterSpacing: 2,
						}}
					/>
					<YAxis
						axisLine={{ stroke: "#000", strokeWidth: 2 }}
						tickLine={false}
						tick={{ fontSize: 11, fontWeight: 900, fill: "#9ca3af" }}
						width={32}
					/>
					<Tooltip
						content={<CustomTooltip />}
						cursor={{ fill: "rgba(0,0,0,0.04)" }}
					/>
					<Bar dataKey="count" radius={0}>
						{data.map((entry, index) => (
							<Cell
								key={`cell-${index}`}
								fill={
									index === 0
										? "#dc2626"
										: index === data.length - 1
											? "#000000"
											: "#1a1a1a"
								}
								stroke="#000"
								strokeWidth={2}
							/>
						))}
					</Bar>
				</BarChart>
			</ResponsiveContainer>
		</div>
	);
};

export default PipelineChart;
