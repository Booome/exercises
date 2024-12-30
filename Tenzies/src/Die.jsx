import PropTypes from "prop-types";

export function Die({ value, isHeld, hold }) {
    return (
        <button
            className={`die ${isHeld ? "held" : ""}`}
            onClick={hold}
            aria-label={`Die with a value of ${value}, ${
                isHeld ? "held" : "not held"
            }`}
        >
            {value}
        </button>
    );
}

Die.propTypes = {
    value: PropTypes.number.isRequired,
    isHeld: PropTypes.bool.isRequired,
    hold: PropTypes.func.isRequired,
};
