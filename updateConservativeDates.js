function updateConservativeDates() {
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    var cellETHBTC = sheet.getRange("c11"); // Change "A1" to your desired cell
    var cellSOLBTC = sheet.getRange("c23");
    var cellSOLETH = sheet.getRange("c35");
    var cellSUIDominant = sheet.getRange("c47")

    var today = new Date();
    var options = { day: '2-digit', month: 'long', year: 'numeric' };
    var formattedDate = today.toLocaleDateString("en-US", options); // Format as DD Month YYYY
    
    cellETHBTC.setValue(formattedDate);
    cellSOLBTC.setValue(formattedDate);
    cellSOLETH.setValue(formattedDate);
    cellSUIDominant.setValue(formattedDate);
}