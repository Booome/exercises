import { FaExclamationTriangle } from "react-icons/fa";
import { FaCircleCheck, FaCircleInfo, FaCircleXmark } from "react-icons/fa6";
import styles from "./Banner.module.css";
export type BannerVariant = "success" | "warning" | "error" | "neutral";

export type BannerProps = {
    children?: React.ReactNode;
    variant?: BannerVariant;
};

export function Banner({ children, variant = "neutral" }: BannerProps) {
    const ICON = {
        success: <FaCircleCheck />,
        warning: <FaExclamationTriangle />,
        error: <FaCircleXmark />,
        neutral: <FaCircleInfo />,
    };

    return (
        <div className={`${styles.banner} ${styles[variant]}`}>
            {ICON[variant]}
            <div className={styles.bannerContent}>{children}</div>
        </div>
    );
}

export function BannerTitle({ children }: { children: React.ReactNode }) {
    return <p className={styles.bannerTitle}>{children}</p>;
}

export function BannerContent({ children }: { children: React.ReactNode }) {
    return <p>{children}</p>;
}
