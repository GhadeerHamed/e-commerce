# Project Installation Instructions

This is a full-stack application built with **Laravel 12** (backend) and **React** (frontend) running on **Node.js v20**.

---

## 🧾 Requirements

- PHP 8.3+
- Composer
- Node.js v20
- NPM or Yarn
- Sqlite
- Laravel CLI

---

## ⚙️ Backend – Laravel 12 Setup

1. **Clone the repository**
```bash
git clone https://github.com/GhadeerHamed/e-commerce.git
cd e-commerce
```

2. **In backend folder**
```bash
composer install
```
*copy .env.example to .env file*
*run migration and seeder*
```bash
php artisan migrate --seed
```

3. **In frontend folder**
```bash
npm install & npm run start
```

***Application will be accessable on [http://localhost:5173](http://localhost:5173)***
