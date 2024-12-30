import PropTypes from "prop-types";
import styles from "./WordSection.module.css";

function WordSection({ currentWord, rightLetters, isGameOver }) {
    return (
        <section className={styles.wordSection}>
            {currentWord
                .toUpperCase()
                .split("")
                .map((letter, index) => {
                    const rightLetterClass = rightLetters.includes(letter)
                        ? styles.rightLetter
                        : "";
                    const gameOverClass = isGameOver ? styles.gameOver : "";

                    return (
                        <span
                            key={index}
                            className={`${styles.letterCard} ${rightLetterClass} ${gameOverClass}`}
                        >
                            {letter}
                        </span>
                    );
                })}
            <div className="sr-only">
                Current word:
                {currentWord
                    .split("")
                    .map((letter) =>
                        rightLetters.includes(letter) ? letter : "blank"
                    )
                    .join(".")}
            </div>
        </section>
    );
}

WordSection.propTypes = {
    currentWord: PropTypes.string.isRequired,
    rightLetters: PropTypes.arrayOf(PropTypes.string),
    isGameOver: PropTypes.bool,
};

export default WordSection;
