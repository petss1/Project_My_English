import { useEffect, useState } from "react";
import "./WordTable.css"

function WordTable () {
    const [words, setWords] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [newWord, setNewWord] = useState({
        english: "",
        russian: "",
        transcription: "",
        theme: ""
    });
    const [editId, setEditId] = useState(null);
    const [editedWord, setEditedWord] = useState({});

    const handleDelete = (id) => {
        const confirmed = window.confirm("Удалить это слово?");
        if (confirmed) {
            const updated = words.filter ((word) => word.id !== id);
            setWords (updated);
            localStorage.setItem("myWords", JSON.stringify(updated));
        }
    };

    const handleEdit = (word)=>{
        setEditId(word.id);
        setEditedWord({...word});
    };

    const handleCancel = () => {
        setEditId(null);
        setEditedWord({});
    };

    const handleSave = (id) => {
        const updated = words.map((word) =>
        word.id === id ? {...editedWord, id}: word
    );
    setWords(updated);
    localStorage.setItem("myWords", JSON.stringify(updated));
    setEditId(null);
    setEditedWord({});
    };

    const handleAdd = (e) => {
        e.preventDefault();
    const newItem = {
        id: Date.now(),
        ...newWord
    };
    const updated = [...words, newItem];
    setWords(updated);
    localStorage.setItem("myWords", JSON.stringify(updated));

    setNewWord({
        english:"",
        russian:"",
        transcription:"",
        theme: ""
    });
    };

useEffect (() => {
    const saved = localStorage.getItem("myWords");

    if (saved) {
        setWords(JSON.parse(saved));
        setLoading(false);
    } else {
        fetch ("http://itgirlschool.justmakeit.ru/api/words")
            .then ((res)=>{
                if(!res.ok){
                    throw new Error("ошибка загрузки данных");
            }
            return res.json();
        })
        .then ((data)=>{
            setWords(data);
            localStorage.setItem("myWords", JSON.stringify(data));
            setLoading(false);
        })
        .catch ((err)=>{
            setError(err.message);
            setLoading(false);
        });
    }
}, []);

if (loading) {
    return <p>Загрузка слов...</p>;
}

if (error) {
    return <p style={{ color: "red" }}>Ошибка: {error}</p>;
}

return (
    <>
    <div className="reset-wrapper">
        <button onClick={() => {
            localStorage.removeItem("myWords");
            window.location.reload();
        }}
        className = "reset-btn">
        🔄 Сбросить данные
        </button>
    </div>

    <div className="table-wrapper">
        <form className="word-form" onSubmit={handleAdd}>
            <input
            type="text"
            placeholder="Слово (англ)"
            value={newWord.english}
            onChange={(e)=> setNewWord({...newWord, english: e.target.value})}
            required
            />
            <input
            type="text"
            placeholder="Перевод"
            value={newWord.russian}
            onChange={(e)=>setNewWord({...newWord, russian: e.target.value })}
            required
            />
            <input
            type="text"
            placeholder="Транскрипция"
            value={newWord.transcription}
            onChange={(e)=>setNewWord({...newWord,transcription: e.target.value })}
            />
            <input
            type="text"
            placeholder="Тема"
            value={newWord.theme}
            onChange={(e)=>setNewWord({...newWord, theme: e.target.value })}
            />
            <button type="submit">Добавить</button>
        </form>

        <table>
            <thead>
                <tr>
                    <th>Слово</th>
                    <th>Перевод</th>
                    <th>Транскрипция</th>
                    <th>Тема</th>
                    <th>Действия</th>
                </tr>
            </thead>
            <tbody>
            {words.map((word) => 
                editId === word.id ? (
                <tr key={word.id}>
                    <td>
                        <input
                            type="text"
                            value={editedWord.english}
                            onChange={(e)=>
                                setEditedWord({...editedWord, english: e.target.value})
                            }
                        />                 
                        </td>
                    <td>
                        <input 
                        type="text"
                        value={editedWord.russian}
                        onChange={(e)=>
                            setEditedWord({...editedWord, russian: e.target.value})
                        }
                        />
                    </td>
                    <td>
                        <input
                        type="text"
                        value={editedWord.transcription}
                        onChange={(e)=>
                            setEditedWord({...editedWord, transcription: e.target.value })
                        }
                        />
                    </td>
                    <td>
                        <input
                        type="text"
                        value={editedWord.theme}
                        onChange={(e)=>
                            setEditedWord({...editedWord, theme: e.target.value })
                        }
                        />
                    </td>
                    <td>
                        <button onClick={()=> handleSave(word.id)}>💾</button>
                        <button onClick={handleCancel}>✖️</button>
                    </td>
                </tr>
                ) : (
                    <tr key={word.id}>
                        <td>{word.english}</td>
                        <td>{word.russian}</td>
                        <td>{word.transcription}</td>
                        <td>{word.theme}</td>
                        <td>
                            <button onClick={()=> handleEdit(word)}>✏️</button>
                            <button onClick={()=> handleDelete(word.id)}>🗑️</button>
                        </td>
                    </tr>
                )
            )}
            </tbody>
        </table>
    </div>
    </>
    );
}

export default WordTable;

