import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ErrorBoundary } from "./app/error-boundary";
import { DashboardLayout } from "./components/DashboardLayout";

const queryClient = new QueryClient();

export function App() {
	return (
		<QueryClientProvider client={queryClient}>
			<ErrorBoundary>
				<DashboardLayout />
			</ErrorBoundary>
		</QueryClientProvider>
	);
}

export default App;
