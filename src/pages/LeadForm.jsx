import { useState } from "react";
import { createLead } from "../services/api";

const LeadForm = ({ onClose }) => {
	const [formData, setFormData] = useState({
		name: "",
		phone: "",
		location: "",
		source: "",
	});
	const [focused, setFocused] = useState(null);
	const [submitted, setSubmitted] = useState(false);

	const handleChange = (e) =>
		setFormData({ ...formData, [e.target.name]: e.target.value });

	const handleSubmit = async (e) => {
		e.preventDefault();

		try {
			await createLead(formData);

			setSubmitted(true);

			setTimeout(() => {
				setSubmitted(false);
				setFormData({ name: "", phone: "", location: "", source: "" });

				if (onClose) onClose();
			}, 1200);
		} catch (error) {
			console.error("Error creating lead:", error);
		}
	};

	const fields = [
		{
			name: "name",
			label: "Full Name",
			placeholder: "Jane Smith",
			icon: (
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
			),
		},
		{
			name: "phone",
			label: "Phone Number",
			placeholder: "+1 (555) 000-0000",
			icon: (
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
					<path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.61 3.41 2 2 0 0 1 3.6 1.23h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.84a16 16 0 0 0 6 6l.92-.92a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 21.73 16.92z" />
				</svg>
			),
		},
		{
			name: "location",
			label: "Location",
			placeholder: "New York, USA",
			icon: (
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
					<path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
					<circle cx="12" cy="10" r="3" />
				</svg>
			),
		},
		{
			name: "source",
			label: "Lead Source",
			placeholder: "Referral, LinkedIn...",
			icon: (
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
					<circle cx="18" cy="5" r="3" />
					<circle cx="6" cy="12" r="3" />
					<circle cx="18" cy="19" r="3" />
					<line x1="8.59" y1="13.51" x2="15.42" y2="17.49" />
					<line x1="15.41" y1="6.51" x2="8.59" y2="10.49" />
				</svg>
			),
		},
	];

	return (
		<div
			className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 px-4"
			onClick={(e) => e.target === e.currentTarget && onClose?.()}
		>
			<div className="relative w-full max-w-lg bg-white border-2 border-black shadow-[8px_8px_0px_#000]">
				{/* Top bar — two-tone */}
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
								Lead Created
							</p>
							<p className="text-gray-400 text-xs font-medium mt-1 tracking-wide">
								Successfully added to pipeline
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
										New Lead
									</span>
								</div>
								<h2 className="text-2xl font-black text-black tracking-tight uppercase leading-none">
									Create Lead
								</h2>
								<p className="text-xs text-gray-400 font-medium mt-1.5 tracking-wide">
									Fill in the contact details below
								</p>
							</div>
							<button
								onClick={onClose}
								className="w-9 h-9 border-2 border-black flex items-center justify-center text-black hover:bg-black hover:text-white transition-all duration-150 font-black text-sm shadow-[2px_2px_0px_#000] hover:shadow-none hover:translate-x-0.5 hover:translate-y-0.5"
							>
								✕
							</button>
						</div>

						{/* Two-column grid for fields */}
						<form onSubmit={handleSubmit}>
							<div className="grid grid-cols-2 gap-4 mb-6">
								{fields.map((field) => (
									<div
										key={field.name}
										className={field.name === "source" ? "col-span-2" : ""}
									>
										<label className="flex items-center gap-1.5 text-xs font-black tracking-widest text-black uppercase mb-2">
											<span className="text-gray-400">{field.icon}</span>
											{field.label}
										</label>
										<div
											className={`flex items-center border-2 transition-all duration-150 bg-white
                      ${
												focused === field.name
													? "border-red-600 shadow-[3px_3px_0px_#dc2626]"
													: "border-gray-200 hover:border-black shadow-[3px_3px_0px_#e5e7eb] hover:shadow-[3px_3px_0px_#000]"
											}`}
										>
											<input
												name={field.name}
												value={formData[field.name]}
												onChange={handleChange}
												onFocus={() => setFocused(field.name)}
												onBlur={() => setFocused(null)}
												placeholder={field.placeholder}
												className="w-full bg-transparent text-black placeholder-gray-300 px-4 py-3 text-sm outline-none font-medium"
											/>
											{formData[field.name] && (
												<span className="pr-3 text-red-600 font-black text-xs">
													✓
												</span>
											)}
										</div>
									</div>
								))}
							</div>

							{/* Progress indicator */}
							<div className="mb-6">
								<div className="flex justify-between mb-1.5">
									<span className="text-xs font-black uppercase tracking-widest text-gray-400">
										Completion
									</span>
									<span className="text-xs font-black text-black">
										{Object.values(formData).filter(Boolean).length}/
										{fields.length}
									</span>
								</div>
								<div className="h-1.5 bg-gray-100 border border-gray-200">
									<div
										className="h-full bg-red-600 transition-all duration-300"
										style={{
											width: `${(Object.values(formData).filter(Boolean).length / fields.length) * 100}%`,
										}}
									/>
								</div>
							</div>

							{/* Divider */}
							<div className="h-px bg-gray-100 mb-6" />

							{/* Actions */}
							<div className="flex gap-3">
								<button
									type="submit"
									className="flex-1 bg-red-600 hover:bg-red-700 active:shadow-none active:translate-x-0.5 active:translate-y-0.5 text-white font-black py-3 px-6 uppercase tracking-widest text-xs transition-all duration-150 border-2 border-black shadow-[3px_3px_0px_#000] flex items-center justify-center gap-2"
								>
									<svg
										width="13"
										height="13"
										viewBox="0 0 24 24"
										fill="none"
										stroke="currentColor"
										strokeWidth="3"
										strokeLinecap="round"
										strokeLinejoin="round"
									>
										<line x1="12" y1="5" x2="12" y2="19" />
										<line x1="5" y1="12" x2="19" y2="12" />
									</svg>
									Create Lead
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

export default LeadForm;
