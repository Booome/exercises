import styles from "./Badge.module.css";

export type BadgeVariant = "square" | "pill";
export type BadgeColor =
    | "gray"
    | "red"
    | "yellow"
    | "green"
    | "blue"
    | "indigo"
    | "purple"
    | "pink";

export type BadgeProps = {
    children?: React.ReactNode;
    variant?: BadgeVariant;
    color?: BadgeColor;
};

export function Badge({
    variant = "square",
    color = "gray",
    children,
}: BadgeProps) {
    return (
        <div className={`${styles.badge} ${styles[variant]} ${styles[color]}`}>
            {children}
        </div>
    );
}
