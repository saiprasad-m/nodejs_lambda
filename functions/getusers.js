const axios = require('axios')


exports.handler = (event, context, callback) => {

    const {
        API_URL,
        API_CLIENT_ID,
        API_CLIENT_SECRET
    } = process.env

    let URL = `${API_URL}?client_id=${API_CLIENT_ID}&client_secret=${API_CLIENT_SECRET}`
    URL = API_URL

    // REsponse handler
    const send = body => {
        callback(null, {
            statusCode: 200,
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept'
            },
            body: JSON.stringify(body)
        })
    }

    const getUsers = () => {
        axios.get(URL)
            .then(res => send(res.data))
            .catch(err => send(err))
    }

    if (event.httpMethod == 'GET') getUsers();

}