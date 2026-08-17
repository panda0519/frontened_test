interface MetricCardProps {
    label: string;
    value: string | number;
    unit?: string;
    status?: string;
    trend?: {
        direction: "up" | "down";
        value: string;
    };
}
export declare function MetricCard({ label, value, unit, status, trend, }: MetricCardProps): import("react").JSX.Element;
export {};
