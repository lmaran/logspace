// let getByUsername = function (name) {
//     return name;
// };

let getById = function (req, res) {
      // let user = users.getByUsername(req.params.username);
    res.json({data: "user"});
  };

// export {getByUsername}
export {getById}