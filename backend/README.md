# KitLog Backend

FastAPI backend for the KitLog application.

## Features

- **FastAPI**: Modern, fast Python web framework
- **Automatic API Documentation**: Swagger UI and ReDoc
- **Pydantic**: Data validation using Python type annotations
- **SQLAlchemy**: SQL toolkit and ORM
- **Alembic**: Database migration tool
- **Redis**: For caching and session management
- **JWT**: Authentication and authorization
- **CORS**: Cross-Origin Resource Sharing enabled
- **Testing**: Pytest setup for unit tests

## Project Structure
test
```
backend/
├── app/
│   ├── api/
│   │   └── v1/
│   │       ├── endpoints/
│   │       │   ├── items.py
│   │       │   └── users.py
│   │       └── api.py
│   ├── core/
│   │   └── config.py
│   ├── models/
│   │   └── base.py
│   ├── schemas/
│   │   ├── item.py
│   │   └── user.py
│   ├── services/
│   └── utils/
├── main.py
├── run.py
├── requirements.txt
├── Dockerfile
├── .env
└── README.md
```

## Quick Start

### 1. Install Dependencies

```bash
# Create virtual environment
python -m venv venv

# Activate virtual environment
# On macOS/Linux:
source venv/bin/activate
# On Windows:
# venv\Scripts\activate

# Install dependencies
pip install -r requirements.txt
```

### 2. Environment Setup

Copy `.env` file and update values as needed:

```bash
cp .env .env.local
```

### 3. Run the Development Server

```bash
# Option 1: Using uvicorn directly
uvicorn main:app --reload --host 0.0.0.0 --port 8000

# Option 2: Using the run script
python run.py

# Option 3: Using the main module
python main.py
```

### 4. Access the API

- **API Base URL**: http://localhost:8000
- **Interactive Documentation (Swagger)**: http://localhost:8000/docs
- **Alternative Documentation (ReDoc)**: http://localhost:8000/redoc
- **Health Check**: http://localhost:8000/health

## API Endpoints

### Items
- `GET /api/v1/items/` - List all items
- `GET /api/v1/items/{item_id}` - Get specific item
- `POST /api/v1/items/` - Create new item
- `PUT /api/v1/items/{item_id}` - Update item
- `DELETE /api/v1/items/{item_id}` - Delete item

### Users
- `GET /api/v1/users/` - List all users
- `GET /api/v1/users/{user_id}` - Get specific user
- `POST /api/v1/users/` - Create new user
- `PUT /api/v1/users/{user_id}` - Update user
- `DELETE /api/v1/users/{user_id}` - Delete user

## Testing

Run the test suite:

```bash
pytest
```

Run tests with coverage:

```bash
pytest --cov=app
```

## Docker

### Build and run with Docker:

```bash
# Build the image
docker build -t kitlog-backend .

# Run the container
docker run -p 8000:8000 kitlog-backend
```

## Environment Variables

Key environment variables (see `.env` for full list):

- `PROJECT_NAME`: Project name
- `VERSION`: API version
- `API_V1_STR`: API version prefix
- `DATABASE_URL`: Database connection string
- `SECRET_KEY`: JWT secret key
- `DEBUG`: Enable debug mode

## Development

### Adding New Endpoints

1. Create endpoint in `app/api/v1/endpoints/`
2. Add schemas in `app/schemas/`
3. Add models in `app/models/` (if using database)
4. Register router in `app/api/v1/api.py`

### Database Migrations

```bash
# Create migration
alembic revision --autogenerate -m "Add new table"

# Apply migrations
alembic upgrade head
```
