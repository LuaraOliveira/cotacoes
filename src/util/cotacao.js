const request = require('request')

const api_token = 'TPOuubtaPZEQRD7w9RsMhs1yKAHdfWM1oCETGqmrB0wijkIGOKu5CVNdtjJi'

const cotacao = (symbol, callback) => {


    const url = `https://api.worldtradingdata.com/api/v1/stock?symbol=${symbol}&api_token=${api_token}`
    request({ url: url, json: true }, (err, response) => {
        if (err) {
            callback({
                message: `Something went wrong: ${err}`,
            }, undefined)
        }
        if (response.body === undefined || response.body.data === undefined) {
            callback({
                message: `No data found`,
            }, undefined)
        }

        const parsedJSON = response.body.data[0]
        const { symbol, price_open, price, day_high, day_low } = parsedJSON

        callback(undefined, { symbol, price_open, price, day_high, day_low })
    })
}


module.exports = cotacao