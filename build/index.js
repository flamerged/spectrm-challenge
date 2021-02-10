"use strict";

var _express = _interopRequireDefault(require("express"));

var _db = _interopRequireDefault(require("./config/db"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

_db["default"].authenticate().then(function () {
  return console.log("connected to ".concat(process.env.NODE_ENV, " db"));
})["catch"](function (error) {
  return console.log("something went wrong connecting to the database: " + error);
});

var port = process.env.PORT || 4000;
var app = (0, _express["default"])(); // app.get("/", (req, res) => {
//   res.status(200).json({ message: "Welcome to Node.js & Express" });
// });
// app.get("/message/:id", (req, res) => {
//   console.log(parseInt(req.params.id) + 5);
//   res
//     .status(200)
//     .json({ message: `Yes hello this is message ${req.params.id}` });
// });
// Routes todo
// Get all messages
// Get single message by ID
// Create a message
// Update a message by ID
// delete a message by ID

app.listen(port, function () {
  console.log("App started on port ".concat(port));
});
//# sourceMappingURL=index.js.map