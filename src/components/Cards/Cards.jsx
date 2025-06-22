import './Cards.css';
import WordCard from "./WordCard";

function Cards () {
    const testWord = {
        english:"apple",
        russian: "яблоко",
        transcription:"'epl",
        theme:"food"
    };

    return(
        <div>
            <p>карточки тест</p>
            <WordCard word={testWord} />
        </div>
    );
}

export default Cards;

