# Get-Legislator-Data
The [@unitedstates project](https://theunitedstates.io/) makes data on currently serving members of Congress available in a variety of formats.

The [getLegislatorData.gs](getLegislatorData.gs) Google Apps Script is a Google Sheet-bound script that uses the [URL Fetch Service](https://developers.google.com/apps-script/reference/url-fetch) to retrieve this [data](https://theunitedstates.io/congress-legislators/legislators-current.csv), add hyperlinks to social media accounts, split up the address column, and set the resulting values in the Sheet. The URL Fetch Service is subject to [quotas and limitations](https://developers.google.com/apps-script/guides/services/quotas).

You can find more data and info on the @unitedstates project at [GitHub](https://github.com/unitedstates/).

## Recommend OAuth Scopes
```json
{
    "oauthScopes": [
        "https://www.googleapis.com/auth/spreadsheets.currentonly",
        "https://www.googleapis.com/auth/script.external_request"
    ]
}
```

## Authors
**Jordan Bradford** - GitHub: [jrdnbradford](https://github.com/jrdnbradford)

## License
This script is licensed under the [GPLv3 license](LICENSE.txt).