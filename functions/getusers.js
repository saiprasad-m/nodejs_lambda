const axios = require('axios')


exports.handler = (event, context, callback) => {

    const API_URL= 'https://api.github.com/users';
    const API_CLIENT_ID=  '62d9feb46632996f62e3';
    const API_CLIENT_SECRET = 'c46f0312fc3467b96ace4d7abadefdf6cd94a175';

    const URL = `${API_URL}?client_id=${API_CLIENT_ID}&client_secret=${API_CLIENT_SECRET}`

    // REsponse handler
    const send = body => {
        callback(null, {
            statusCode: 200,
            headers: {
                'Access-Control-Allow-Origin' : '*',
                'Access-Control-Allow-Headers' : 
                'Origin, X-Requested-With, Content-Type, Accept'
            },
            body: JSON.stringify(body)
        })
    }

    const getUsers = () => {
        axios.get(URL)
            .then( res => send(res.data))
            .catch(err => send(err))
    }

    if(event.httpMethod == 'GET') getUsers();

}