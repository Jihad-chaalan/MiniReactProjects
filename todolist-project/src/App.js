import { useRef, useState } from "react";
import "./App.css";

function App() {
  const [toDo, setToDo] = useState([]);
  const inputRef = useRef();

  function DeleteItem(index) {
    const newToDo = [...toDo];
    newToDo.splice(index, 1);
    setToDo(newToDo);
  }

  function AddItem() {
    let text = inputRef.current.value;
    if (text === "") {
      return;
    }
    let newItem = { text, completed: false };
    setToDo([...toDo, newItem]);
    inputRef.current.value = "";
  }
  function ItemIsDone(index) {
    const newToDo = [...toDo];
    newToDo[index].completed = !newToDo[index].completed;
    setToDo(newToDo);
  }
  console.log(inputRef.current);
  return (
    <div className="App">
      <h2>To Do List</h2>
      <div className="list">
        {toDo.map(({ text, completed }, index) => {
          return (
            <div className="item">
              <li
                className={completed ? "done" : ""}
                key={index}
                onClick={() => ItemIsDone(index)}
              >
                {text}
              </li>
              <span className="x" onClick={() => DeleteItem(index)}>
                ❌
              </span>
            </div>
          );
        })}
      </div>
      <input ref={inputRef} placeholder="Enter item..."></input>
      <button className="btn" onClick={AddItem}>
        Add
      </button>
    </div>
  );
}

export default App;
