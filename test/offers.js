let chai = require("chai");
let should = chai.should();
const request = require("supertest");
const url = "http://localhost:5000/api/v1";
const Post = require("./../models/Post");
let incompleteOffer = require("./testDummyData").incompleteOffer;
let completeOffer = require("./testDummyData").completeOffer;
const login = () => require("./helper").login();
let token = null;
let _id = null;
describe("Test CRUD Offers", () => {
  it("Should be able to login sucessfully", (done) => {
    let loginCred = {
      email: "shishirkaji@gmail.com",
      password: "asdfasdf1",
    };
    request(url)
      .post("/auth/members")
      .send(loginCred)
      .then((res) => {
        if (res.status === 200) {
          token = res.body.token;
          res.should.have.property("status", 200);
          done();
        }
      });
  });
  it("Should send error if no token is sent", (done) => {
    request(url)
      .post("/post")
      .send(incompleteOffer)
      .then((res) => {
        res.should.have.property("status", 400);
        res.body.should.be.a("object");
        res.body.errors.should.have.a("array");
        if (res.body.errors[0].msg !== "Authorization denied!")
          return done(new Error("Wrong message in the res.body!"));
        done();
      })
      .catch((err) => done(err));
  });

  it("Should not add offer without title and category", (done) => {
    request(url)
      .post("/post")
      .set("x-auth-token", token)
      .send(incompleteOffer)
      .then((res) => {
        res.should.have.property("status", 400);
        res.body.should.be.a("object");
        res.body.errors.should.be.a("array");
        done();
      })
      .catch((err) => done(err));
  });
  // it("should be abe to add offer when complete json is provided", (done) => {
  it("Should add offer if all required fields are provided", (done) => {
    request(url)
      .post("/post")
      .set("x-auth-token", token)
      .send(completeOffer)
      .then((res) => {
        res.should.have.property("status", 200);
        res.body.should.have.property("msg");
        res.body.should.have.property("post");
        _id = res.body.post._id;
        console.log(_id)
        // cleaning the new Post
        Post.deleteOne({ _id: _id }, function (err) {})
        done();
      })
      .catch((err) => done(err));
  });

});
