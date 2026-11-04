# AegisAI
Intelligent Predictive Analytics & Risk Intelligence Platform — starter scaffold.

## Requirements
- Python 3.12
- Node.js 20+ (for the React frontend)
- PostgreSQL is optional for this first local demo

## Backend
```powershell
cd backend
py -3.12 -m venv .venv
.venv\Scripts\Activate.ps1
pip install -r requirements.txt
uvicorn app.main:app --reload
```
Open http://127.0.0.1:8000/docs

## Frontend
```powershell
cd frontend
npm install
npm run dev
```
Open the Vite URL shown in the terminal.

This is a starter scaffold, not the complete production platform. It includes a working API health endpoint, a CSV profiling endpoint, a simple React dashboard, and tests. Advanced training, SHAP, MLflow, authentication, monitoring and deployment are planned modules.
