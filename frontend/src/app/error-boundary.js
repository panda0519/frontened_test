import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Component } from "react";
export class ErrorBoundary extends Component {
    constructor() {
        super(...arguments);
        this.state = { error: null };
        this.reset = () => {
            this.setState({ error: null });
        };
    }
    static getDerivedStateFromError(error) {
        return { error };
    }
    componentDidCatch(error) {
        console.error("Error caught by boundary:", error);
    }
    render() {
        const { error } = this.state;
        const { children, fallback } = this.props;
        if (error) {
            return (fallback?.(error, this.reset) || (_jsxs("div", { className: "flex flex-col items-center justify-center w-full min-h-screen bg-red-50 dark:bg-red-950 p-6", children: [_jsx("h2", { className: "text-2xl font-bold text-red-900 dark:text-red-100 mb-2", children: "Something went wrong" }), _jsx("p", { className: "text-red-700 dark:text-red-300 mb-4", children: error.message }), _jsx("button", { type: "button", onClick: () => window.location.reload(), className: "px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700", children: "Reload Page" })] })));
        }
        return children;
    }
}
