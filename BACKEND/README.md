# User API Endpoint Documentation


## Endpoint: Register User

`POST /user/register`

### Description
Registers a new user in the system. This endpoint validates the input, hashes the password, creates a user, and returns an authentication token along with the user data.


### Request Body
Send a JSON object with the following structure:

```
{
  "fullname": {
    "firstname": "<First Name>",
    "lastname": "<Last Name>"
  },
  "email": "<user email>",
  "password": "<user password>"
}
```

### Field Requirements
- `fullname.firstname`: string, required, minimum 3 characters
- `fullname.lastname`: string, minimum 3 characters (optional but recommended)
- `email`: string, required, must be a valid email
- `password`: string, required, minimum 6 characters


### Example Request
```
POST /user/register
Content-Type: application/json

{
  "fullname": {
    "firstname": "John",
    "lastname": "Doe"
  },
  "email": "john.doe@example.com",
  "password": "password123"
}
```


### Responses

#### Success
- **Status Code:** `201 Created`
- **Body:**
  ```json
  {
    "token": "<jwt_token>",
    "user": {
      "_id": "<user_id>",
      "fullname": {
        "firstname": "John",
        "lastname": "Doe"
      },
      "email": "john.doe@example.com"
      // ...other user fields
    }
  }
  ```

#### Validation Error
- **Status Code:** `400 Bad Request`
- **Body:**
  ```json
  {
    "errors": [
      { "msg": "First name must be at least 3 characters long", ... },
      { "msg": "Invalid Email", ... },
      { "msg": "Password must be at least 6 characters long", ... }
    ]
  }
  ```

#### Missing Fields/Error
- **Status Code:** `400 Bad Request`
- **Body:**
  ```json
  {
    "errors": [
      { "msg": "All fields are required" }
    ]
  }
  ```

---

## Endpoint: User Login

`POST /user/login`

### Description
Authenticates a user with email and password. Returns a JWT token and user data if credentials are valid.

### Request Body
Send a JSON object with the following structure:

```
{
  "email": "<user email>",
  "password": "<user password>"
}
```

#### Field Requirements
- `email`: string, required, must be a valid email
- `password`: string, required, minimum 6 characters

### Example Request
```
POST /user/login
Content-Type: application/json

{
  "email": "john.doe@example.com",
  "password": "password123"
}
```

### Responses

#### Success
- **Status Code:** `200 OK`
- **Body:**
  ```json
  {
    "token": "<jwt_token>",
    "user": {
      "_id": "<user_id>",
      "fullname": {
        "firstname": "John",
        "lastname": "Doe"
      },
      "email": "john.doe@example.com"
      // ...other user fields
    }
  }
  ```

#### Validation Error
- **Status Code:** `400 Bad Request`
- **Body:**
  ```json
  {
    "errors": [
      { "msg": "Invalid Email", ... },
      { "msg": "Password must be at least 6 characters long", ... }
    ]
  }
  ```

#### Invalid Credentials
- **Status Code:** `401 Unauthorized`
- **Body:**
  ```json
  {
    "message": "Invalid email or password"
  }
  ```

---

## Endpoint: Get User Profile

`GET /user/profile`

### Description
Returns the authenticated user's profile information. Requires a valid JWT token in the Authorization header or cookie.

### Headers
- `Authorization: Bearer <jwt_token>` (or cookie named `token`)

### Responses

#### Success
- **Status Code:** `200 OK`
- **Body:**
  ```json
  {
    "_id": "<user_id>",
    "fullname": {
      "firstname": "John",
      "lastname": "Doe"
    },
    "email": "john.doe@example.com"
    // ...other user fields
  }
  ```

#### Unauthorized
- **Status Code:** `401 Unauthorized`
- **Body:**
  ```json
  {
    "message": "Authentication required"
  }
  ```

---

## Endpoint: User Logout

`GET /user/logout`

### Description
Logs out the authenticated user by blacklisting the JWT token and clearing the authentication cookie.

### Headers
- `Authorization: Bearer <jwt_token>` (or cookie named `token`)

### Responses

#### Success
- **Status Code:** `200 OK`
- **Body:**
  ```json
  {
    "message": "Logged out successfully"
  }
  ```

#### Unauthorized
- **Status Code:** `401 Unauthorized`
- **Body:**
  ```json
  {
    "message": "Authentication required"
  }
  ```

