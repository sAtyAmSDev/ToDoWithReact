import { useEffect, useState } from 'react';
import './App.css';
import { FaCheck, FaTrash } from 'react-icons/fa';

function App() {
  const [Texts, setTexts] = useState([]);
  const [InputValue, setInputValue] = useState('');

  useEffect(() => {
    const storeditem = JSON.parse(localStorage.getItem('item'));
    if (storeditem) {
      setTexts(storeditem);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('item', JSON.stringify(Texts));
  }, [Texts]);

  const InputChange = (event) => {
    setInputValue(event.target.value);
  };

  const FormSubmit = (event) => {
    event.preventDefault();
    if (InputValue) {
      const newItem = {
        id: Date.now(),
        text: InputValue,
        completed: false,
      };
      setTexts([...Texts, newItem]);
      setInputValue('');
    }
  };

  const handleDeleteItem = (itemId) => {
    setTexts(Texts.filter((item) => item.id !== itemId));
  };

  const toggleCompletedStyle = (id) => {
    document.getElementById(id).classList.toggle('ToDoTextSpan')
  };

  return (
    <>
      <div className="Main">
        <h1>Just do it.</h1>
        <div className="InputBox">
          <form onSubmit={FormSubmit}>
            <input type="text" value={InputValue} onChange={InputChange} />
            <button>I Got This!</button>
          </form>
        </div>

        {Texts.map((Item) => (
          <div className="ToDoText" key={Item.id}>
            <span id={Item.id}>{Item.text}</span>
            <div className="Icon">
              <button onClick={() => toggleCompletedStyle(Item.id)}>
                <FaCheck />
              </button>
              <button onClick={() => handleDeleteItem(Item.id)}>
                <FaTrash />
              </button>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

export default App;
