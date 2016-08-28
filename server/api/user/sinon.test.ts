// import * as sinon from "sinon";
// import { expect } from "chai";

// let Database = {
//     save: function(user, cb){
//         cb({msg: "ok"});
//         // throw new Error("sample");
//     }
// };

// function setupNewUser(info, callback) {
//     let user = {
//         name: info.name,
//         nameLowercase: info.name.toLowerCase()
//     };

//     try {
//         Database.save(user, callback);
//     } catch (err) {
//         callback(err);
//     }
// }

// it("should call save once", function () {
//     // *******************scenario 1: Creates a spy for (an existing) object.method and replaces the original method with the spy
//     // The spy acts exactly like the original method in all cases.
//     // The original method can be restored by calling object.method.restore().
//     // The returned spy is the function object which replaced the original method (spy === object.method).
//     let spySave = sinon.spy(Database, "save");
//     expect(spySave).to.equal(Database.save);

//     let info = { name: "Test" };
//     let info2 = { name: "Test2" };

//     let expectedUser = {
//         name: info.name,
//         nameLowercase: info.name.toLowerCase()
//     };

//     let f = function () { };

//     setupNewUser(info, f);

//     expect(spySave).to.equal(Database.save);
//     spySave.restore(); // remove the spy (restore the original method)
//     expect(spySave).to.not.equal(Database.save);


//     // sinon.assert.calledOnce(save);
//     expect(spySave.calledOnce).to.equal(true);

//     // sinon.assert.calledWith(spySave, expectedUser);
//     expect(spySave.calledWith(expectedUser)).to.equal(true);

//     // console.log(spySave.firstCall.args); // [{ name: "Test", nameLowercase: "test" }, [Function] ]
//     expect(spySave.firstCall.args[0]).to.deep.equal({ name: "Test", nameLowercase: "test" });
//     expect(spySave.callCount).to.equal(1);

//     expect(spySave.withArgs(expectedUser).callCount).to.equal(1);
//     expect(spySave.withArgs(expectedUser).calledOnce).to.equal(true);




//     // *******************scenario 2: Creates an anonymous function that records arguments, this value, exceptions and return values for all calls.
//     // create a new function as a spy (and then use it instead of the original function)
//     let spyCb = sinon.spy();

//     // Gresit: eventualy set what this spy shuld return (or throw an error)
//     // spyCb.returned({err: "some err"});
//     // spyCb.threw();

//     // Invoke the spy callback function
//     setupNewUser(info, spyCb);
//     setupNewUser(info, spyCb);

//     let spyCall1 = spyCb.getCall(1); // Returns the nth call (0 based)
//     expect(spyCall1.calledWith({msg: "ok"})).to.equal(true);

//     let spyCall2 = spyCb.getCall(2); // Returns the nth call (0 based)
//     expect(spyCall2).to.equal(null);

//     // spyCb.restore();  // cannot restore an anonymous spy becouse don't have an original function'

//     // spyCb(); // directly invoke the spy callback function

//     expect(spyCb.callCount).to.equal(2); // expect(spyCb.calledOnce).to.equal(true);

//     // console.log(spyCb.firstCall.args);
//     expect(spyCb.called).to.equal(true);
//     expect(spyCb.calledWith({msg: "ok"})).to.equal(true);
//     expect(spyCb.firstCall.args[0]).to.deep.equal({msg: "ok"});

//     // var x = spyCb.returned({"msg": "ok2"});
//     // console.log(x);
//     // Returns true if spy returned the provided value at least once


//     // *******************scenario 3: spy using an existing function
//     // create a new function as a spy (and then use it instead of the original function)

//     let fff = function(){
//         return "aaa";
//     };

//     let spyCb2 = sinon.spy(fff);
//     expect(spyCb2()).to.equal("aaa");
//     // console.log(spyCb2;
//     expect(spyCb2()).to.equal(fff());

//     setupNewUser(info, spyCb2);
//     // spyCb2.restore();

//     expect(spyCb2.returned("aaa")).equal(true);

// });

