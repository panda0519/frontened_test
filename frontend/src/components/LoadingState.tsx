import { Skeleton } from "./ui/skeleton";

export function LoadingState() {
	return (
		<div className="flex-1 flex flex-col lg:flex-row gap-6 p-6">
			<div className="w-full lg:w-80 space-y-4">
				<Skeleton className="h-10 w-full" />
				<Skeleton className="h-10 w-full" />
			</div>
			<div className="flex-1 space-y-4">
				<Skeleton className="h-64 w-full" />
			</div>
		</div>
	);
}
