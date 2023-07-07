# Excel Spreadsheet Javascript SpreadJS
React SpreadJS Excel Spreadsheet Javascript proof of concept that supports
1. Reference excel data into app
2. Reference excel data into app with custom mapping
3. Reference app data into excel

As a proof of concept, it contains only the main pieces to accomplish the functionality.

## Proof of concept
### Reference excel data into app
1. Land on a view, split it in two vertical sections
2. on the LHS have a list of input rows with two fields: "name" and "value"
3. on the RHS the user can upload an excel file, which gets rendered in the RHS of the view, preserving the formatting as displayed if the file was opened with excel
4. the user can navigate cells of the excel file with arrow keys
5. the user can select cell ranges with the fill handle
6. the selected values populate the input fields on the LHS
### Reference excel data into app with custom mapping
1. as the user selects a cell range or updates the selection, the values appear / update live on the LHS of the view, populating the fields
2. show as many input rows as needed based on the dynamic size of the cell range
3. e.g. if the user selects the range C3:D10, create 8 rows 
4. via a dropdown for each column, allow the user to decide which excel column maps to what LHS field
5. e.g. if the user selects the range C3:D10, let them decide whether column C will map to the "name" field or the "value" field and similarly for column D
### Reference app data into excel
1. have a new, seperate input on the top of the LHS called "variable"
2. the user can input a number in the variable field
3. in the RHS spreadsheet, the user can reference the value with a formula e.g. =VARIABLE
4. the user can use this value to make calculations over a range of cells
5. e.g. cell D3 has the following formula: =C3 * VARIABLE and C3 is a percentage e.g. 10%
6. and D3 is dragged all the way to D10 so that the formulae follow the pattern D[N] = C[N] * VARIABLE
7. by selecting the range (e.g. C3:D10), the calculated values can be referenced back into the LHS similarly to step 1. and 2.


## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. See deployment for notes on how to deploy the project on a live system.

### Prerequisites

What things you need to install the software and how to install them

```
https://nodejs.org/en/
```

### Installing

A step by step series of examples that tell you how to get a development env running

Download the NodeJS Project

```
https://github.com/angelospillos/excel-spreadsheet-javascript
```

Then install the dependencies

```
npm i
```

Then use the following command to run it

```
npm run start
```

Load the example excel file provided in the repository [spreadsheet-example.xlsx](spreadsheet-example.xlsx)

## Running the tests

Do to time constrains there are no automated tests for this system
but you can use the APP for manual testing.

### Reference excel data into app
1. Load an excel file through the import.
2. Select a range of the celss
3. The selected cells will be shown on the left hand side with their columns.

### Reference excel data into app with custom mapping
1. Once you select something on the excel file you can see the values into the app
2. Updating the value of a selection on the app, it will update the value in the excel file 

### Reference app data into excel
1. Updating the variable on the left view it will create a custom variable in the excel file.
2. The value can be referenced in the excel file by typing =VARIABLE()

## Deployment

To Deploy this on a live system follow https://www.netlify.com/blog/2016/07/22/deploy-react-apps-in-less-than-30-seconds/

## Built With

* [Node.js](https://nodejs.org) - Node.js® is a JavaScript runtime built on Chrome's V8 JavaScript engine.
* [SpreadJS](https://www.grapecity.com/spreadjs) - Deliver true Excel-like spreadsheet experiences, fast - with zero dependencies on Exce.
* [React](https://reactjs.org/) - A JavaScript library for building user interfaces.
* [Recoil](https://recoiljs.org/) - A state management library for React.

## Versioning

For the versions available, see the [tags on this repository](https://github.com/angelospillos/gateway/tags). 

## Authors

* **Angelos Pillos** - (https://www.angelospillos.com)

See also the list of [contributors](https://github.com/angelospillos/gateway/graphs/contributors) who participated in this project.

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details

## Acknowledgments

* Special thanks for the inspiration to Pactio (https://www.pactio.io/)
