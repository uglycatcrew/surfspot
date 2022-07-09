const apiKeyMarine = process.env.MARINE_API_KEY;
const latitude = 41.15597977270496
const longitude = 13.96822317228833
const url = `http://api.worldweatheronline.com/premium/v1/marine.ashx?key=${apiKeyMarine}&format=json&q=${latitude},${longitude}`;

const fetchInfo = async() => {
    const response = await fetch(url)
    const data = await response.json()
    return data
}

export default async function handler(req, res) {
    const result = await fetchInfo()
    res.status(200).json(result)
}
