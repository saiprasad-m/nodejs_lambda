const db = require('../config/database');
const Gig = require('../models/Gig');
const Sequelize = require('sequelize');
const Op = Sequelize.Op;





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

    const getBlogs = () => {

        db.authenticate()
        .then( () => console.log('DB connected'))
        .catch(err => console.log('Error', err))

        Gig.findAll()
        .then(gigs => { 
            console.log(gigs);
            send('gigs', {gigs})
        })
        .catch(err => send(err))
    }

    if (event.httpMethod == 'GET') getBlogs();

}