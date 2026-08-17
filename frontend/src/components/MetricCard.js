import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { StatusBadge } from "./StatusBadge";
import { Card, CardContent } from "./ui/card";
export function MetricCard({ label, value, unit, status, trend, }) {
    return (_jsx(Card, { className: "bg-gray-800 border-gray-700", children: _jsx(CardContent, { className: "p-6", children: _jsxs("div", { className: "relative", children: [status && (_jsx("div", { className: "absolute top-0 right-0", children: _jsx(StatusBadge, { status: status }) })), _jsx("p", { className: "text-sm text-gray-400 mb-2", children: label }), _jsxs("div", { className: "flex items-baseline gap-2", children: [_jsx("p", { className: "text-3xl font-bold text-white", children: value }), unit && _jsx("span", { className: "text-sm text-gray-500", children: unit })] }), trend && (_jsxs("div", { className: `mt-3 flex items-center gap-1 text-sm ${trend.direction === "up" ? "text-red-400" : "text-green-400"}`, children: [_jsx("span", { children: trend.direction === "up" ? "📈" : "📉" }), _jsx("span", { children: trend.value })] }))] }) }) }));
}
