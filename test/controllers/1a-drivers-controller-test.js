// global imports
const assert = require('assert');
const request = require('supertest');
const mongoose = require('mongoose');
// local imports
const app = require('../../app');

const Driver = mongoose.model('driver');

// TEST GROUP(S):-----------------
describe('Drivers controller - 2', () => {

    it('Get to /api/drivers finds drivers in a location', done => {
        const seattleDriver = new Driver({
            email: 'seattle@test.com',
            // location: { type: 'Point', coordinates: [-122.4759902, 47.6147628] }
            location: { coordinates: [-122.4759902, 47.6147628] }
        });
        const miamiDriver = new Driver({
            email: 'miami@test.com',
            // location: { type: 'Point', coordinates: [-80.2534507, 25.791581] }
            location: { coordinates: [-80.2534507, 25.791581] }
        });
        Promise.all([seattleDriver.save(), miamiDriver.save()])
            .then(() => {
                request(app)
                    // .get('/api/drivers?lng=-122&lat=47')
                    .get('/api/drivers?lng=-80&lat=25')
                    .end((err, res) => {
                        // console.log(JSON.stringify(res.body, 0, 2));
                        assert(res.body.length === 1);
                        // assert(res.body[0].email === 'seattle@test.com');
                        assert(res.body[0].email === 'miami@test.com');
                        done();
                    });
            });
    })
});

/*
mongodb queries:
> db.places.createIndex({location: '2dsphere'});
{
	"createdCollectionAutomatically" : true,
	"numIndexesBefore" : 1,
	"numIndexesAfter" : 2,
	"ok" : 1
}
> db.places.insertOne({name: 'rama',
    location:{type: 'Point', coordinates: [-122.4759902, 47.6147628]}});
{
	"acknowledged" : true,
	"insertedId" : ObjectId("5c8115a470680c6fd1218f48")
}
> db.places.insertOne({name: 'shyama',
    location:{type: 'Point', coordinates: [-80.2534507, 25.791581]}});
{
	"acknowledged" : true,
	"insertedId" : ObjectId("5c8115c370680c6fd1218f49")
}

> db.places.find({location:
    {$near: {$geometry: {type: "Point", coordinates: [-80, 25]}, $maxDistance: 2000000}}}); // 200km
{ "_id" : ObjectId("5c8115c370680c6fd1218f49"), "name" : "shyama", "location" : { "type" : "Point", "coordinates" : [ -80.2534507, 25.791581 ] } }

> db.places.find({location:
    {$near: {$geometry: {type: "Point", coordinates: [-122, 47]}, $maxDistance: 2000000}}}); // 200km
{ "_id" : ObjectId("5c8115a470680c6fd1218f48"), "name" : "rama", "location" : { "type" : "Point", "coordinates" : [ -122.4759902, 47.6147628 ] } }

> db.places.find({location: {$near:
    {$geometry: {type: "Point", coordinates: [-122, 47]}, $maxDistance: 200000000}}}); // 20,000km
{ "_id" : ObjectId("5c8115a470680c6fd1218f48"), "name" : "rama", "location" : { "type" : "Point", "coordinates" : [ -122.4759902, 47.6147628 ] } }
{ "_id" : ObjectId("5c8115c370680c6fd1218f49"), "name" : "shyama", "location" : { "type" : "Point", "coordinates" : [ -80.2534507, 25.791581 ] } }

*/