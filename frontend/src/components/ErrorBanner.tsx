import { Button } from "./ui/button";

export function ErrorBanner({
	message,
	onRetry,
}: {
	message: string;
	onRetry: () => void;
}) {
	return (
		<div className="bg-red-900/20 border-b border-red-700 px-6 py-4 flex items-center justify-between">
			<div className="flex items-center gap-3">
				<span className="text-red-400 text-lg">⚠️</span>
				<p className="text-red-200">{message}</p>
			</div>
			<Button
				size="sm"
				variant="outline"
				onClick={onRetry}
				className="text-red-300 border-red-600"
			>
				Retry
			</Button>
		</div>
	);
}
