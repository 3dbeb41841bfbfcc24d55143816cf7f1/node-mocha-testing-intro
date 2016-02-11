var should    = require("chai").should(),
expect        = require("chai").expect,
supertest     = require("supertest"),
api           = supertest("http://localhost:3000")


describe("GET /candies", function(){
  
  it("should return a 200 response", function(done){
    api.get("/candies")
    .set("Accept", "application/json")
    .expect(200, done)
  })

  it("should return an array", function(done){
  api
    .get("/candies")
    .set("Accept", "application/json")
    .end(function(error, response){
      expect(response.body).to.be.an('array');
      done()
    })
  })

  it("should return an object that have a field called 'name' ", function(done){
  api
    .get("/candies")
    .set("Accept", "application/json")
    .end(function(error, response){
      expect(response.body[0]).to.have.property('name');
      done()
  })
})

});

describe("POST /candies", function(){

  before(function(done){
    api.post("/candies")
    .set("Accept", "application/json")
    .send({
      "id": 5,
      "name": "Lollipop",
      "color": "Red"
    }).end(done)
  })

  it("should add a candy object to the collection candies and return it", function(done){
  api.get("/candies")
  .set("Accept", "application/json")
  .end(function(error, response){
    expect(response.body.length).to.equal(5);
    done()
  })
})

})

describe("SHOW /candies/:id", function(){
  it("should return and candy", function(done){
    api.get("/candies/4")
    .set("Accept", "application/json")
    .end(function(error, response){
      expect(response.body).to.have.property('name');
      expect(response.body).to.have.property('color');
      done();
    })
  })
})

// describe("DELETE /candies/:id", function(){
//   it("should delete a candy", function(done){
//     api.delete("/candies/4")
//     .set("Accept", "application/json")
//     .end(function(error, response){
//       expect(response.body).to.have.message('deleted');
      
//       done();
//     })
//   })
// })

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







