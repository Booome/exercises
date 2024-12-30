import { languages } from "../languages";
import PropTypes from "prop-types";
import styles from "./LanguageSection.module.css";

function LanguageSection({ wrongGuessCount }) {
    return (
        <section className={styles.languageSection}>
            {languages.map((language, index) => {
                const wrongGuessClass =
                    wrongGuessCount > index ? styles.wrongGuess : "";

                return (
                    <div
                        key={index}
                        className={`${styles.languageChip} ${wrongGuessClass}`}
                        style={{
                            backgroundColor: language.backgroundColor,
                            color: language.color,
                        }}
                    >
                        {language.name}
                    </div>
                );
            })}
        </section>
    );
}

LanguageSection.propTypes = {
    wrongGuessCount: PropTypes.number.isRequired,
};

export default LanguageSection;
