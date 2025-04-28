 function formatStringAll(textValue, numberValue){
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


  if (numberValue<0){
      var formattedString =  "- Negative RoC in **"+ name + "** (" + numberValue.toFixed(2) + ")"; // Adjust format as needed
    }
    if (numberValue>0){
      var formattedString =  "- Positive RoC in **"+ name + "** (+" + numberValue.toFixed(2) + ")"; // Adjust format as needed
    }
    if (numberValue==0){
      var formattedString =  "- No Change in **"+ name + "** (" + numberValue.toFixed(2) + ")"; // Adjust format as needed
    }
    return formattedString
}

function combineValues1_1() {
    var spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
    
    // Get text value from Sheet1!A1
    var textSheet = spreadsheet.getSheetByName("1 - TOTAL LTPI");
    var textValue = textSheet.getRange("B1").getValue();
    
    // Get numeric value from Sheet2!B1
    var numberSheet = spreadsheet.getSheetByName("1 - TOTAL LTPI");
    var numberValue = numberSheet.getRange("N6").getValue();
    
    var formattedString = formatStringAll(textValue, numberValue);

    // Output the result to Sheet3!C1
    var outputSheet = spreadsheet.getSheetByName("Raport");
    outputSheet.getRange("B5").setValue(formattedString);
}

function combineValues2_1() {
    var spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
    
    // Get text value from Sheet1!A1
    var textSheet = spreadsheet.getSheetByName("2 - TOTAL MTPI");
    var textValue = textSheet.getRange("D1").getValue();
    
    // Get numeric value from Sheet2!B1
    var numberSheet = spreadsheet.getSheetByName("2 - TOTAL MTPI");
    var numberValue = numberSheet.getRange("O7").getValue();
    
    var formattedString = formatStringAll(textValue, numberValue);

    // Output the result to Sheet3!C1
    var outputSheet = spreadsheet.getSheetByName("Raport");
    outputSheet.getRange("B6").setValue(formattedString);
}

function combineValues3_1() {
    var spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
    
    // Get text value from Sheet1!A1
    var textSheet = spreadsheet.getSheetByName("3 - Conservative Trend");
    var textValueETHBTC = textSheet.getRange("F9").getValue();
    var textValueSOLBTC = textSheet.getRange("F21").getValue();
    var textValueSOLETH = textSheet.getRange("F33").getValue();
    
    // Get numeric value from Sheet2!B1
    var numberSheet = spreadsheet.getSheetByName("3 - Conservative Trend");
    var numberValueETHBTC = numberSheet.getRange("C12").getValue();
    var numberValueSOLBTC = numberSheet.getRange("C24").getValue();
    var numberValueSOLETH = numberSheet.getRange("C36").getValue();
    var outputSheet = spreadsheet.getSheetByName("Raport");
    var formattedStringETHBTC = formatStringAll(textValueETHBTC, numberValueETHBTC);
    var formattedStringSOLBTC = formatStringAll(textValueSOLBTC, numberValueSOLBTC);
    var formattedStringSOLETH = formatStringAll(textValueSOLETH, numberValueSOLETH);

    outputSheet.getRange("B7").setValue(formattedStringETHBTC);
    outputSheet.getRange("B8").setValue(formattedStringSOLBTC);
    outputSheet.getRange("B9").setValue(formattedStringSOLETH);
}

function combineValues4_1() {
    var spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
    
    // Get text value from Sheet1!A1
    var textSheet = spreadsheet.getSheetByName("4 - Trash Trend");
    var textValue = textSheet.getRange("I1").getValue();
    
    // Get numeric value from Sheet2!B1
    var numberSheet = spreadsheet.getSheetByName("4 - Trash Trend");
    var numberValue = numberSheet.getRange("K7").getValue();
    
    var formattedString = formatStringAll(textValue, numberValue);

    // Output the result to Sheet3!C1
    var outputSheet = spreadsheet.getSheetByName("Raport");
    outputSheet.getRange("B10").setValue(formattedString);
}
function date_1(){
    var sheet = SpreadsheetApp.getActiveSpreadsheet();
    var cell = sheet.getRange("B4"); // Change "A1" to your desired cell
    
    var today = new Date();
    var options = { day: '2-digit', month: 'short'};
    const formattedDate = today.toLocaleDateString("en-US", options).split(" ");

    const finalDate = "**"+`${formattedDate[1]} ${formattedDate[0]}` + "**";
    
    cell.setValue(finalDate);
}

function combineAll_1(){
  date_1();
  combineValues1_1();
  combineValues2_1();
  combineValues3_1();
  combineValues4_1();
}