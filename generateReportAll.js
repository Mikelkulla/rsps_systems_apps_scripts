 function formatStringAll_2(textValue, stateValue, numberValue){
  var name
  if (textValue =="1 - TOTAL LTPI"){
    name = "TOTAL LTPI";
  }
  if (textValue =="2 - TOTAL MTPI"){
    name = "TOTAL MTPI";
  }
  if (textValue =="ETHBTC TPI"){
    name = "ETHBTC MTPI";
  }
  if (textValue =="SOLBTC TPI"){
    name = "SOLBTC MTPI";
  }  
  if (textValue =="SOLETH TPI"){
    name = "SOLETH MTPI";
  }
  if (textValue =="4 - Trash Trend"){
    name = "OTHERS.D MTPI";
  }

  // Pad name to ensure it has 25 characters (including `**` and `:`)
  name = `**${name}**:`; // Adding the ** and : first
  var formattedString;
  if (numberValue < 0) {
    formattedString = `- ${name} ${stateValue} (${numberValue.toFixed(2)})`; // Adjust format as needed
  }
  if (numberValue > 0) {
    formattedString = `- ${name} ${stateValue} (+${numberValue.toFixed(2)})`; // Adjust format as needed
  }
  if (numberValue == 0) {
    formattedString = `- ${name} ${stateValue} (${numberValue.toFixed(2)})`; // Adjust format as needed
  }
  // if (numberValue<0){
  //     var formattedString =  "- **"+ name + "**: "+ stateValue +" (" + numberValue.toFixed(2) + ")"; // Adjust format as needed
  // }
  // if (numberValue>0){
  //     var formattedString =  "- **"+ name + "**: "+ stateValue +" (+" + numberValue.toFixed(2) + ")";; // Adjust format as needed
  // }
  // if (numberValue==0){
  //     var formattedString =  "- **"+ name + "**: "+ stateValue +" (" + numberValue.toFixed(2) + ")"; // Adjust format as needed
  // }
  return formattedString
}

function combineValues1_2() {
    var spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
    
    // Get text value from Sheet1!A1
    var textSheet = spreadsheet.getSheetByName("1 - TOTAL LTPI");
    var textValue = textSheet.getRange("B1").getValue();
    var stateValue = textSheet.getRange("L31").getValue()
    // Get numeric value from Sheet2!B1
    var numberSheet = spreadsheet.getSheetByName("1 - TOTAL LTPI");
    var numberValue = numberSheet.getRange("I31").getValue();
    
    var formattedString = formatStringAll_2(textValue, stateValue, numberValue);

    // Output the result to Sheet3!C1
    var outputSheet = spreadsheet.getSheetByName("Raport");
    outputSheet.getRange("A5").setValue(formattedString);
}

function combineValues2_2() {
    var spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
    
    // Get text value from Sheet1!A1
    var textSheet = spreadsheet.getSheetByName("2 - TOTAL MTPI");
    var textValue = textSheet.getRange("D1").getValue();
    var stateValue = textSheet.getRange("M35").getValue()
    // Get numeric value from Sheet2!B1
    var numberSheet = spreadsheet.getSheetByName("2 - TOTAL MTPI");
    var numberValue = numberSheet.getRange("L35").getValue();
    
    var formattedString = formatStringAll_2(textValue, stateValue, numberValue);

    // Output the result to Sheet3!C1
    var outputSheet = spreadsheet.getSheetByName("Raport");
    outputSheet.getRange("A6").setValue(formattedString);
}

function combineValues3_2() {
    var spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
    
    // Get text value from Sheet1!A1
    var textSheet = spreadsheet.getSheetByName("3 - Conservative Trend");
    var textValueETHBTC = textSheet.getRange("F9").getValue();
    var textValueSOLBTC = textSheet.getRange("F21").getValue();
    var textValueSOLETH = textSheet.getRange("F33").getValue();
    
    // Get numeric value from Sheet2!B1
    var numberSheet = spreadsheet.getSheetByName("3 - Conservative Trend");
    var stateValueETHBTC = textSheet.getRange("J19").getValue();
    var stateValueSOLBTC = textSheet.getRange("J31").getValue();
    var stateValueSOLETH = textSheet.getRange("J43").getValue();
    var numberValueETHBTC = numberSheet.getRange("I19").getValue();
    var numberValueSOLBTC = numberSheet.getRange("I31").getValue();
    var numberValueSOLETH = numberSheet.getRange("I43").getValue();
    var outputSheet = spreadsheet.getSheetByName("Raport");
    var formattedStringETHBTC = formatStringAll_2(textValueETHBTC, stateValueETHBTC, numberValueETHBTC);
    var formattedStringSOLBTC = formatStringAll_2(textValueSOLBTC, stateValueSOLBTC, numberValueSOLBTC);
    var formattedStringSOLETH = formatStringAll_2(textValueSOLETH, stateValueSOLETH, numberValueSOLETH);

    outputSheet.getRange("A7").setValue(formattedStringETHBTC);
    outputSheet.getRange("A8").setValue(formattedStringSOLBTC);
    outputSheet.getRange("A9").setValue(formattedStringSOLETH);
}

function combineValues4_2() {
    var spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
    
    // Get text value from Sheet1!A1
    var textSheet = spreadsheet.getSheetByName("4 - Trash Trend");
    var textValue = textSheet.getRange("I1").getValue();
    var stateValue = textSheet.getRange("I18").getValue();
    
    // Get numeric value from Sheet2!B1
    var numberSheet = spreadsheet.getSheetByName("4 - Trash Trend");
    var numberValue = numberSheet.getRange("H18").getValue();
    
    var formattedString = formatStringAll_2(textValue, stateValue, numberValue);

    // Output the result to Sheet3!C1
    var outputSheet = spreadsheet.getSheetByName("Raport");
    outputSheet.getRange("A10").setValue(formattedString);
}
function date_2(){
    var sheet = SpreadsheetApp.getActiveSpreadsheet();
    var cell = sheet.getRange("A4"); // Change "A1" to your desired cell
    
    var today = new Date();
    var options = { day: '2-digit', month: 'short'};
    const formattedDate = today.toLocaleDateString("en-US", options).split(" ");

    const finalDate = "**"+`${formattedDate[1]} ${formattedDate[0]}` + "**";
    
    cell.setValue(finalDate);
}

function combineAll_2(){
  date_2();
  combineValues1_2();
  combineValues2_2();
  combineValues3_2();
  combineValues4_2();
}