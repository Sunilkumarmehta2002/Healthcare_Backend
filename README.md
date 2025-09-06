# 🏥 Healthcare Backend API

A backend system for a healthcare application built with **Node.js, Express, and PostgreSQL**.
It includes **secure JWT authentication** and provides a **RESTful API** for managing **patients, doctors, and their assignments**.

---

## ✨ Features

* 🔑 **User Authentication** – Secure registration & login with JSON Web Tokens (JWT)
* 🗄️ **Database** – PostgreSQL for robust data storage
* 🔗 **Relationships** – Assign doctors to patients with mapping APIs
* 📡 **RESTful APIs** – Full CRUD operations for Patients & Doctors

---

## 🛠️ Prerequisites

Make sure you have the following installed:

* [Node.js](https://nodejs.org/)
* [PostgreSQL](https://www.postgresql.org/download/)
* [pgAdmin](https://www.pgadmin.org/) (optional, GUI for Postgres)

---

## ⚡ Setup Instructions

### 1️⃣ Clone Repository & Install Dependencies

```bash
# Clone the repo
git clone <your-repository-url>
cd healthcare-backend

# Install dependencies
npm install
```

### 2️⃣ Configure Environment Variables

Create a `.env` file in the project root:

```env
DB_HOST=localhost
DB_USER=postgres
DB_PASS=your_postgres_password
DB_NAME=healthcare_db
DB_PORT=5432
JWT_SECRET=your_jwt_secret_key
PORT=3000
```

* **DB\_PASS** → Your Postgres password
* **DB\_NAME** → Database name (`healthcare_db`)
* **JWT\_SECRET** → Generate one via:

  ```bash
  openssl rand -base64 32   # Mac/Linux
  ```

  Or use an [online key generator](https://www.jwt.io/).

### 3️⃣ Create PostgreSQL Database

```bash
createdb -U postgres healthcare_db
```

### 4️⃣ Run the Server

```bash
# Development mode with auto-restart
nodemon server.js

# OR run normally
node server.js
```

✅ Server will run at: `http://localhost:3000`

---

## 🔑 Authentication

All **private routes** require a JWT token in the header:

```http
Authorization: Bearer <your_jwt_token>
```

---

## 📍 API Endpoints

### 🔐 1. Authentication

| Method | Endpoint             | Description           |
| ------ | -------------------- | --------------------- |
| POST   | `/api/auth/register` | Register a new user   |
| POST   | `/api/auth/login`    | Login & get JWT token |

**Register Request**

```json
{
  "name": "Arjun Sharma",
  "email": "arjun.sharma@example.com",
  "password": "strongpassword123"
}
```

**Login Request**

```json
{
  "email": "arjun.sharma@example.com",
  "password": "strongpassword123"
}
```

---

### 👩‍⚕️ 2. Patients

| Method | Endpoint            | Description                      |
| ------ | ------------------- | -------------------------------- |
| POST   | `/api/patients`     | Add a new patient (Private)      |
| GET    | `/api/patients`     | Get all patients (Private)       |
| GET    | `/api/patients/:id` | Get a patient by ID (Private)    |
| PUT    | `/api/patients/:id` | Update patient details (Private) |
| DELETE | `/api/patients/:id` | Delete a patient (Private)       |

**Example Add Patient**

```json
{
  "name": "Priya Gupta",
  "dateOfBirth": "1998-07-22",
  "gender": "Female"
}
```

---

### 🩺 3. Doctors

| Method | Endpoint           | Description                     |
| ------ | ------------------ | ------------------------------- |
| POST   | `/api/doctors`     | Add a new doctor (Private)      |
| GET    | `/api/doctors`     | Get all doctors (Private)       |
| GET    | `/api/doctors/:id` | Get a doctor by ID (Private)    |
| PUT    | `/api/doctors/:id` | Update doctor details (Private) |
| DELETE | `/api/doctors/:id` | Delete a doctor (Private)       |

**Example Add Doctor**

```json
{
  "name": "Dr. Anjali Singh",
  "specialty": "Pediatrics",
  "email": "anjali.singh@example.com"
}
```

---

### 🔗 4. Patient-Doctor Mappings

| Method | Endpoint                   | Description                                  |
| ------ | -------------------------- | -------------------------------------------- |
| POST   | `/api/mappings`            | Assign a doctor to a patient (Private)       |
| GET    | `/api/mappings`            | Get all patient-doctor mappings (Private)    |
| GET    | `/api/mappings/:patientId` | Get doctors for a specific patient (Private) |
| DELETE | `/api/mappings/:id`        | Remove a doctor from a patient (Private)     |

**Example Assign Doctor**

```json
{
  "patientId": 1,
  "doctorId": 1
}
```

---

## 🚀 Development Notes

* Use [Postman](https://www.postman.com/) to test APIs
* JWT tokens expire based on your `jwt.sign` configuration
* Passwords are securely hashed before storage
---  
### 👀 Project Views

![Visitor Count](https://visitor-badge.laobi.icu/badge?page_id=your-github-username.healthcare-backend)

