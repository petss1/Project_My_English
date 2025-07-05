import { useEffect, useState } from "react";
import WordCard from "../components/Cards/WordCard";
import "./CardsPage.css";

function CardsPage () {
    const [words, setWords] = useState([]);
    const [index, setIndex] = useState(0);
    const [studiedCount, setStudiedCount] = useState(0);

    useEffect(() => {
        const saved = localStorage.getItem("myWords");
        if (saved) {
            setWords(JSON.parse(saved));
        }
    }, []);

    const showPrev = () => {
        setIndex ((prev) => (prev === 0 ? words.length - 1 : prev-1));
    };

    const showNext =() => {
        setIndex ((prev) => (prev === words.length - 1 ? 0 : prev+1));
    };

    if(words.length === 0) {
        return (
            <div className="no-words"> 
                <div className="word-card">
                    <h2>Нет слов для отображения</h2>
                </div>
            </div>
            );
    }

    return (
        <div className="cards-page">
            <p className="studied-info">Вы изучили: {studiedCount} слов</p>
            <button onClick={showPrev}>⬅</button>
            <WordCard word={words[index]} 
            onReveal={()=> setStudiedCount((prev)=>prev+1)}/>
            <button onClick={showNext}>➡</button>
        </div>
    );
}

export default CardsPage;
