import styles from "./Keyboard.module.css";
import PropTypes from "prop-types";

function Keyboard({ rightLetters, wrongLetters, onClick, disabled }) {
    const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

    return (
        <section className={styles.keyboardSection}>
            {alphabet.split("").map((letter) => {
                const rightClass =
                    rightLetters && rightLetters.includes(letter)
                        ? styles.keyboardKeyRight
                        : "";
                const wrongClass =
                    wrongLetters && wrongLetters.includes(letter)
                        ? styles.keyboardKeyWrong
                        : "";

                const isDisabled =
                    disabled ||
                    rightLetters.includes(letter) ||
                    wrongLetters.includes(letter);

                return (
                    <button
                        className={`${styles.keyboardKey} ${rightClass} ${wrongClass}`}
                        key={letter}
                        onClick={() => onClick(letter)}
                        disabled={isDisabled}
                        aria-disabled={isDisabled}
                        aria-label={`Letter ${letter}`}
                    >
                        {letter}
                    </button>
                );
            })}
        </section>
    );
}

Keyboard.propTypes = {
    rightLetters: PropTypes.arrayOf(PropTypes.string),
    wrongLetters: PropTypes.arrayOf(PropTypes.string),
    onClick: PropTypes.func,
    disabled: PropTypes.bool,
};

export default Keyboard;
