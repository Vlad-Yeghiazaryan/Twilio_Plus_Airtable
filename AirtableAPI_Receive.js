// https://www.twilio.com/console/functions/manage
exports.handler = function(context, event, callback) {
    
  // Airtable_API_Key = Available in the Account page 
  // baseId = Available in https://airtable.com/api (make sure you are logged in)
  
  var Airtable = require('airtable');
  var base = new Airtable({apiKey: context.Airtable_API_Key}).base(context.baseId);
  let response = new Twilio.Response();

// Build list of headers
let headers = {
  "Access-Control-Allow-Origin": "*", // Restricts access to specific urls
  "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type"
};

// Set headers in response
response.setHeaders(headers);

// Data that will be sent to the database
  let member = {
      Name: event.name,
      Url: event.url,
      "Date": Date.now()
  };
  
  // Database required input format
  base('Members').create([
{ 
  "fields": member
}], 
// In case error occurs
function(err, records) {
    if (err) {
      console.error(err);
      return;
    }
    records.forEach(function (record) {
        // Error log and response log
        console.log(record.getId());
        callback(null, response);
    });
  });
};