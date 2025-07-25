                                                                            Poultry Breeder Management System

A full-stack web application designed to simplify poultry breeder operations by managing flocks, daily data entries, and production reports. It helps track bird counts, egg production, and feed usage while automatically calculating age and stage (Chick, Grower, Layer).


Dashboard Overview:

Shows total male and female closing stock
Displays egg production percentage per shed and chick/grower stages

Create Flock:

Add new flock with batch number, opening count, and rate
Age is calculated automatically from start date

Daily Entry:

Record daily data: mortality, feed consumption, egg counts
Automatic calculation of closing stock and percentages

Reports:

View historical daily entries
Filter by batch number and stage

Tech Stack:

Frontend: React.js, Bootstrap, JavaScript, HTML,CSS
Backend: Python, Django, Django REST Framework
Database: SQLite
API Communication: REST API


Screenshots:

Dashboard

<img width="1470" height="956" alt="Screenshot 2025-07-25 at 5 43 05 PM" src="https://github.com/user-attachments/assets/5a444001-4ffc-4f1f-8462-b0b2b1b9dd54" />

Create Flock

<img width="1470" height="956" alt="Screenshot 2025-07-25 at 5 43 15 PM" src="https://github.com/user-attachments/assets/5bf4d0c8-7e72-4845-8572-a786fdbf3323" />

Daily Entry Report

<img width="1470" height="956" alt="Screenshot 2025-07-25 at 5 43 47 PM" src="https://github.com/user-attachments/assets/e25ab231-bb72-41da-bfa8-411c973ad68d" />


Reports

<img width="1470" height="956" alt="Screenshot 2025-07-25 at 5 45 54 PM" src="https://github.com/user-attachments/assets/ca7a498a-661f-4020-882d-e97c2fabc069" />

Installation:

1. Clone Repository
git clone <https://github.com/smitabhale/poultry_management_v2/tree/main>
cd poultry-breeder-management

2. Backend Setup
cd backend
python3 -m venv env
source env/bin/activate   # For Mac/Linux
pip install -r requirements.txt
python3 manage.py migrate
python3 manage.py runserver


3. Frontend Setup
cd frontend
npm install
npm start


Usage:

Open React frontend at http://localhost:3000
Ensure Django backend runs at http://127.0.0.1:8000
Create flocks, enter daily data, and monitor dashboards/reports

Future Enhancements:

Authentication and role-based access (Admin/Staff)
Advanced analytics for feed vs egg production
Export reports as Excel or PDF

Author:

Smita Abhale
Email: abhalesmita3@gmail.com


