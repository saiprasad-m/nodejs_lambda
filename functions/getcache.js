const redis = require('redis')


exports.handler = (event, context, callback) => {

    let  client = redis.createClient(18069, 'redis-18069.c1.asia-northeast1-1.gce.cloud.redislabs.com');
    client.auth('Vkz356AfKLepPe9QHggyhAByn2MSSdHj');
    client.on('error', (err) => {
        console.log('Something went wrong with redis', err)
    });

    // REsponse handler
    const send = body => {
        callback(null, {
            statusCode: 200,
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept'
            },
            body: JSON.stringify(body)
        });

        
    }

    const getCache = () => {

        client.get('getUsers', (error, result) => {
            console.log('error',error);
            console.log('result', result !== null ? result.length: 0);
            if(error || result === null) {
                console.log('cache miss');
                send({'error' : 'cache miss'})
            }
            else {
                console.log('cache hit');
                send(JSON.parse(result));
            }
        });
    }

    if (event.httpMethod == 'GET') getCache();

}