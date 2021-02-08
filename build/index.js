"use strict";

var _express = _interopRequireDefault(require("express"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var port = process.env.PORT || 4000;
var app = (0, _express["default"])();
app.get("/", function (req, res) {
  res.status(200).json({
    message: "Welcome to Node.js & Express"
  });
});
app.listen(port, function () {
  console.log("App started on port ".concat(port));
});
//# sourceMappingURL=index.js.map