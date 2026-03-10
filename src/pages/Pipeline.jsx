import { useEffect, useState } from "react";
import { getLeads, updateLead } from "../services/api";
import { LEAD_STATUS } from "../utils/constants";

import {
	DndContext,
	pointerWithin,
	useSensor,
	useSensors,
	PointerSensor,
	DragOverlay,
	useDroppable,
} from "@dnd-kit/core";
import { updateLeadStatus } from "../services/api";
import {
	SortableContext,
	verticalListSortingStrategy,
	useSortable,
} from "@dnd-kit/sortable";

import { CSS } from "@dnd-kit/utilities";

const statusConfig = {
	New: { header: "bg-red-600 text-white", dot: "bg-red-300", col: "bg-red-50" },
	Contacted: {
		header: "bg-black text-white",
		dot: "bg-gray-500",
		col: "bg-gray-50",
	},
	Visit: {
		header: "bg-gray-800 text-white",
		dot: "bg-gray-400",
		col: "bg-gray-50",
	},
	Negotiation: {
		header: "bg-gray-200 text-black",
		dot: "bg-gray-400",
		col: "bg-gray-100",
	},
	Closed: {
		header: "bg-white text-black",
		dot: "bg-red-600",
		col: "bg-gray-50",
	},
};

const DragIcon = () => (
	<svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
		<circle cx="9" cy="5" r="1.5" />
		<circle cx="15" cy="5" r="1.5" />
		<circle cx="9" cy="12" r="1.5" />
		<circle cx="15" cy="12" r="1.5" />
		<circle cx="9" cy="19" r="1.5" />
		<circle cx="15" cy="19" r="1.5" />
	</svg>
);

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
	const {
		attributes,
		listeners,
		setNodeRef,
		transform,
		transition,
		isDragging,
	} = useSortable({ id: lead._id });

	const style = {
		transform: CSS.Transform.toString(transform),
		transition,
		opacity: isDragging ? 0.4 : 1,
	};

	return (
		<div
			ref={setNodeRef}
			style={style}
			className="bg-white border-2 border-black shadow-[3px_3px_0px_#000] hover:shadow-[4px_4px_0px_#000] hover:-translate-y-0.5 transition-all duration-150"
		>
			<div className="h-1 w-full bg-red-600" />
			<div className="p-3">
				{/* Name + drag handle */}
				<div className="flex items-start justify-between gap-2 mb-2">
					<h3 className="text-xs font-black uppercase tracking-wide text-black leading-tight flex-1">
						{lead.name}
					</h3>
					<div
						{...listeners}
						{...attributes}
						className="text-gray-300 hover:text-black cursor-grab active:cursor-grabbing shrink-0 mt-0.5"
					>
						<DragIcon />
					</div>
				</div>

				{/* Source */}
				{lead.source && (
					<span className="text-xs font-black uppercase tracking-widest text-gray-300 block mb-2">
						{lead.source}
					</span>
				)}

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

const Column = ({ status, leads }) => {
	const { setNodeRef, isOver } = useDroppable({ id: status });
	const config = statusConfig[status] ?? {
		header: "bg-gray-100 text-black",
		dot: "bg-gray-400",
		col: "bg-gray-50",
	};
	const isWhiteHeader = config.header.includes("text-black");

	return (
		<div
			className={`flex flex-col w-72 border-2 transition-all duration-150
      ${isOver ? "border-red-600 shadow-[4px_4px_0px_#dc2626]" : "border-black shadow-[4px_4px_0px_#000]"}`}
		>
			{/* Column header */}
			<div
				className={`${config.header} ${isWhiteHeader ? "border-b-2 border-black" : ""} px-4 py-3 flex items-center justify-between shrink-0`}
			>
				<div className="flex items-center gap-2">
					<div className={`w-2 h-2 ${config.dot}`} />
					<span className="text-xs font-black uppercase tracking-widest">
						{status}
					</span>
				</div>
				<span
					className={`text-xs font-black border-2 px-2 py-0.5
          ${isWhiteHeader ? "border-black bg-white" : "border-white/30 bg-white/10 text-white"}`}
				>
					{leads.length}
				</span>
			</div>

			{/* Drop zone */}
			<SortableContext
				items={leads.map((l) => l._id)}
				strategy={verticalListSortingStrategy}
			>
				<div
					ref={setNodeRef}
					className={`flex flex-col gap-3 p-3 flex-1 min-h-48 transition-colors duration-150
            ${isOver ? "bg-red-50" : config.col}`}
				>
					{leads.length === 0 ? (
						<div
							className={`flex flex-col items-center justify-center flex-1 py-10 gap-2 border-2 border-dashed transition-all duration-150
              ${isOver ? "border-red-400" : "border-gray-200"}`}
						>
							<div
								className={`w-2 h-2 ${isOver ? "bg-red-400" : "bg-gray-200"}`}
							/>
							<span
								className={`text-xs font-black uppercase tracking-widest ${isOver ? "text-red-400" : "text-gray-300"}`}
							>
								{isOver ? "Drop here" : "Empty"}
							</span>
						</div>
					) : (
						leads.map((lead) => <LeadCard key={lead._id} lead={lead} />)
					)}
				</div>
			</SortableContext>
		</div>
	);
};

const Pipeline = () => {
	const [leads, setLeads] = useState([]);
	const [activeId, setActiveId] = useState(null);

	useEffect(() => {
		fetchLeads();
	}, []);

	const fetchLeads = async () => {
		const res = await getLeads();
		setLeads(res.data.data);
	};

	const sensors = useSensors(
		useSensor(PointerSensor, { activationConstraint: { distance: 5 } }),
	);
	const activeLead = leads.find((l) => l._id === activeId);

	const handleDragStart = (event) => setActiveId(event.active.id);

	const handleDragEnd = async (event) => {
		const { active, over } = event;

		setActiveId(null);

		if (!over) return;

		const leadId = active.id;

		const newStatus = over.data?.current?.status || over.id;

		try {
			await updateLeadStatus(leadId, newStatus);

			setLeads((prev) =>
				prev.map((lead) =>
					lead._id === leadId ? { ...lead, status: newStatus } : lead,
				),
			);
		} catch (error) {
			console.error(error);
		}
	};
	return (
		<div className="min-h-screen bg-gray-50">
			<div className="fixed top-0 left-0 h-full w-1 bg-red-600 z-10" />

			<div className="px-8 pt-8 pb-12">
				{/* Header */}
				<div className="flex items-center justify-between mb-8 pb-6 border-b-2 border-black">
					<div className="flex items-center gap-3">
						<div className="w-1 h-8 bg-red-600" />
						<div>
							<p className="text-xs font-black uppercase tracking-[3px] text-red-600">
								CRM
							</p>
							<h1 className="text-2xl font-black uppercase tracking-tight text-black leading-none">
								Pipeline
							</h1>
						</div>
					</div>
					<div className="flex items-center gap-2 bg-white border-2 border-black px-3 py-1.5 shadow-[2px_2px_0px_#000]">
						<span className="text-gray-400">
							<DragIcon />
						</span>
						<span className="text-xs font-black uppercase tracking-widest text-gray-400">
							Drag to move
						</span>
					</div>
				</div>

				{/* Board */}
				<DndContext
					sensors={sensors}
					collisionDetection={pointerWithin}
					onDragStart={handleDragStart}
					onDragEnd={handleDragEnd}
				>
					<div className="overflow-x-auto pb-4">
						<div className="flex gap-4 w-max items-start">
							{LEAD_STATUS.map((status) => (
								<Column
									key={status}
									status={status}
									leads={leads.filter((l) => l.status === status)}
								/>
							))}
						</div>
					</div>

					<DragOverlay>
						{activeLead ? (
							<div className="w-72 rotate-1 opacity-95">
								<LeadCard lead={activeLead} />
							</div>
						) : null}
					</DragOverlay>
				</DndContext>
			</div>
		</div>
	);
};

export default Pipeline;
