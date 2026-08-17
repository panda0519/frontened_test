import type { StationStatus } from "shared";
interface StatusBadgeProps {
    status: StationStatus | string;
}
export declare function StatusBadge({ status }: StatusBadgeProps): import("react").JSX.Element;
export {};
