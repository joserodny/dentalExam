## System Architecture

This application provides a platform for patients to register, log in, view their profile and appointment history, and book appointments with dentists.

* **Frontend:** Built using React, leveraging the following libraries:
    * **React Router:** For seamless navigation between different pages.
    * **Axios:** For making HTTP requests to the backend API.
    * **SweetAlert2:** For displaying user-friendly alerts and notifications.
    * **FullCalendar:** For an interactive calendar interface to schedule appointments.
* **Backend:** Developed with Node.js and Express, providing API endpoints for:
    * Authentication (registration, login, logout).
    * Patient management (profile updates, viewing appointments).
    * Appointment booking (viewing availability, creating appointments).
    The main server logic is handled in `server.js`.
* **Database:** MySQL is used to persistently store data related to patients, dentists, and appointments.
* **Authentication:** Secure user sessions are managed using JSON Web Tokens (JWT). These tokens are stored in the browser's `localStorage` after successful login and are verified by the `authenticateToken` middleware implemented in `server.js` for protected routes.

## Components

### Backend

#### `server.js`

* **Purpose:** This file serves as the entry point for the Express server. It handles the configuration of middleware, establishes the database connection, and defines all the API routes for the application.
* **Key Features:**
    * Utilizes the following Node.js packages: `express`, `cors`, `mysql2/promise`, and `jsonwebtoken`.
    * Configures a MySQL connection pool using environment variables for efficient database interactions.
    * Implements the `authenticateToken` middleware, which is crucial for verifying the validity of JWT tokens sent in request headers, ensuring that only authenticated users can access protected resources.
    * Defines the various API routes that handle authentication-related requests (registration, login), booking functionalities (listing dentists, checking availability, creating appointments), and patient management operations (updating profile, fetching appointment history).
* **Dependencies:** `express`, `dotenv`, `mysql2`, `cors`, `jsonwebtoken`.

#### `auth.controller.js`

* **Purpose:** This module is responsible for handling all user authentication-related logic.
* **Functions:**
    * `registerPatients`: Handles the registration of new patient accounts. This involves receiving user data, securely hashing the password before storing it in the database, and upon successful registration, issuing a JWT to the newly registered patient for future authentication.
    * `loginPatients`: Processes user login attempts. It authenticates the provided credentials against the stored data, and upon successful verification, generates and sends a JWT to the client, establishing a secure session.
    * `logout`: While the backend doesn't actively invalidate JWTs (as they are stateless), this function serves as an endpoint that the frontend can call to acknowledge a user's intention to log out. The primary action of logging out (clearing the token) is typically handled on the client-side (e.g., removing the JWT from `localStorage`).

#### `booking.controller.js`

* **Purpose:** This module manages all operations related to dentists and appointment scheduling.
* **Functions:**
    * `dentists`: Retrieves and lists all available dentists from the database. This information can be used by patients to select a dentist when booking an appointment.
    * `getAvailableAppointments`: Fetches and displays the available appointment dates for a specific dentist. This function likely takes a dentist identifier as input and queries the database for time slots that have not yet been booked.
    * `createAppointment`: Handles the process of booking a new appointment. This involves receiving details such as the patient, dentist, and selected date/time, and then updating the database to record the new appointment.

#### `patient.controller.js`

* **Purpose:** This module is responsible for managing patient-related data and their appointment history.
* **Functions:**
    * `updatePatient`: Allows authenticated patients to update their profile information, specifically their name and email address. This function receives the updated data and persists it in the patient's record in the database.
    * `getAppointments`: Retrieves and returns a list of the logged-in patient's past and upcoming appointments. This allows patients to review their appointment history within the application.

### Frontend

* **`RegisterPage`:** This React component provides a user interface with a form that allows new patients to create an account. Upon submission, the collected registration data is sent as a POST request to the `/api/register` backend endpoint.
* **`LoginPage`:** This component presents a login form where existing patients can enter their credentials (username/email and password). Upon submission, these credentials are sent as a POST request to the `/api/login` backend endpoint for authentication.
* **`PatientDashBoardPage`:** This page serves as the central hub for logged-in patients. It displays the user's profile information, provides a history of their booked appointments, and offers an option to edit their profile details, likely through interaction with the `updatePatient` backend function.
* **`BookingPage`:** This component features an interactive calendar interface (powered by FullCalendar) that enables patients to book appointments with dentists. It likely interacts with the `dentists`, `getAvailableAppointments`, and `createAppointment` backend endpoints to display available slots and finalize bookings.




## Setup Instructions

Follow the steps below to get the project up and running on your local machine.

---

### 1. Install Dependencies

Install all necessary packages:

```bash
npm install
```

---

### 2. Setup Environment Variables

Copy the example environment file:

```bash
cp .env.example .env
```

Open the newly created `.env` file and fill in the required values:

```env
DB_USERNAME=your_db_username
DB_PASSWORD=your_db_password
DB_DATABASE=your_database_name
DB_HOST=localhost
DB_DIALECT=mysql # or postgres, sqlite, etc.
PORT=5000
JWT_SECRET=your_generated_jwt_secret
```

⚠️ Ensure the database defined in `DB_DATABASE` exists before running migrations.

---

### 3. Run Database Migrations

Apply Sequelize migrations to create the database schema:

```bash
npx sequelize-cli db:migrate
```

---

### 4. Seed the Database

Populate the database with initial data:

```bash
npx sequelize-cli db:seed:all
```

---

### 5. Run the Application

Start the development server:

```bash
npm run dev
```

Start the Express server:

```bash
npm run express
```