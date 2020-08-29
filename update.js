const fs = require('fs');
const axios = require('axios');
const apiBaseUrl = 'https://api.coingecko.com/api/v3/'

async function getBasicData() {
	try {
		const response = await axios.get(`${apiBaseUrl}coins/markets`, {
			params: {
				vs_currency: 'usd',
				order: 'market_cap_desc',
				per_page: 15,
				page: 1,
				sparkline: false
			}
		});

		return response.data.map((coin) => {
			return {
				id: coin.id,
				symbol: coin.symbol,
				image: coin.image,
				name: coin.name,
				current_price: coin.current_price,
				market_cap: coin.market_cap,
				market_cap_rank: coin.market_cap_rank
			}
		})
	} catch (error) {
		console.error(error);
	}
}

async function getMarketData() {
	let marketData = await getBasicData();

	fs.writeFile('data/marketData.json', JSON.stringify(marketData), (err) => {
		if (err) {
			return console.log('Error writing file: ', err);
		}

		console.log('Current market data written to data.json');
	});
}

getMarketData();
