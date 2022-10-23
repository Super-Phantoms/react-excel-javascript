import { atom } from 'recoil';

export const textState = atom({
    key: 'textState', // unique ID (with respect to other atoms/selectors)
    default: "pending init", // default value (aka initial value)
});

export const selectedAreaState = atom({
    key: 'selectedAreaState', // unique ID (with respect to other atoms/selectors)
    default: [[]], // default value (aka initial value)
});

export const selectedValuesState = atom({
    key: 'selectedValues', // unique ID (with respect to other atoms/selectors)
    default: [], // default value (aka initial value)
});

export const selectedColsState = atom({
    key: 'selectedCols', // unique ID (with respect to other atoms/selectors)
    default: [], // default value (aka initial value)
});

export const selectedCellState = atom({
    key: 'selectedCell', // unique ID (with respect to other atoms/selectors)
    default: [], // default value (aka initial value)
});

export const customVariableState = atom({
    key: 'customVariableState', // unique ID (with respect to other atoms/selectors)
    default: 0, // default value (aka initial value)
});