import { Link, useLocation } from "react-router-dom";

const Navbar = () => {
	const { pathname } = useLocation();

	const links = [
		{ to: "/", label: "Dashboard" },
		{ to: "/pipeline", label: "Pipeline" },
		{ to: "/lead", label: "Add Lead" },
		{ to: "/visits", label: "Visits" },
	];

	return (
		<nav className="bg-white border-b-2 border-black shadow-[0px_4px_0px_#000] px-8 py-0 flex justify-between items-center sticky top-0 z-40">
			{/* Logo */}
			<div className="flex items-center gap-3 py-4">
				<div className="w-1 h-6 bg-red-600" />
				<div>
					<span className="text-xs font-black uppercase tracking-[3px] text-red-600">
						CRM
					</span>
					<h1 className="text-base font-black uppercase tracking-tight text-black leading-none">
						Gharpayy
					</h1>
				</div>
			</div>

			{/* Links */}
			<div className="flex h-full">
				{links.map((link) => {
					const isActive = pathname === link.to;
					return (
						<Link
							key={link.to}
							to={link.to}
							className={`relative flex items-center px-6 py-5 text-xs font-black uppercase tracking-widest transition-all duration-150 border-l-2 border-black
                ${
									isActive
										? "bg-red-600 text-white"
										: "text-black hover:bg-black hover:text-white"
								}`}
						>
							{link.label}
							{isActive && (
								<span className="absolute bottom-0 left-0 right-0 h-0.5 bg-red-400" />
							)}
						</Link>
					);
				})}
			</div>
		</nav>
	);
};

export default Navbar;
