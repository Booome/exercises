import { HiOutlineCloudUpload } from "react-icons/hi";
import styles from "./Card.module.css";

type CardProps = {
    children?: React.ReactNode;
};

export function Card({ children }: CardProps) {
    return (
        <div className={styles.card}>
            <HiOutlineCloudUpload />
            {children}
        </div>
    );
}

export function CardTitle({ children }: { children: React.ReactNode }) {
    return <p className={styles.cardTitle}>{children}</p>;
}

export function CardContent({ children }: { children: React.ReactNode }) {
    return <p>{children}</p>;
}