## Captain API Endpoint Documentation

---

### Endpoint: Register Captain

`POST /captains/register`

#### Request Body
```json
{
  "fullname": {
    "firstname": "Alice",         // string, required, min 3 chars
    "lastname": "Smith"           // string, required, min 3 chars
  },
  "email": "alice.smith@example.com", // string, required, valid email
  "password": "securepass",           // string, required, min 6 chars
  "vehicle": {
    "color": "Red",                   // string, required, min 3 chars
    "plate": "AB123CD",               // string, required, 1-7 uppercase letters/numbers
    "capacity": 4,                    // integer, required, min 1
    "vehicleType": "car"              // string, required, one of "car", "motorcycle", "auto"
  }
}
```

#### Responses

**Success**
- **Status Code:** `201 Created`
- **Body:**
  ```json
  {
    "token": "<jwt_token>",
    "captain": {
      "_id": "<captain_id>",
      "fullname": {
        "firstname": "Alice",
        "lastname": "Smith"
      },
      "email": "alice.smith@example.com",
      "vehicle": {
        "color": "Red",
        "plate": "AB123CD",
        "capacity": 4,
        "vehicleType": "car"
      }
      // ...other captain fields
    }
  }
  ```

**Validation Error**
- **Status Code:** `400 Bad Request`
- **Body:**
  ```json
  {
    "errors": [
      { "msg": "First name must be at least 3 characters long" },
      { "msg": "Invalid Email" },
      { "msg": "Vehicle type must be car, motorcycle, or auto" }
      // ...other validation errors
    ]
  }
  ```

**Duplicate Email/Plate**
- **Status Code:** `400 Bad Request`
- **Body:**
  ```json
  {
    "message": "Captain already exists"
  }
  ```

---

### Endpoint: Captain Login

`POST /captains/login`

#### Request Body
```json
{
  "email": "alice.smith@example.com", // string, required, valid email
  "password": "securepass"            // string, required, min 6 chars
}
```

#### Responses

**Success**
- **Status Code:** `200 OK`
- **Body:**
  ```json
  {
    "token": "<jwt_token>",
    "captain": {
      "_id": "<captain_id>",
      "fullname": {
        "firstname": "Alice",
        "lastname": "Smith"
      },
      "email": "alice.smith@example.com",
      "vehicle": {
        "color": "Red",
        "plate": "AB123CD",
        "capacity": 4,
        "vehicleType": "car"
      }
      // ...other captain fields
    }
  }
  ```

**Validation Error**
- **Status Code:** `400 Bad Request`
- **Body:**
  ```json
  {
    "errors": [
      { "msg": "Invalid Email" },
      { "msg": "Password must be at least 6 characters long" }
      // ...other validation errors
    ]
  }
  ```

**Invalid Credentials**
- **Status Code:** `401 Unauthorized`
- **Body:**
  ```json
  {
    "message": "Invalid email or password"
  }
  ```

---

### Endpoint: Get Captain Profile

`GET /captains/profile`

#### Headers
- `Authorization: Bearer <jwt_token>` (or cookie named `token`)

#### Responses

**Success**
- **Status Code:** `200 OK`
- **Body:**
  ```json
  {
    "captain": {
      "_id": "<captain_id>",
      "fullname": {
        "firstname": "Alice",
        "lastname": "Smith"
      },
      "email": "alice.smith@example.com",
      "vehicle": {
        "color": "Red",
        "plate": "AB123CD",
        "capacity": 4,
        "vehicleType": "car"
      }
      // ...other captain fields
    }
  }
  ```

**Unauthorized**
- **Status Code:** `401 Unauthorized`
- **Body:**
  ```json
  {
    "message": "Unauthorized"
  }
  ```

---

### Endpoint: Captain Logout

`GET /captains/logout`

#### Headers
- `Authorization: Bearer <jwt_token>` (or cookie named `token`)

#### Responses

**Success**
- **Status Code:** `200 OK`
- **Body:**
  ```json
  {
    "message": "Logged out successfully"
  }
  ```

**Unauthorized**
- **Status Code:** `401 Unauthorized`
- **Body:**
  ```json
  {
    "message": "Unauthorized"
  }
  ```

---

> **Note:**  
> - Passwords are securely hashed before storage.  
> - The response includes a JWT token for authentication.  
> - All

