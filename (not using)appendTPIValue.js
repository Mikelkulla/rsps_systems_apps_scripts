function appendValueToRangeIfTextNotUpdated() {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  
  // Specify the range to append to (e.g., A1:A10)
  const range = sheet.getRange('B1:B1000'); // Change this to your desired range
  const values = range.getValues();

  // Get the value to append from a specific cell (e.g., B1)
  const valueToAppend = sheet.getRange('I1').getValue(); // Change this to your cell

  // Get the text to check (e.g., C1)
  const textToCheck = sheet.getRange('K1').getValue(); // Change this to your text cell

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

