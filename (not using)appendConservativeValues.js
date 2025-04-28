function appendValuesToRangesIfTextNotUpdated() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  
  const sheetsNames = ['3.1.1 - ETHBTC', '3.1.2 - SOLBTC', '3.1.3 - SOLETH'] // , '3.1.4 - SUIETH', '3.1.5 - SUISOL', '3.1.6 - SUIBTC'

  // Define the cell/range to append to, and the cells to get the value and text for each sheet
  const rangeToAppend = 'B1:B1000'; // Range to append to
  const valueCell = 'I1';           // Cell where the value to append is located
  const textCheckCell = 'K1';       // Cell where the text "Updated" is checked

  sheetsNames.forEach(sheetName => {
    const sheet = ss.getSheetByName(sheetName);
    
    if (sheet) {
      // Specify the range to append to (e.g., A1:A10)
      const range = sheet.getRange(rangeToAppend); // Change this to your desired range
      const values = range.getValues();

      // Get the value to append from a specific cell (e.g., B1)
      const valueToAppend = sheet.getRange(valueCell ).getValue(); // Change this to your cell

      // Get the text to check (e.g., C1)
      const textToCheck = sheet.getRange(textCheckCell).getValue(); // Change this to your text cell

      // Check if the text is not "updated"
      if (textToCheck !== "Updated") {
        // Find the first empty row in the range
        let emptyRow = values.findIndex(row => row[0] === '');
        if (emptyRow === -1) {
          // If no empty row is found, append to the end of the range
          emptyRow = values.length;
        }

        // Set the value in the first empty cell
        sheet.getRange(emptyRow + 1, range.getColumn()).setValue(valueToAppend);
      } else {
        // Optional: Show an alert if the text is "updated"
        SpreadsheetApp.getUi().alert('The text is marked as "updated". No value was appended.');
      }


    }    
  
  
  });
}
