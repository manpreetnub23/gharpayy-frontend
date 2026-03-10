import { useEffect, useState } from "react";
import { getVisits } from "../services/api";

const VisitScheduler = () => {
	const [visits, setVisits] = useState([]);

	useEffect(() => {
		fetchVisits();
	}, []);

	const fetchVisits = async () => {
		try {
			const res = await getVisits();
			setVisits(res.data);
		} catch (error) {
			console.error(error);
		}
	};

	return (
		<div>
			<h1 className="text-2xl font-bold mb-6">Visits</h1>

			{visits.map((visit) => (
				<div key={visit._id} className="border p-4 mb-3">
					<p>Lead: {visit.lead?.name}</p>
					<p>Property: {visit.propertyName}</p>
					<p>Date: {visit.visitDate}</p>
					<p>Status: {visit.outcome}</p>
				</div>
			))}
		</div>
	);
};

export default VisitScheduler;
