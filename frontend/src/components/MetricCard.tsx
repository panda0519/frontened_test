import { StatusBadge } from "./StatusBadge";
import { Card, CardContent } from "./ui/card";

interface MetricCardProps {
	label: string;
	value: string | number;
	unit?: string;
	status?: string;
	trend?: {
		direction: "up" | "down";
		value: string;
	};
}

export function MetricCard({
	label,
	value,
	unit,
	status,
	trend,
}: MetricCardProps) {
	return (
		<Card className="bg-gray-800 border-gray-700">
			<CardContent className="p-6">
				<div className="relative">
					{status && (
						<div className="absolute top-0 right-0">
							<StatusBadge status={status} />
						</div>
					)}

					<p className="text-sm text-gray-400 mb-2">{label}</p>

					<div className="flex items-baseline gap-2">
						<p className="text-3xl font-bold text-white">{value}</p>
						{unit && <span className="text-sm text-gray-500">{unit}</span>}
					</div>

					{trend && (
						<div
							className={`mt-3 flex items-center gap-1 text-sm ${
								trend.direction === "up" ? "text-red-400" : "text-green-400"
							}`}
						>
							<span>{trend.direction === "up" ? "📈" : "📉"}</span>
							<span>{trend.value}</span>
						</div>
					)}
				</div>
			</CardContent>
		</Card>
	);
}
