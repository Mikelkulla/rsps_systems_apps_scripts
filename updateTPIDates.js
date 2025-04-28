function updateDate1() {
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    var cell = sheet.getRange("N5"); // Change "A1" to your desired cell
    
    var today = new Date();
    var options = { day: '2-digit', month: 'long', year: 'numeric' };
    var formattedDate = today.toLocaleDateString("en-US", options); // Format as DD Month YYYY
    
    cell.setValue(formattedDate);
}
function updateDate2() {
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    var cell = sheet.getRange("O6"); // Change "A1" to your desired cell
    
    var today = new Date();
    var options = { day: '2-digit', month: 'long', year: 'numeric' };
    var formattedDate = today.toLocaleDateString("en-US", options); // Format as DD Month YYYY
    
    cell.setValue(formattedDate);
}
function updateDate3() {
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    var cell = sheet.getRange("O5"); // Change "A1" to your desired cell
    
    var today = new Date();
    var options = { day: '2-digit', month: 'long', year: 'numeric' };
    var formattedDate = today.toLocaleDateString("en-US", options); // Format as DD Month YYYY
    
    cell.setValue(formattedDate);
}
function updateDate4() {
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    var cell = sheet.getRange("K6"); // Change "A1" to your desired cell
    
    var today = new Date();
    var options = { day: '2-digit', month: 'long', year: 'numeric' };
    var formattedDate = today.toLocaleDateString("en-US", options); // Format as DD Month YYYY
    
    cell.setValue(formattedDate);
}