const DeleteItem = require("./Services/Items/DeleteItem");
const GetItem = require("./Services/Items/GetItem");
const GetItems = require("./Services/Items/GetItems");
const SaveItem = require("./Services/Items/SaveItem");
const UpdateItem = require("./Services/Items/UpdateItem");

const GetUser = require("./Services/Users/GetUser");
const Login = require("./Services/Users/Login");
const SignUp = require("./Services/Users/SignUp");
const DeleteUser = require("./Services/Users/DeleteUser");
const UpdateUser = require("./Services/Users/UpdateUser");


const GetOrder = require("./Services/Orders/GetOrder");
const GetOrders = require("./Services/Orders/GetOrders");
const SaveOrder = require("./Services/Orders/SaveOrder");
const UpdateOrder = require("./Services/Orders/UpdateOrder");
const UpdateStatus = require("./Services/Orders/UpdateStatus");

const SaveOrderItem = require("./Services/OrdersItems/SaveOrderItem");

module.exports = (app, db_connexion, multerStorage) => {
  // Items
  DeleteItem(app, db_connexion);
  GetItem(app, db_connexion);
  GetItems(app, db_connexion);
  SaveItem(app, db_connexion, multerStorage);
  UpdateItem(app, db_connexion, multerStorage);

  // Users
  GetUser(app, db_connexion);
  Login(app, db_connexion);
  SignUp(app, db_connexion);
  DeleteUser(app, db_connexion);
  UpdateUser(app, db_connexion);

  // Orders
  GetOrder(app, db_connexion);
  GetOrders(app, db_connexion);
  SaveOrder(app, db_connexion);
  UpdateOrder(app, db_connexion);
  UpdateStatus(app, db_connexion);

  // OrdersItems
  SaveOrderItem(app, db_connexion);
};