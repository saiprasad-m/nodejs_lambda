import axios from 'axios';

exports.handler = async (event, context) => {

    const {
        API_URL,
        API_CLIENT_ID,
        API_CLIENT_SECRET
    } = process.env

    let URL = `${API_URL}?client_id=${API_CLIENT_ID}&client_secret=${API_CLIENT_SECRET}`
    URL = API_URL

    const header = {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept'
    }

    if (event.httpMethod == 'GET') {
    return axios.get(URL )
            .then(res => (
                 {statusCode: 200, headers: header, body: JSON.stringify(res.data)}
            ))
            .catch(err => (
                {statusCode: 200, headers: header, body: JSON.stringify({'error': err})}
            ))    

    }



}