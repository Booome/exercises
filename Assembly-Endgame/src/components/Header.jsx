import styles from "./Header.module.css";

function Header() {
    return (
        <header className={styles.header}>
            <h1 className={styles.title}>Assembly: Endgame</h1>
            <p>
                Guess the word in under 8 attempts to keep the programming world
                safe from Assembly!
            </p>
        </header>
    );
}

export default Header;
