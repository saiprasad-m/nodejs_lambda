import db  from '../config/database';
import Gig from '../models/Gig';
import Sequelize from 'sequelize';
import redis from 'async-redis';



import { Pool } from 'pg';


const pool = new Pool({
  user: 'apxlwbdjvbvdag',
  password: '8c17069b34b7f46493be895d296b325a62aa8200bffa0f8efa32227731073e52',
  host: 'ec2-107-20-211-10.compute-1.amazonaws.com',
  database: 'd2a0i6uuev19di',
  port: 5432,
  ssl: true
});



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


       /* 
        pool.connect((err) => {
            if (err) {
            console.log('Fail to connect to DB', err);
            } else {
            console.log('Successfully connected to DB');
            }
        });       
       
       try {
            const query = 'SELECT * FROM gigs';
            let result = await pool.query(query);
            console.log(result.rows);
            let data = result.rows;
            send({data});
        } 
        catch (err) {
            console.log(err.stack);
            send(err.stack);
        } 
      */

    

   

}