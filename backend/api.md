# Sport 3000 Backend API Documentation

Base URL: `http://localhost:3000/`

---

## Endpoints

### 1. Items

#### 1.1 Get All Items

**GET /**

- **Description:** Retrieve all items from the store.
- **Response:**
  - `200 OK`: Returns an array of items.
  - `500 Internal Server Error`: On database error.

#### 1.2 Get An Item

**GET /item/:id**
- **Description:** Retreive an item data.
- **URL Params**:
  - `id`: User's ID.
- **Response:**
  - `200 OK`: Returns an item object.
  - `400 Not Found`: Item not found.
  - `500 Internal Server Error`: On server or database error.

#### 1.3 Create An Item

**POST /item**
- **Description:** Add an item in database.
- **Request Body:**
```json
  {
    "name": "string",
    "price": "float",
    "cover": "string",
    "description": "string",
    "onSale": "bool",
    "salesPrices": "float"
  }
  ```
- **Response:**
  - `200 OK`: Item successfully added.
  - `400`: Wrong values to insert.
  - `500 Internal Server Error`: On server or database error.

#### 1.4 Delete Item by ID

**Delete /item/:id**

- **Description:** Delete item.
- **URL Params**:
  - `id`: Item's ID.
- **Response:**
  - `200 OK`: Item deleted successfully.
  - `500 Internal Server Error`: On server or database error.

---

### 2. User

#### 2.1 User Signup

**POST /signup**

- **Description:** Register a new user.
- **Request Body:**
  ```json
  {
    "username": "string",
    "password": "string"
  }
  ```
- **Response:**
  - `201 Created`: User created successfully.
  - `400 Bad Request`: Missing username or password.
  - `500 Internal Server Error`: On server or database error.

---

#### 2.2 User Login

**POST /signup**

- **Description:** Authenticate a user and recervice a JWT token.
- **Request Body:**
  ```json
  {
    "username": "string",
    "password": "string"
  }
  ```
- **Response:**
  - `200 OK`: Returns `{ message, userId, token }`.
  - `401 Unauthorized`: Invalid credentials.
  - `500 Internal Server Error`: On server or database error.

---

#### 2.3 Get User by ID

**GET /user/:id**

- **Description:** Retreive user details by user ID.
- **URL Params**:
  - `id`: User's ID.
- **Response:**
  - `200 OK`: Returns user object
  - `400 Not Found`: User not found.
  - `500 Internal Server Error`: On server or database error.

---

#### 2.4 Delete User by ID

**Delete /user/:id**

- **Description:** Delete user account (requires password confirmation).
- **URL Params**:
  - `id`: User's ID.
- **Request Body**
  ```json
  {
    "password": "string"
  }
  ```
- **Response:**
  - `200 OK`: User deleted successfully.
  - `401 Unauthorized`: Incorrect password.
  - `500 Internal Server Error`: On server or database error.

## Notes

- All endpoints return JSON responses.
- For protected endpoints, include the JWT token in the `Authorization` header (if implemented).
- Passwords are hashed using bcrypt before storage.
- Images are served statically from `/images`.
- To update an item, use the `POST /item/:id` endpoint.
- To update a user, use the `POST /user/:id` endpoint.

## Example Usage

**Signup**

```bash
curl -X POST http://localhost:3000/signup \
  -H "Content-Type: application/json" \
  -d '{"username":"john","password":"mypassword"}'
```

**Login**

```bash
curl -X POST http://localhost:3000/login \
  -H "Content-Type: application/json" \
  -d '{"username":"john","password":"mypassword"}'
```

**Get User**

```bash
curl http://localhost:3000/user/1
```

**Delete User**

```bash
curl -X DELETE http://localhost:3000/user/1 \
  -H "Content-Type: application/json" \
  -d '{"password":"mypassword"}'
```
