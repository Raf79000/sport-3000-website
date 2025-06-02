const DeleteItem = require("./services/Items/DeleteItem");
const GetItem = require("./services/Items/GetItem");
const GetItems = require("./services/Items/GetItems");
const SaveItem = require("./services/Items/SaveItem");
const UpdateItem = require("./services/Items/UpdateItem");

const GetUser = require("./services/Users/GetUser");
const Login = require("./services/Users/Login");
const SignUp = require("./services/Users/SignUp");
const DeleteUser = require("./services/Users/DeleteUser");
const UpdateUser = require("./services/Users/UpdateUser");


const GetOrder = require("./services/Orders/GetOrder");
const GetOrders = require("./services/Orders/GetOrders");
const SaveOrder = require("./services/Orders/SaveOrder");
const UpdateOrder = require("./services/Orders/UpdateOrder");

const GetOrderItems = require("./services/OrdersItems/GetOrderItems");
const SaveOrderItem = require("./services/OrdersItems/SaveOrderItem");

const GetUserFavorites = require("./services/Favorites/GetUserFavorites");
const UpdateFavorites = require("./services/Favorites/UpdateFavorites");
const DeleteUserFavorites = require("./services/Favorites/DeleteUserFavorites");

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

  // OrdersItems
  GetOrderItems(app, db_connexion);
  SaveOrderItem(app, db_connexion);

  // Favorites
  GetUserFavorites(app, db_connexion);
  UpdateFavorites(app, db_connexion);
  DeleteUserFavorites(app, db_connexion);
};