# Project Name

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
