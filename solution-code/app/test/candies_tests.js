var should    = require("chai").should();
var expect    = require("chai").expect;
var supertest = require("supertest");
var api       = supertest("http://localhost:3000");

describe("GET /candies", function(){
  it ("should return a 200 response", function(done){
    api
      .get("/candies")
      .set("Accept", "application/json")
      .expect(200, done)
  })

  it ("should return an array", function(done){
    api
      .get("/candies")
      .set("Accept", "application/json")
      .end(function(err, res) {
        expect(res.body).to.be.an('array');
        done();
      })
  })

  it("should return an object that have a field called 'name' ", function(done){
    api
      .get("/candies")
      .set("Accept", "application/json")
      .end(function(err, res){
        expect(res.body[0]).to.have.property('name');
        done();
      })
  })
});

describe("POST /candies", function(){
  before(function(done) {
    api 
      .post("/candies")
      .set("Accept", "application/json")
      .send({
        "id": 5,
        "name": "Lollipop",
        "color": "red"
      }).end(done);
  });

  it ("should add a candy object to the collection candies and return it", function(done) {
    api
      .get("/candies")
      .set("Accept", "application/json")
      .end(function(err, res){
        expect(res.body.length).to.equal(5);
        done();
      })
  })

});

describe('GET /candies/:id', function() {
  it('should have the correct properties & values on the candy object', function(done) {
    api
      .get('/candies/1')
      .set('Accept', 'application/json')
      .end(function(err, res) {
        expect(res.body).to.have.property('id', 1);
        expect(res.body).to.have.property('name', 'Chewing Gum');
        expect(res.body).to.have.property('color', 'Red');
        done();
      });
  });
});

describe('DELETE /candies/:id', function() {
  before(function(done) {
    api
    .delete('/candies/1')
    .set('Accept', 'application/json')
    .end(done);
  });
  it('should delete a candy', function(done) {
    api
    .get('/candies/1')
    .set('Accept', 'application/json')
    .end(function(err, res) {
      expect(res.body).to.equal("");
      done();
    });
  });
});

describe('PUT /candies/:id/edit', function() {
  // Before update: {id: 2, name: "Pez" , color: "Green"},

  before(function(done) {
    api
    .put('/candies/2/edit')
    .set('Accept', 'application/json')
    .send({
      "id": 2,
      "name": "Something",
      "color": "Pink"
    }).end(done);
  });

  it('should update candy 2 to pink', function(done) {
    api
    .get('/candies/2')
    .set('Accept', 'application/json')
    .end(function(err, res) {
      expect(res.body).to.have.property('name', 'Something');
      expect(res.body).to.have.property('color', 'Pink');
      done();
    });
  });
});



