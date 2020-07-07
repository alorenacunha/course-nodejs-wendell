const {
    get
} = require('axios')

const URL = `https://swapi.dev/api/people`

async function getPeople(nome) {
    const url = `${URL}/?search=${nome}&format=json`
    const result = await get(url)
    console.log("getPeople -> result", result)

    return result.data.results.map(mapPeople)
}

function mapPeople(item) {
    return {
        name: item.name,
        height: item.height
    }
}
module.exports = {
    getPeople,
    mapPeople
}