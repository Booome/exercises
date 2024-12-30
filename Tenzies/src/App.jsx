import { Die } from "./Die";
import { useState, useRef, useEffect } from "react";
import { nanoid } from "nanoid";
import { useWindowSize } from "react-use";
import Confetti from "react-confetti";

export default function App() {
    const roll = () => {
        return Math.floor(Math.random() * 6) + 1;
    };

    const generateAllNewDice = () => {
        return Array.from({ length: 10 }, () => {
            const value = roll();
            return { value, isHeld: false, id: nanoid() };
        });
    };

    const [dice, setDice] = useState(generateAllNewDice);
    const { width, height } = useWindowSize();
    const actionBtnRef = useRef(null);
    const gameWon =
        dice.every((die) => die.isHeld) &&
        dice.every((die) => die.value === dice[0].value);

    const rollDice = () => {
        if (gameWon) {
            setDice(generateAllNewDice());
        } else {
            setDice((prev) => {
                return prev.map((it) => {
                    return {
                        ...it,
                        value: it.isHeld ? it.value : roll(),
                    };
                });
            });
        }
    };

    useEffect(() => {
        if (gameWon) {
            actionBtnRef.current.focus();
        }
    }, [gameWon]);

    const hold = (id) => {
        setDice((prev) => {
            return prev.map((it) => {
                return it.id === id ? { ...it, isHeld: !it.isHeld } : it;
            });
        });
    };

    return (
        <div className="app-container">
            {gameWon && <Confetti width={width} height={height} />}
            <div aria-live="polite" className="sr-only">
                {gameWon && (
                    <p>
                        Congratulations! You won! Press &quot;New Game&quot; to
                        start again.
                    </p>
                )}
            </div>

            <h1 className="title">Tenzies</h1>
            <p className="instructions">
                Roll until all dice are the same. Click each die to freeze it at
                its current value between rolls.
            </p>

            <div className="die-container">
                {dice.map((die) => (
                    <Die
                        key={die.id}
                        value={die.value}
                        isHeld={die.isHeld}
                        hold={() => hold(die.id)}
                    />
                ))}
            </div>

            <button ref={actionBtnRef} className="roll-btn" onClick={rollDice}>
                {gameWon ? "New Game" : "Roll"}
            </button>
        </div>
    );
}
