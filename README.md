# Loan EMI Calculator

A full-stack Loan EMI Calculator built as part of a Laravel + React technical assessment.

The application calculates the monthly EMI (Equated Monthly Installment), total interest payable, total payment amount, and generates a complete amortization schedule based on user inputs.

---

## Tech Stack

### Backend
- Laravel 12
- PHP 8.2+
- REST API
- PHPUnit

### Frontend
- React (Vite)
- Tailwind CSS
- Axios

---

## Features

- Calculate Monthly EMI
- Calculate Total Interest
- Calculate Total Payment
- Generate Complete Amortization Schedule
- Backend Validation using Laravel Form Request
- REST API Architecture
- Dedicated Service Class for EMI Calculation
- Responsive React UI
- PHPUnit Feature Tests

---

## Project Structure

```
Beacon Technical Assessment Task/
│
├── loan-emi-calculator/    # Laravel Backend
├── frontend/               # React Frontend
└── README.md
```

---

# Backend Setup

## 1. Install dependencies

```bash
composer install
```

## 2. Create environment file

```bash
copy .env.example .env
```

## 3. Generate application key

```bash
php artisan key:generate
```

## 4. Install API scaffolding

```bash
php artisan install:api
```

## 5. Start Laravel server

```bash
php artisan serve
```

Backend runs at

```
http://127.0.0.1:8000
```

---

# Frontend Setup

Go to frontend folder

```bash
cd frontend
```

Install packages

```bash
npm install
```

Start development server

```bash
npm run dev
```

Frontend runs at

```
http://localhost:5173
```

---

# API Endpoint

### Calculate Loan EMI

**POST**

```
/api/loan/calculate
```

Request Body

```json
{
    "principal": 500000,
    "annual_rate": 10.5,
    "tenure_months": 24
}
```

Example Success Response

```json
{
    "success": true,
    "message": "Loan EMI calculated successfully.",
    "data": {
        "principal": 500000,
        "annual_rate": 10.5,
        "tenure_months": 24,
        "monthly_emi": 23188.02,
        "total_interest": 56512.50,
        "total_payment": 556512.50,
        "schedule": [
            {
                "month": 1,
                "principal_paid": 18813.02,
                "interest_paid": 4375.00,
                "balance": 481186.98
            }
        ]
    }
}
```

---

## Validation Rules

| Field | Rules |
|-------|-------|
| principal | required, numeric, minimum 1000 |
| annual_rate | required, numeric, between 0–50 |
| tenure_months | required, integer, between 1–360 |

---

## Running Tests

```bash
php artisan test
```

---

## Assumptions

- Interest rate is annual and converted to monthly.
- EMI is calculated using the standard EMI formula.
- Monetary values are rounded to 2 decimal places.
- The final installment is adjusted to avoid a negative balance caused by rounding.
- No database is required as per the assessment requirements.

---

## Trade-offs

- No database integration was implemented, as it was not required for the assessment.
- No authentication or user management was added to keep the solution focused on the required functionality.
- The frontend uses basic React state management without additional libraries to keep the implementation simple and maintainable.
- Error handling focuses on validation and API responses as required by the assessment.

---

## Author

Ranapratap Singh