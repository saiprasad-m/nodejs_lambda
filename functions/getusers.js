const axios = require('axios')


exports.handler = (event, context, callback) => {
    const {name, likes} = JSON.parse(event.body);

    const mesg = JSON.stringify({ msg: 'Hello ' + name + ' likes ' + likes })

    callback(null, {
        statusCode: 200,
        body: mesg
    })
}