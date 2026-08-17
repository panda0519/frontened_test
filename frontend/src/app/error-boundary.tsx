import { Component, type ReactNode } from "react";

interface Props {
	children: ReactNode;
	fallback?: (error: Error, reset: () => void) => ReactNode;
}

interface State {
	error: Error | null;
}

export class ErrorBoundary extends Component<Props, State> {
	state: State = { error: null };

	static getDerivedStateFromError(error: Error): State {
		return { error };
	}

	componentDidCatch(error: Error) {
		console.error("Error caught by boundary:", error);
	}

	reset = () => {
		this.setState({ error: null });
	};

	render() {
		const { error } = this.state;
		const { children, fallback } = this.props;

		if (error) {
			return (
				fallback?.(error, this.reset) || (
					<div className="flex flex-col items-center justify-center w-full min-h-screen bg-red-50 dark:bg-red-950 p-6">
						<h2 className="text-2xl font-bold text-red-900 dark:text-red-100 mb-2">
							Something went wrong
						</h2>
						<p className="text-red-700 dark:text-red-300 mb-4">
							{error.message}
						</p>
						<button
							type="button"
							onClick={() => window.location.reload()}
							className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
						>
							Reload Page
						</button>
					</div>
				)
			);
		}

		return children;
	}
}
