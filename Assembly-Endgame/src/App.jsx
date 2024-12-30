import styles from "./App.module.css";
import LanguageSection from "./components/LanguageSection";
import WordSection from "./components/WordSection";
import StatusSection from "./components/StatusSection";
import Header from "./components/Header";
import Keyboard from "./components/Keyboard";
import { useState } from "react";
import { languages } from "./languages";
import { getRandomWord } from "./utils";
import Confetti from "react-confetti";
import { useWindowSize } from "react-use";

export default function App() {
    const { width, height } = useWindowSize();
    const [currentWord, setCurrentWord] = useState(getRandomWord);
    const [guessedLetters, setGuessedLetters] = useState([]);

    const rightLetters = guessedLetters.filter((letter) =>
        currentWord.toUpperCase().includes(letter)
    );
    const wrongLetters = guessedLetters.filter(
        (letter) => !currentWord.toUpperCase().includes(letter)
    );

    const isLastGuessInCorrect =
        guessedLetters.length > 0 &&
        !currentWord
            .toUpperCase()
            .includes(guessedLetters[guessedLetters.length - 1]);

    const isGameWon = currentWord
        .toUpperCase()
        .split("")
        .every((letter) => rightLetters.includes(letter));
    const isGameLost = wrongLetters.length >= languages.length - 1;
    const isGameOver = isGameWon || isGameLost;

    const handleKeyboardClick = (letter) => {
        if (!guessedLetters.includes(letter)) {
            setGuessedLetters((prev) => [...prev, letter]);
        }
    };

    const handleNewGame = () => {
        setGuessedLetters([]);
        setCurrentWord(getRandomWord);
    };

    return (
        <main className={styles.appContainer}>
            {isGameWon && <Confetti width={width} height={height} />}

            <Header />
            <StatusSection
                isGameWon={isGameWon}
                isGameLost={isGameLost}
                wrongGuessCount={wrongLetters.length}
                isLastGuessInCorrect={isLastGuessInCorrect}
            />
            <LanguageSection wrongGuessCount={wrongLetters.length} />
            <WordSection
                rightLetters={rightLetters}
                currentWord={currentWord}
                isGameOver={isGameOver}
            />
            <Keyboard
                rightLetters={rightLetters}
                wrongLetters={wrongLetters}
                onClick={handleKeyboardClick}
                disabled={isGameOver}
            />

            <div className={styles.newGameButtonContainer}>
                {isGameOver && (
                    <button
                        className={styles.newGameButton}
                        onClick={handleNewGame}
                    >
                        New Game
                    </button>
                )}
            </div>
        </main>
    );
}
