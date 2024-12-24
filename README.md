# Portfolio-2025

Welcome to my Portfolio-2025! This project showcases my abilities as a Senior Software Engineer, highlighting modern tools and technologies that I excel in. Below are the key aspects of this portfolio:

---

## Features

### Frontend
- **Built with React**: Utilizes the latest React features, including functional components, hooks, and Context API.
- **Vite Build Tool**: Ensures fast development and optimized production builds.
- **React Animations**: Implements smooth and intuitive animations using libraries such as Framer Motion or React Spring.
- **Efficient Routing**: Employs React Router for seamless navigation across pages, ensuring a fluid user experience.
- **State Management**: Utilizes React Query (RTK Query) for efficient state management and server-state synchronization.

### Backend
- **Python and Django**: A robust backend built with Django, showcasing RESTful API design and scalability.
- **PostgreSQL Database**: Ensures reliable and efficient data storage.
- **Task Scheduling with Celery**: Manages asynchronous tasks such as sending out weekly blog digests to subscribers.
- **Redis Integration**: Used as a caching layer to enhance performance and for Celery task queue management.

### Deployment
- **Cloud Setup**: Fully deployed on the cloud for reliability and scalability (e.g., AWS, Azure, or Google Cloud Platform).

### Blog Feature
- Weekly blog content, dynamically managed via the Django admin panel, with subscription functionality for users.

---

## Installation

To set up and run the portfolio locally:

### Prerequisites
1. [Node.js](https://nodejs.org/) (for the frontend)
2. [Python 3.10+](https://www.python.org/downloads/) (for the backend)
3. PostgreSQL
4. Redis

### Steps

#### Backend Setup
1. Clone the repository and navigate to the backend directory:
   ```bash
   git clone https://github.com/yourusername/portfolio-2025.git
   cd portfolio-2025/backend
   ```
2. Set up a virtual environment and install dependencies:
   ```bash
   python -m venv venv
   source venv/bin/activate
   pip install -r requirements.txt
   ```
3. Configure the `.env` file for your database and Redis settings.
4. Run database migrations:
   ```bash
   python manage.py migrate
   ```
5. Start the Django development server:
   ```bash
   python manage.py runserver
   ```

#### Frontend Setup
1. Navigate to the frontend directory:
   ```bash
   cd ../old
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm run dev
   ```

---

## Usage

### Explore the Portfolio
- Access the frontend at `http://localhost:3000`.
- The backend API is available at `http://localhost:8000`.

### Key Highlights
- Smooth navigation with animations
- Interactive blog subscription and management
- Real-time updates with React Query

---

## Future Enhancements
- **Unit Testing**: Add tests for both frontend and backend using tools like Jest and Pytest.
- **CI/CD Pipeline**: Automate deployments with GitHub Actions or similar.
- **Enhanced Analytics**: Track user interactions and blog performance.

---

## License
This project is licensed under the MIT License. See the LICENSE file for details.

---

## Contact
Feel free to reach out for collaboration or questions:
- **Email**: mvillarreal789@hotmail.com
- **GitHub**: [github.com/LeugimAtreides](https://github.com/LeugimAtreides)
- **LinkedIn**: [https://www.linkedin.com/in/miguel-villarreal-90b271b1/](https://www.linkedin.com/in/miguel-villarreal-90b271b1/)

Thank you for exploring my portfolio!

