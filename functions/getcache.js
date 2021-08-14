import redis from  'async-redis';
import querystring from "querystring";



exports.handler = async (event, context) => {

    let  client = redis.createClient(10659, 'redis-10659.c1.asia-northeast1-1.gce.cloud.redislabs.com');
    client.auth('lHO1jeUPJL7lK0OQV9YGtR3TctUInYM9');
    client.on('error', (err) => {
        console.log('Something went wrong with redis', err)
    });
    client.debug = true;
    
    // REsponse handler
    const headerset =  {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept'
            }

   
        if (event.httpMethod == 'GET') {
            console.log('event.queryStringParameters', event.queryStringParameters, event.path);
            let keylist = Object.keys(event.queryStringParameters)[0];
            console.log('keylist', (keylist === undefined) ? 0 : keylist.length)
            if (keylist === undefined) {
                return {statusCode: 200, headers: headerset, body: JSON.stringify( {"cacheResponse" : "failed"})}                
            }
            const cacheResponse = await client.get(keylist); // , (error, result ) =>  {
                if(cacheResponse && keylist !== undefined) {
                    return {statusCode: 200, headers: headerset, body: cacheResponse}
                }
                else {
                    //await client.setex(keylist, 90, JSON.stringify(event));
                    return {statusCode: 200, headers: headerset, body: JSON.stringify( {"cacheResponse" : "failed"})}
                }

            //});


        }
/*         client.get('getUsers', (error, result) => {
            console.log('error',error);
            console.log('result', result !== null ? result.length: 0);
            if(error || result === null) {
                console.log('cache miss');
            }
            else {
                console.log('cache hit');
             }
        }); */
         

}