import { useState } from "react";
import "./WordCard.css";

function WordCard ({ word }) {
    const [showTranslation, setShowTranslation] = useState(false);
    
    if (!word) return null;

    return (
        <div className="word-card">
            <h2>{word.english}</h2>
            <p className="transcription">{word.transcription}</p>

            {!showTranslation ? (
                <button onClick={() => setShowTranslation (true)}>
                    Показать перевод
                </button>
            ) : (
                <p className="translation">{word.russian}</p>
            )}
        </div>
    );
}

export default WordCard;