import styles from "./StatusSection.module.css";
import PropTypes from "prop-types";
import { languages } from "../languages";
import { getFarewellText } from "../utils";
import { useState, useEffect } from "react";

function StatusSection({
    isGameWon,
    isGameLost,
    wrongGuessCount,
    isLastGuessInCorrect,
}) {
    const [header, setHeader] = useState("");
    const [message, setMessage] = useState("");
    const [addClassName, setAddClassName] = useState("");

    useEffect(() => {
        if (isGameWon) {
            setHeader("You Win!");
            setMessage("Well done! 🎉");
            setAddClassName(styles.won);
        } else if (isGameLost) {
            setHeader("You Lose!");
            setMessage("You lose! Better start learning Assembly 😭");
            setAddClassName(styles.lost);
        } else {
            setHeader("");

            if (isLastGuessInCorrect && wrongGuessCount > 0) {
                const languagesText = languages
                    .slice(0, wrongGuessCount)
                    .map((it) => it.name)
                    .join(" & ");

                setMessage(getFarewellText(languagesText));
                setAddClassName("");
            } else {
                setMessage("");
                setAddClassName(styles.hidden);
            }
        }
    }, [isGameWon, isGameLost, wrongGuessCount, isLastGuessInCorrect]);

    return (
        <section
            aria-live="polite"
            role="status"
            className={`${styles.statusSection} ${addClassName}`}
        >
            <h2>{header}</h2>
            <p>{message}</p>
        </section>
    );
}

StatusSection.propTypes = {
    isGameWon: PropTypes.bool,
    isGameLost: PropTypes.bool,
    wrongGuessCount: PropTypes.number,
    isLastGuessInCorrect: PropTypes.bool,
};

export default StatusSection;
