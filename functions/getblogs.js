import db  from '../config/database';
import Gig from '../models/Gig';
import redis from 'async-redis';


exports.handler = async (event, context) => {

      let  client = redis.createClient(18069, 'redis-18069.c1.asia-northeast1-1.gce.cloud.redislabs.com');
      client.auth('Vkz356AfKLepPe9QHggyhAByn2MSSdHj');
      client.on('error', (err) => {
          console.log('Something went wrong with redis', err)
      });

      client.debug =true;


    const headerPart = {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept'
        };



    //const getBlogs = async () => {

    if (event.httpMethod == 'GET' ) {
        let hitmiss = false;
        const avail = await client.get('getGigs'); //, (error, result) => {
            //console.log('result', avail, avail !== null ? avail.length: 0);
            if(avail === null) {
                console.log('cache miss');
                db.authenticate()
                .then( () => {
                    console.log('DB connected')
                })
                hitmiss= true;       
            }
            else {
                console.log('cache hit');
                hitmiss = false;
                return { statusCode: 200, headers: headerPart, body: avail}
            }
        //}); 
            
        console.log('avail',avail, hitmiss);
        let gigs = await Gig.findAll()
            .then(gigs => {
                client.setex('getGigs', 90, JSON.stringify(gigs));
                return { statusCode: 200, headers: headerPart, body: JSON.stringify(gigs)} 
            })
            .catch(err =>  (
                { statusCode: 200, headers: headerPart, body: JSON.stringify(err)}
            ))
    
        //console.log('gigs',gigs);
        //client.setex('getGigs', 90, JSON.stringify(gigs));
        return gigs;    
    
     
    }

   

}