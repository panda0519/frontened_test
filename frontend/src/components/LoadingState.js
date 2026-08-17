import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Skeleton } from "./ui/skeleton";
export function LoadingState() {
    return (_jsxs("div", { className: "flex-1 flex flex-col lg:flex-row gap-6 p-6", children: [_jsxs("div", { className: "w-full lg:w-80 space-y-4", children: [_jsx(Skeleton, { className: "h-10 w-full" }), _jsx(Skeleton, { className: "h-10 w-full" })] }), _jsx("div", { className: "flex-1 space-y-4", children: _jsx(Skeleton, { className: "h-64 w-full" }) })] }));
}
