import { Link, useLocation } from "react-router-dom";

const Sidebar = () => {
	const { pathname } = useLocation();

	const links = [
		{ to: "/", label: "Dashboard", icon: "▪" },
		{ to: "/leads", label: "Leads", icon: "▪" },
		{ to: "/pipeline", label: "Pipeline", icon: "▪" },
		{ to: "/visits", label: "Visits", icon: "▪" },
	];

	return (
		<div className="w-56 h-screen bg-white border-r-2 border-black flex flex-col sticky top-0">
			{/* Logo */}
			<div className="px-6 py-5 border-b-2 border-black">
				<span className="text-xs font-black uppercase tracking-[3px] text-red-600">
					CRM
				</span>
				<h1 className="text-lg font-black uppercase tracking-tight text-black leading-none">
					Gharpayy
				</h1>
			</div>

			{/* Red accent line */}
			<div className="h-1 w-full bg-red-600" />

			{/* Nav Links */}
			<div className="flex flex-col mt-4 flex-1">
				{links.map((link) => {
					const isActive = pathname === link.to;
					return (
						<Link
							key={link.to}
							to={link.to}
							className={`flex items-center gap-3 px-6 py-4 text-xs font-black uppercase tracking-widest border-b border-gray-100 transition-all duration-150
                ${
									isActive
										? "bg-red-600 text-white border-l-4 border-l-black"
										: "text-black hover:bg-black hover:text-white"
								}`}
						>
							<span
								className={`text-base leading-none ${isActive ? "text-white" : "text-red-600"}`}
							>
								{link.icon}
							</span>
							{link.label}
						</Link>
					);
				})}
			</div>

			{/* Footer */}
			<div className="px-6 py-4 border-t-2 border-black">
				<div className="flex gap-1 mb-1">
					<div className="w-2 h-2 bg-red-600" />
					<div className="w-2 h-2 bg-black" />
				</div>
				<p className="text-xs font-black uppercase tracking-widest text-gray-300">
					Lead Mgmt
				</p>
			</div>
		</div>
	);
};

export default Sidebar;
