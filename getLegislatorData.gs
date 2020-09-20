/*

Copyright 2020 Jordan Bradford
GitHub: jrdnbradford
Fetched CSV data and related info can be found on GitHub:
https://github.com/unitedstates/congress-legislators

License: GPLv3
This program is free software: you can redistribute it and/or modify
it under the terms of the GNU General Public License as published by
the Free Software Foundation, either version 3 of the License, or
(at your option) any later version.

This program is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU General Public License for more details.

You should have received a copy of the GNU General Public License
along with this program.  If not, see <https://www.gnu.org/licenses/>.

*/


function onOpen() {
    SpreadsheetApp
    	.getUi()
        .createMenu("Legislator Data")
        .addItem("Get/Update Legislator Data", "getLegislatorData")
        .addToUi();
}


function getLegislatorData() {
	const ACTIVESHEET = SpreadsheetApp.getActiveSheet().clear();
	const URL = "https://theunitedstates.io/congress-legislators/legislators-current.csv";
	const RESPONSE = UrlFetchApp.fetch(URL);
	const HTTPCODE = RESPONSE.getResponseCode();
	if (HTTPCODE != 200) {
		throw new Error("HTTP code: " + HTTPCODE + ".");
	}

	// CSVDATA are the values set in the Sheet and/or returned
	const CSVDATA = Utilities.parseCsv(RESPONSE.getContentText(), ",");
	const HEADER = CSVDATA[0];
	const DATA = CSVDATA.slice(1);

	// BEGIN ADD SOCIAL MEDIA HYPERLINKS
	const TWITTERINDEX = HEADER.indexOf("twitter");
	const FACEBOOKINDEX = HEADER.indexOf("facebook");
	const YOUTUBEINDEX = HEADER.indexOf("youtube");
	const SOCIALMEDIACOLUMNINDICES = [
		TWITTERINDEX,
		FACEBOOKINDEX,
		YOUTUBEINDEX
	];
	const SOCIALMEDIASITES = [
		"https://www.twitter.com/",
		"https://www.facebook.com/",
		"https://www.youtube.com/"
	];
	// Loop through each row (except header)
	for (let i = 0; i < DATA.length; i++) {
		let row = DATA[i];
		// Loop through each social media column index to get handles
		for (let j = 0; j < SOCIALMEDIACOLUMNINDICES.length; j++) {
			let handle = row[SOCIALMEDIACOLUMNINDICES[j]];
			if (handle != "") { // Replace handle with hyperlink in data to be set/returned
				CSVDATA[i+1][SOCIALMEDIACOLUMNINDICES[j]] = `=HYPERLINK("${SOCIALMEDIASITES[j]}${handle}", "${handle}")`;
				// CSVDATA[i+1][SOCIALMEDIACOLUMNINDICES[j]] = "${SOCIALMEDIASITES[j]}${handle}";
			}
		} // End adding social media hyperlinks for particular row
	} // End loop through all rows
	// END ADD SOCIAL MEDIA HYPERLINKS

	ACTIVESHEET.setFrozenRows(1);
	ACTIVESHEET.getRange(1, 1, CSVDATA.length, HEADER.length).setValues(CSVDATA);

	// Sort by state
	//const STATEINDEX = HEADER.indexOf("state");
	//ACTIVESHEET.sort(STATEINDEX + 1, true);
	return CSVDATA;
}