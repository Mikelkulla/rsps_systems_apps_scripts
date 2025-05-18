function tournamentEndpoint() {
  // Define the endpoint URL
  const url = "https://crypto-systems-main-335747774758.europe-west1.run.app/calculate_shitcoins_tournament";
  
  try {
    // Make the GET request
    const response = UrlFetchApp.fetch(url, {
      method: "get",
      muteHttpExceptions: true
    });
    
    // Get the response code
    const responseCode = response.getResponseCode();
    
    // Check if the request was successful
    if (responseCode !== 200) {
      Logger.log("Error: Received response code " + responseCode);
      Logger.log("Response: " + response.getContentText());
      return;
    }
    
    // Parse the JSON response
    const data = JSON.parse(response.getContentText());
    
    // Check the status
    if (data.status === "success") {
      Logger.log("Success: " + data.message);
      Logger.log("Note: This endpoint confirms the calculation was successful, but does not return the tournament data. Check the Flask app logs on Cloud Run for results, or call a different endpoint to retrieve the data.");
    } else {
      Logger.log("Unexpected status: " + data.status);
      Logger.log("Message: " + data.message);
    }
    
    // Return the response for further use if needed
    return data;
  } catch (error) {
    Logger.log("Error calling endpoint: " + error);
  }
}