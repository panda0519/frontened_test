import { useMemo } from "react";
import type { StationStatus } from "shared";

interface StatusBadgeProps {
	status: StationStatus | string;
}

export function StatusBadge({ status }: StatusBadgeProps) {
	const badgeStyles = useMemo(() => {
		const styles: Record<string, string> = {
			Safe: "bg-green-500/10 text-green-400 border border-green-500/30",
			"Semi-Critical":
				"bg-yellow-500/10 text-yellow-400 border border-yellow-500/30",
			Critical: "bg-orange-500/10 text-orange-400 border border-orange-500/30",
			"Over-Exploited": "bg-red-500/10 text-red-400 border border-red-500/30",
		};
		return (
			styles[status] || "bg-gray-500/10 text-gray-400 border border-gray-500/30"
		);
	}, [status]);

	const displayText = useMemo(() => {
		const knownStatuses = [
			"Safe",
			"Semi-Critical",
			"Critical",
			"Over-Exploited",
		];
		return knownStatuses.includes(status) ? status : "Unknown";
	}, [status]);

	return (
		<span
			className={`inline-block px-2 py-0.5 rounded-full text-xs font-medium ${badgeStyles}`}
			role="status"
			aria-label={`Status: ${displayText}`}
		>
			{displayText}
		</span>
	);
}
