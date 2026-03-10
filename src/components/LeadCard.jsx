const PhoneIcon = () => (
	<svg
		xmlns="http://www.w3.org/2000/svg"
		width="11"
		height="11"
		viewBox="0 0 24 24"
		fill="none"
		stroke="currentColor"
		strokeWidth="3"
		strokeLinecap="round"
		strokeLinejoin="round"
	>
		<path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.61 3.41 2 2 0 0 1 3.6 1.23h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.84a16 16 0 0 0 6 6l.92-.92a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 21.73 16.92z" />
	</svg>
);

const WhatsAppIcon = () => (
	<svg
		xmlns="http://www.w3.org/2000/svg"
		width="11"
		height="11"
		viewBox="0 0 24 24"
		fill="currentColor"
	>
		<path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
		<path d="M12 0C5.373 0 0 5.373 0 12c0 2.123.554 4.112 1.522 5.847L.057 23.882a.5.5 0 0 0 .623.595l6.218-1.634A11.945 11.945 0 0 0 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-1.891 0-3.667-.523-5.188-1.435l-.372-.22-3.853 1.013 1.036-3.742-.242-.386A9.959 9.959 0 0 1 2 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z" />
	</svg>
);

const LocationIcon = () => (
	<svg
		xmlns="http://www.w3.org/2000/svg"
		width="11"
		height="11"
		viewBox="0 0 24 24"
		fill="none"
		stroke="currentColor"
		strokeWidth="2.5"
		strokeLinecap="round"
		strokeLinejoin="round"
	>
		<path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
		<circle cx="12" cy="10" r="3" />
	</svg>
);

const LeadCard = ({ lead }) => {
	return (
		<div className="bg-white border-2 border-black shadow-[3px_3px_0px_#000] hover:shadow-[4px_4px_0px_#000] hover:-translate-y-0.5 transition-all duration-150">
			{/* Red top bar */}
			<div className="h-1 w-full bg-red-600" />

			<div className="p-3">
				{/* Name */}
				<h3 className="text-xs font-black uppercase tracking-wide text-black leading-tight mb-2">
					{lead.name}
				</h3>

				{/* Location */}
				{lead.location && (
					<div className="flex items-center gap-1.5 mb-1.5">
						<span className="text-gray-400">
							<LocationIcon />
						</span>
						<span className="text-xs text-gray-400 font-medium truncate">
							{lead.location}
						</span>
					</div>
				)}

				{/* Phone */}
				{lead.phone && (
					<div className="flex items-center gap-1.5 mb-3">
						<div className="w-1.5 h-1.5 bg-red-600 shrink-0" />
						<span className="text-xs text-gray-500 font-medium tracking-wide">
							{lead.phone}
						</span>
					</div>
				)}

				{/* Agent */}
				{lead.assignedAgent && (
					<div className="flex items-center gap-2 pt-2 border-t border-gray-100 mb-3">
						<div className="w-5 h-5 bg-black flex items-center justify-center shrink-0">
							<span className="text-white text-xs font-black leading-none">
								{lead.assignedAgent?.charAt(0).toUpperCase()}
							</span>
						</div>
						<span className="text-xs font-black uppercase tracking-widest text-gray-400 truncate">
							{lead.assignedAgent}
						</span>
					</div>
				)}

				{/* Call + WhatsApp */}
				{lead.phone && (
					<div className="flex gap-1.5">
						<a
							href={`tel:${lead.phone}`}
							onPointerDown={(e) => e.stopPropagation()}
							className="flex-1 flex items-center justify-center gap-1 py-1.5 bg-red-600 hover:bg-red-700 active:translate-x-0.5 active:translate-y-0.5 active:shadow-none border-2 border-black shadow-[2px_2px_0px_#000] text-white text-xs font-black uppercase tracking-widest transition-all duration-150"
						>
							<PhoneIcon /> Call
						</a>

						<a
							href={`https://wa.me/91${lead.phone}`}
							target="_blank"
							rel="noreferrer"
							onPointerDown={(e) => e.stopPropagation()}
							className="flex-1 flex items-center justify-center gap-1 py-1.5 bg-white hover:bg-black hover:text-white active:translate-x-0.5 active:translate-y-0.5 active:shadow-none border-2 border-black shadow-[2px_2px_0px_#000] text-black text-xs font-black uppercase tracking-widest transition-all duration-150"
						>
							<WhatsAppIcon /> WA
						</a>
					</div>
				)}
			</div>
		</div>
	);
};

export default LeadCard;
