const fetch = require('node-fetch');

const API_URL = 'https://api.cuvora.com/car/partner/cricket-data';
const API_KEY = 'test-creds@2320';

async function fetchDataFromApi() {
    try {
        const response = await fetch(API_URL, {
            headers: {
                'apiKey': API_KEY
            }
        });
        const data = await response.json();
        return data.matches;
    } catch (error) {
        console.error('Error fetching data from API:', error);
        return null;
    }
}

function analyzeCricketMatches(matches) {
    let highestScore = 0;
    let total300PlusMatches = 0;

    matches.forEach(match => {
        const t1Score = match.t1s;
        const t2Score = match.t2s;

        if (t1Score > highestScore) {
            highestScore = t1Score;
        }
        if (t2Score > highestScore) {
            highestScore = t2Score;
        }

        if (t1Score + t2Score >= 300) {
            total300PlusMatches++;
        }
    });

    console.log(`Highest Score : ${highestScore} and Team Name is : ${"Team Name"}`);
    console.log(`Number Of Matches with total 300 Plus Score : ${total300PlusMatches}`);
}

(async () => {
    const matches = await fetchDataFromApi();
    if (matches) {
        analyzeCricketMatches(matches);
    }
})();
