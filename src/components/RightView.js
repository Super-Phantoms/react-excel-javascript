import React, { useEffect, useState } from 'react';
import GC from '@grapecity/spread-sheets';
import { SpreadSheets, Worksheet } from '@grapecity/spread-sheets-react';
import { textState, selectedAreaState, selectedValuesState, selectedColsState, selectedCellState,customVariableState } from '../recoil/atoms';
import { useRecoilState } from 'recoil';
import { IO } from "@grapecity/spread-excelio";


class VariableFunction extends GC.Spread.CalcEngine.Functions.Function {
    constructor(input) {
        super("VARIABLE", 0, 0);
        this.input = input;
    }
    evaluate (arg) {
        return this.input;
    }
}

export default function RightView() {
    const [text, setText] = useRecoilState(textState);
    const [selectedArea, setSelectedArea] = useRecoilState(selectedAreaState);
    const [selectedValues, setSelectedValues] = useRecoilState(selectedValuesState);
    const [selectedCols, setSelectedCols] = useRecoilState(selectedColsState);
    const hostStyle = { width: '800px', height: '600px' };
    const [selectedCell, setSelectedCell] = useRecoilState(selectedCellState);
    const [spread, setSpread] = useState(null);
    const [customVariable, setCustomVariable] = useRecoilState(customVariableState);

    let importExcelFile = null;
    let password = "";

    useEffect(() => {
        console.log(selectedCell, '- Has changed')
        if (spread != null) {
            let sheet = spread.getActiveSheet();
            sheet.setValue(selectedCell.row, selectedCell.col, selectedCell.value)
        } else {
            console.log("spread is null");
        }
    }, [selectedCell])

    useEffect(() => {
        console.log(spread, '- Spread Has changed')
    }, [spread])

    useEffect(() => {
        console.log(customVariable, '- Custom Variable Has changed')
        if (spread != null) {
            let sheet = spread.getActiveSheet();
            sheet.removeCustomFunction("VARIABLE");
            sheet.addCustomFunction(new VariableFunction(customVariable));
            sheet.recalcAll(true);
            console.log("added custom variable to active spread sheet");
        }
    }, [customVariable])

    const changeFile = (e) => {
        importExcelFile = e.target.files[0];
    }

    const changePassword = (e) => {
        password = e.target.value;
    }

    const loadExcel = (e) => {
        let excelIo = new IO();
        let excelFile = importExcelFile;
        // here is excel IO API
        excelIo.open(excelFile, function (json) {
            spread.options.calcOnDemand = true;
            spread.fromJSON(json);
        }, function (e) {
            // process error
            alert(e.errorMessage);
        }, { password: password });
    }

    const initSpread = (spreadsheet) => {

        let spread = spreadsheet;
        spread.options.allowDynamicArray = true;

        // spread.suspendPaint();
        let spreadNS = GC.Spread.Sheets;
        spread.bind(spreadNS.Events.SelectionChanging, function (e, args) {

            let sheet = spread.getActiveSheet();
            let selection = args.newSelections.pop();
            let sheetArea = args.sheetArea === 0 ? 'sheetCorner' : args.sheetArea === 1 ? 'columnHeader' : args.sheetArea === 2 ? 'rowHeader' : 'viewPort';

            // Log event
            let log =
                'SpreadEvent: ' + GC.Spread.Sheets.Events.SelectionChanging + ' event called' + '\n' +
                'sheetArea: ' + sheetArea + '\n' +
                'row: ' + selection.row + '\n' +
                'column: ' + selection.col + '\n' +
                'rowCount: ' + selection.rowCount + '\n' +
                'cellValue: ' + sheet.getCell(selection.row, selection.col).text() + '\n' +
                'colCount: ' + selection.colCount;
            setText(log);

            // Cells selected
            let row = selection.row;
            let col = selection.col;
            let rowCount = selection.rowCount - 1;
            let colCount = selection.colCount - 1;
            let selectedRows = [[]];

            const selectedValues = [];

            // Get selected columns
            const selectedColumns = [];
            for (let c = col; c <= col + colCount; c++) {
                const columnId = sheet.getCell(0, c).text();
                const columnName = sheet.getCell(0, c).text();
                selectedColumns.push({ id: columnId, name: columnName })
            }
            setSelectedCols(selectedColumns);


            // Get selected cells
            for (let r = row; r <= row + rowCount; r++) {
                let selectedCols = [];
                for (let c = col; c <= col + colCount; c++) {
                    console.log(r);
                    console.log(sheet.getCell(0, c).text());
                    console.log(sheet.getCell(r, c).text());
                    console.log(c);
                    console.log(r);
                    selectedCols.push({ name: sheet.getCell(0, c).text(), value: sheet.getCell(r, c).text(), row: r, col: c })
                    selectedValues.push({ name: sheet.getCell(0, c).text(), value: sheet.getCell(r, c).text(), row: r, col: c })
                }
                selectedRows.push(selectedCols)
            }
            setSelectedArea(selectedRows);
            setSelectedValues(selectedValues);
        });

        setSpread(spread);

    }

    return (
        <div>
            <h3>Spreasheet</h3>
            <input type="file" id="fileDemo" className="input" onChange={e => changeFile(e)} />
            <br />
            <input type="button" id="loadExcel" defaultValue="import" className="button" onClick={e => loadExcel(e)} />
            <label>Password:
                <input type="password" id="password" onChange={e => changePassword(e)} />
            </label>
            <div style={hostStyle}>
                <SpreadSheets workbookInitialized={spreadsheet => initSpread(spreadsheet)}>
                    <Worksheet>
                    </Worksheet>
                </SpreadSheets>
            </div>
        </div>
    );

}
