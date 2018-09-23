// Problem: We need a simple way to look at a user's badge count and JavaScript points
// Solution: Use Node.js to connect to Treehouse's API to get profile information to print out
const https = require('https');
const http = require('http');

// local imports
const printMessage = require('./print.js');
const PrintError = require('./printerrors.js');

const getProfile = username => {
    try {
        // connect to teamtreehouse api url(https://teamtreehouse.com/dennismwangi2.json)
        const request = https.get(`https://teamtreehouse.com/${username}.json`, response => {
            if (response.statusCode === 200) {
                let responseBody = "";

                // read the data
                response.on("data", data => {
                    responseBody += data.toString();
                });

                // parse to json and print the data
                response.on("end", () => {
                    try {
                        const profile = JSON.parse(responseBody);
                        printMessage.print(username, profile.badges.length, profile.points.JavaScript);
                    } catch (error) {
                        PrintError.errorReport(error);
                    }
                });
            } else {
                const message = `There was an error fetching the profile for ${username} (${http.STATUS_CODES[response.statusCode]})`;
                const statusCodeErr = new Error(message)
                PrintError.errorReport(statusCodeErr);
            }
        });
        request.on("error", error => PrintError.errorReport(error));
    } catch (error) {
        PrintError.errorReport(error);
    }
} // end getProfile

module.exports.get = getProfile;