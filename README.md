# Document Management System (DMS)

A MEAN stack Document Management System with upload, tagging, search, permissions, and version control.

## Tech Stack
- **Frontend**: Angular 17 + TailwindCSS
- **Backend**: Node.js + Express.js (ESM modules)
- **Database**: MongoDB

## Prerequisites
- Node.js - v18+ 
- npm - v9+ 
- MongoDB  v6+ 
- Angular CLI  v17+ 

## Setup

### 1. Backend
```bash
cd backend
npm install
npm run server     
```

### 2. Frontend
```bash
cd frontend
npm install
ng serve     
```

## Features
- JWT Authentication (Register/Login)
- Upload PDF, images, and files
- Tag & categorize documents
- Search & filter by title, tag, category
- Version control (track uploads)
- Role-based access (admin/editor/viewer)
- Responsive UI with TailwindCSS