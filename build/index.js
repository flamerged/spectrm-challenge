"use strict";

var _express = _interopRequireDefault(require("express"));

var _index = _interopRequireDefault(require("../models/index"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var port = process.env.PORT || 4000;
var {
  Message
} = _index.default;
var app = (0, _express.default)();
app.use(_express.default.json());
app.use(_express.default.urlencoded({
  extended: true
})); // Routes
// Get all messages

app.get("/messages", /*#__PURE__*/function () {
  var _ref = _asyncToGenerator(function* (req, res) {
    Message.findAll().then(messages => {
      var promises = [];
      messages.forEach(message => promises.push(message.increment("retrievedCounter")));
      return Promise.all(promises);
    }).then(messages => res.status(200).send(messages)).catch(error => {
      console.log(error);
      res.status(404).json({
        status: "failed",
        error: "".concat(error)
      });
    });
  });

  return function (_x, _x2) {
    return _ref.apply(this, arguments);
  };
}()); // Get single message by ID

app.get("/messages/:id", /*#__PURE__*/function () {
  var _ref2 = _asyncToGenerator(function* (req, res) {
    var id = req.params.id;
    Message.findAll({
      where: {
        id
      }
    }).then(message => {
      if (message.length > 0) {
        message[0].increment("retrievedCounter");
      } else {
        throw new Error("Message could not be found");
      }

      res.status(200).send(message);
    }).catch(error => {
      console.log(error);
      res.status(404).json({
        status: "failed",
        error: "".concat(error)
      });
    });
  });

  return function (_x3, _x4) {
    return _ref2.apply(this, arguments);
  };
}()); // Create a message

app.post("/messages/", /*#__PURE__*/function () {
  var _ref3 = _asyncToGenerator(function* (req, res) {
    var {
      content
    } = req.body;
    Message.create({
      content
    }).then(message => res.status(201).send({
      status: "success",
      message
    })).catch(error => {
      console.log(error);
      res.status(400).json({
        status: "failed",
        error: "".concat(error)
      });
    });
  });

  return function (_x5, _x6) {
    return _ref3.apply(this, arguments);
  };
}()); // Update a message by ID

app.put("/messages/:id", /*#__PURE__*/function () {
  var _ref4 = _asyncToGenerator(function* (req, res) {
    var changes = req.body;
    var id = req.params.id;
    Message.update(_objectSpread({}, changes), {
      where: {
        id
      },
      returning: true
    }).then(message => {
      message = message[1][0].increment("retrievedCounter");
      return message;
    }).then(message => {
      res.status(202).send({
        status: "success",
        message
      });
    }).catch(error => {
      console.log(error);
      res.status(400).json({
        status: "failed",
        error: "".concat(error)
      });
    });
  });

  return function (_x7, _x8) {
    return _ref4.apply(this, arguments);
  };
}()); // delete a message by ID

app.delete("/messages/:id", /*#__PURE__*/function () {
  var _ref5 = _asyncToGenerator(function* (req, res) {
    var id = req.params.id;
    Message.destroy({
      where: {
        id
      },
      returning: true
    }).then(status => {
      if (status === 0) {
        throw new Error("Message could not be found");
      }

      res.status(202).send({
        status: "success"
      });
    }).catch(error => {
      console.log(error);
      res.status(400).json({
        status: "failed",
        error: "".concat(error)
      });
    });
  });

  return function (_x9, _x10) {
    return _ref5.apply(this, arguments);
  };
}());
app.listen(port, () => {
  console.log("App started on port ".concat(port));
});
//# sourceMappingURL=index.js.map