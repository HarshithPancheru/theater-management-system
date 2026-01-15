# PROJECT SETUP GUIDE – THEATER MANAGEMENT SYSTEM

This guide is for **absolute beginners**.
Follow steps **in order**. Do not skip anything.

This project uses:
- Node.js
- MongoDB
- Git
- VS Code
- React + Express (MERN)

---

## 1. REQUIRED SOFTWARE (INSTALL FIRST)

### 1.1 Install Node.js (VERY IMPORTANT)

1. Open browser  
2. Go to: https://nodejs.org  
3. Download **LTS version** (recommended)
4. Install with default options
5. Restart your computer after installation

#### Verify installation
Open **Command Prompt**:
```

node -v
npm -v

```
You should see version numbers.

If not working → Node is not installed correctly.

---

### 1.2 Install Git

1. Go to: https://git-scm.com/downloads  
2. Download for Windows  
3. Install with default options (keep clicking Next)

Verify:
```

git --version

```

---

### 1.3 Install VS Code

1. Go to: https://code.visualstudio.com  
2. Download and install

Recommended extensions (install inside VS Code):
- ES7+ React Snippets
- Prettier
- ESLint

---

### 1.4 Install MongoDB (Local Database)

1. Go to: https://www.mongodb.com/try/download/community  
2. Download **MongoDB Community Server**
3. During install:
   - Choose **Complete**
   - Enable **MongoDB Compass**

MongoDB runs automatically in background.

Verify:
- Open MongoDB Compass
- Connect to:
```

mongodb://localhost:27017

```

---

## 2. CLONE THE PROJECT REPOSITORY

1. Open Command Prompt
2. Go to folder where you want project:
```

cd Desktop

```

3. Clone repo:
```

git clone https://github.com/HarshithPancheru/theater-management-system.git

```

4. Open project:
```

cd theater-management-system
code .

```

---

## 3. CHECKOUT YOUR ASSIGNED BRANCH

Each person must work ONLY on their branch.

Example:
```

git checkout feature/auth

```

Check branch:
```

git branch

```
Your branch should have `*` symbol.

---

## 4. BACKEND SETUP (SERVER)

### 4.1 Go to server folder
```

cd server

```

### 4.2 Install dependencies
```

npm install

```

### 4.3 Create `.env` file

Create a file named `.env` inside `server/`  
Copy from `.env.example`

Example:
```

PORT=5000
MONGO_URI=mongodb://localhost:27017/theater
JWT_SECRET=any_random_string

```

---

### 4.4 Start backend server
```

npm start

```

If successful, you will see:
```

Server running on port 5000
MongoDB connected

```

Do NOT close this terminal while working.

---

## 5. FRONTEND SETUP (CLIENT)

Open **new Command Prompt window**

### 5.1 Go to client folder
```

cd theater-management-system/client

```

### 5.2 Install dependencies
```

npm install

```

### 5.3 Create `.env` file

Create `.env` in `client/`

```

VITE_API_BASE_URL=http://localhost:5000/api

```

---

### 5.4 Start frontend
```

npm run dev

```

You will see:
```

Local: http://localhost:5173

```

Open this URL in browser.

---

## 6. BASIC GIT WORKFLOW (MANDATORY)

### Before coding (EVERY DAY)
```

git pull origin main

```

### Check changed files
```

git status

```

### Add changes
```

git add .

```

### Commit changes
```

git commit -m "short meaningful message"

```

### Push to your branch
```

git push origin <your-branch-name>

```

### Create Pull Request on GitHub
- Never push to `main`
- Wait for review

---

## 7. COMMON PROBLEMS & FIXES

### Problem: `node is not recognized`
- Restart system
- Reinstall Node.js

### Problem: `npm install` fails
```

npm cache clean --force
npm install

```

### Problem: MongoDB not connecting
- Open MongoDB Compass
- Ensure connection works
- Check `MONGO_URI`

### Problem: Port already in use
Change port in `.env`
```

PORT=5001

```

---

## 8. IMPORTANT PROJECT RULES

- Follow `roles.md`
- Follow `api-contract.md`
- Follow `db-schema.md`
- Do not modify others’ files
- Ask before changing anything unclear

---

## 9. DAILY CHECKLIST (FOR EVERYONE)

- Pull latest `main`
- Work on your branch
- Small commits
- Push before end of day
- Update docs if needed

---

## 10. WHERE TO ASK DOUBTS

- First: check docs folder
- Second: ask in group chat
- Third: ask project owner

Do NOT randomly change code.

---

## 11. COMMANDS TO USE DURING DEVELOPMENT

- start the backend server
   ```bash
   > npm run start #to reflect any changes you made, reload the server
   ```

- run the backend in development mode
    ```bash
    > npm run dev #automatically reloads when you make changes to any file
    ```
    
- fill the database with dummy data
   ```bash
   > npm run seed
   ```
---


END OF SETUP GUIDE