import React from 'react';
import { textState, selectedAreaState, selectedValuesState, selectedColsState, selectedCellState, customVariableState} from '../recoil/atoms';
import { useRecoilState } from 'recoil';

export default function LeftView() {
    const [text, setText] = useRecoilState(textState);
    const [selectedArea, setSelectedArea] = useRecoilState(selectedAreaState);
    const [values, setSelectedValues] = useRecoilState(selectedValuesState);
    const [selectedCols, setSelectedCols] = useRecoilState(selectedColsState);
    const [selectedCell, setSelectedCell] = useRecoilState(selectedCellState);
    const [customVariable, setCustomVariable] = useRecoilState(customVariableState);


    const handleChange = (cell, event) => {
        let valuesCopy = [...values];
        const cellIndex = valuesCopy.indexOf(cell);
        valuesCopy[cellIndex] = { value: event.target.value, name: cell.name, col: cell.col, row: cell.row };
        setSelectedValues(valuesCopy);
        setSelectedCell({ value: event.target.value, name: cell.name, col: cell.col, row: cell.row })
        console.log(cell, event.target.value)
    }

    const handleChangeVariable = (event) => {
        setCustomVariable(event.target.value)
    }

    return (
        <div>
            <h3>Custom Variable</h3>
            <input onChange={(e) => handleChangeVariable(e)} value={customVariable} ></input>
            <h3>Selection Event</h3>
            <h4>{text}</h4>
            <h3>Select Column</h3>
            <div>
                <select name="column" id="columns">
                    {selectedCols.map((v,index) => {
                        if (!v.name) {
                            return <option key={index}></option>
                        }
                        return <option value={v.id}>{v.name}</option>
                    }
                    )}
                </select>
            </div>
            <h3>Selection Area</h3>
            <div>
                {values.map((cell, index) => {
                    if (!cell.name) {
                        return <div key={index}></div>
                    }
                    return <div key={index}>
                        <label>{cell.name}</label>
                        <select name="column" id="columns">
                            {selectedCols.map((col) => {
                                return <option selected={cell.name === col.name} value={col.id}>{col.name}</option>
                            }
                            )}
                        </select>
                        <input onChange={(e) => handleChange(cell, e)} value={cell.value}></input>
                        <br></br>
                    </div>
                }
                )}
            </div>
        </div >
    );
}
