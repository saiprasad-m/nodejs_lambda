const db = require('../config/database');
const Gig = require('../models/Gig');
const Sequelize = require('sequelize');
const Op = Sequelize.Op;
const redis = require('redis');



const { Pool } = require('pg');


const pool = new Pool({
  user: 'apxlwbdjvbvdag',
  password: '8c17069b34b7f46493be895d296b325a62aa8200bffa0f8efa32227731073e52',
  host: 'ec2-107-20-211-10.compute-1.amazonaws.com',
  database: 'd2a0i6uuev19di',
  port: 5432,
  ssl: true
});



exports.handler = (event, context, callback) => {

    pool.connect((err) => {
        if (err) {
          console.error(err);
        } else {
          console.log('Successfully connected to DB');
        }
      });

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
        })
    }

    const getBlogs = async () => {


        client.get('getGigs', (error, result) => {
            console.log('error',error);
            console.log('result', result !== null ? result.length: 0);
            if(error || result === null) {
                console.log('cache miss');

                db.authenticate()
                .then( () => {
                    console.log('DB connected')
        
                    Gig.findAll()
                    .then(gigs => { 
                        client.setex('getGigs', 90, JSON.stringify(gigs), redis.print);
                        send({gigs});
                    })
                    .catch(err => send(err));
                })
                .catch(err => console.log('Error', err))

            }
            else {
                console.log('cache hit');
                send(JSON.parse(result));
            }
        });        

       /* try {
        const query = 'SELECT * FROM gigs';
        let result = await pool.query(query);
        console.log(result.rows);
        let data = result.rows;
        send({data});
      } catch (err) {
        console.log(err.stack);
        send(err.stack);
      } */

    }

    if (event.httpMethod == 'GET') getBlogs();

}