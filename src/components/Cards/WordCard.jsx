import { useState, useRef, useEffect } from "react";
import "./WordCard.css";

function WordCard ({ word, onReveal }) {
    const [showTranslation, setShowTranslation] = useState(false);
    const buttonRef = useRef();

    useEffect(()=>{
        setShowTranslation(false);
    }, [word]);

    useEffect(()=>{
        if (buttonRef.current && !showTranslation){
            buttonRef.current.focus();
        }
    }, [word,showTranslation]);

    const handleShow = () => {
        setShowTranslation(true);
        onReveal();
    };
    
    if (!word) return null;

    return (
        <div className="word-card">
            <h2>{word.english}</h2>
            <p className="transcription">{word.transcription}</p>

            {!showTranslation ? (
                <button ref={buttonRef} onClick={handleShow}>
                    Показать перевод
                </button>
            ) : (
                <p className="translation">{word.russian}</p>
            )}
        </div>
    );
}

export default WordCard;