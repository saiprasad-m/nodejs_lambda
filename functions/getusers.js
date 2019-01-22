const axios = require('axios')
const redis = require('redis')


exports.handler = (event, context, callback) => {

    const {
        API_URL,
        API_CLIENT_ID,
        API_CLIENT_SECRET
    } = process.env

    let URL = `${API_URL}?client_id=${API_CLIENT_ID}&client_secret=${API_CLIENT_SECRET}`
    URL = API_URL

    let  client = redis.createClient(18069, 'redis-18069.c1.asia-northeast1-1.gce.cloud.redislabs.com');
    client.auth('Vkz356AfKLepPe9QHggyhAByn2MSSdHj');
    client.on('error', (err) => {
        console.log('Something went wrong with redis', err)
    });
    /* 
    client.set('my test key', 'my test value', redis.print);
    client.get('my test key', (error, result) => {
      if (error) throw error;
      console.log('GET result ->', result)
    });
    */
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

    const getUsers = () => {


        client.get('getUsers', (error, result) => {
            console.log('error',error);
            console.log('result', result !== null ? result.length: 0);
            if(error || result === null) {
                console.log('cache miss');
                axios.get(URL)
                    .then(res => { 
                        client.setex('getUsers', 90, JSON.stringify(res.data), redis.print);
                        send(res.data);
                    })
                    .catch(err => send(err))
            }
            else {
                console.log('cache hit');
                send(JSON.parse(result));
            }
        });
    }

    if (event.httpMethod == 'GET') getUsers();

}