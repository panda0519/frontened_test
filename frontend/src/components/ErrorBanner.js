import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Button } from "./ui/button";
export function ErrorBanner({ message, onRetry, }) {
    return (_jsxs("div", { className: "bg-red-900/20 border-b border-red-700 px-6 py-4 flex items-center justify-between", children: [_jsxs("div", { className: "flex items-center gap-3", children: [_jsx("span", { className: "text-red-400 text-lg", children: "\u26A0\uFE0F" }), _jsx("p", { className: "text-red-200", children: message })] }), _jsx(Button, { size: "sm", variant: "outline", onClick: onRetry, className: "text-red-300 border-red-600", children: "Retry" })] }));
}
