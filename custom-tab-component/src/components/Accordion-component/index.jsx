import { useState } from "react";
import data from "../Accordion-component/data";
import "../Accordion-component/style.css";

function Accordion() {
  const [selected, setSelected] = useState(null);
  const [multiSelection, setMultiSelection] = useState(false);
  const [multiple, setMultiple] = useState([]);

  function handleSelection(CurrentId) {
    setSelected(selected === CurrentId ? null : CurrentId);
  }
  function handleMultiSelection(CurrentId) {
    const cpyMultiple = [...multiple];
    let indexOfCurrent = multiple.indexOf(CurrentId);
    if (indexOfCurrent === -1) {
      cpyMultiple.push(CurrentId);
    } else {
      cpyMultiple.splice(indexOfCurrent, 1);
    }
    setMultiple(cpyMultiple);
  }

  function EnableMultiSelection() {
    if (multiSelection) setMultiple([]);
    else setSelected(null);
    setMultiSelection(!multiSelection);
  }

  return (
    <div>
      <button
        className="MultiSelectionButton"
        onClick={() => EnableMultiSelection()}
      >
        Enable Multi Selection
      </button>
      <div className="Data">
        {data && data.length > 0 ? (
          data.map((dataItem) => (
            <div className="item" key={dataItem.id}>
              <div
                className="top"
                onClick={
                  multiSelection
                    ? () => handleMultiSelection(dataItem.id)
                    : () => handleSelection(dataItem.id)
                }
              >
                <h3 className="question">{dataItem.question}</h3>
                <span className="plus">+</span>
              </div>

              {multiSelection
                ? multiple.indexOf(dataItem.id) !== -1 && (
                    <div className="answer">{dataItem.answer}</div>
                  )
                : selected === dataItem.id && (
                    <div className="answer">{dataItem.answer}</div>
                  )}
            </div>
          ))
        ) : (
          <div>No data found!</div>
        )}
      </div>
    </div>
  );
}
export default Accordion;
