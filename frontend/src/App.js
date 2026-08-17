import { jsx as _jsx } from "react/jsx-runtime";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ErrorBoundary } from "./app/error-boundary";
import { DashboardLayout } from "./components/DashboardLayout";
const queryClient = new QueryClient();
export function App() {
    return (_jsx(QueryClientProvider, { client: queryClient, children: _jsx(ErrorBoundary, { children: _jsx(DashboardLayout, {}) }) }));
}
export default App;
