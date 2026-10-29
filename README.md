# 🧠 Mental Sense AI

**Mental Sense AI** is an end-to-end machine learning project designed to predict students' mental health scores using lifestyle habits, academic routines, social media usage, sleep patterns, physical activity, and self-reported stress levels.

The project combines a trained machine learning model, a FastAPI backend, and an interactive web frontend to provide predictions through a web application.

## 🌐 Live Demo

**Try the application:** https://mental-sense-ai-2.onrender.com

**Backend API:** https://mental-sense-ai-1.onrender.com

## 🎯 Project Objective

The objective of Mental Sense AI is to explore how lifestyle, academic, and social media-related factors relate to students' mental health scores using machine learning.

The project demonstrates the complete machine learning workflow, from data preprocessing and model training to API development and web deployment.

## ✨ Features

* Predicts a numerical mental health score based on user-provided information.
* Accepts demographic and academic information.
* Considers social media usage and daily phone unlocks.
* Includes sleep duration, study hours, and physical activity.
* Considers self-reported stress level.
* Provides predictions through a FastAPI backend.
* Offers an interactive frontend for entering information and viewing results.
* Deploys the frontend and backend as separate web services.

## 📊 Input Features

The model uses the following categories of information:

| Category     | Features                                                               |
| ------------ | ---------------------------------------------------------------------- |
| Demographic  | Age, gender, country                                                   |
| Academic     | Academic level, study hours                                            |
| Social Media | Most-used platform, average daily usage, daily unlocks, purpose of use |
| Lifestyle    | Sleep hours per night, physical activity hours                         |
| Stress       | Self-reported stress level                                             |

## 🛠️ Tech Stack

**Programming Language**

* Python

**Machine Learning & Data Processing**

* Pandas
* Scikit-learn
* Joblib
* Jupyter Notebook

**Backend**

* FastAPI
* Pydantic
* Uvicorn

**Frontend**

* HTML
* CSS
* JavaScript

**Deployment**

* Render

## 🤖 Machine Learning Workflow

The project follows these steps:

1. **Data Loading:** Load the student social media and mental health dataset.
2. **Exploratory Data Analysis:** Explore the dataset and understand the relationships between features.
3. **Data Preprocessing:** Prepare numerical and categorical features for model training.
4. **Feature Engineering:** Create a grouped country feature and prepare the model inputs.
5. **Model Training:** Train and compare Linear Regression and Random Forest Regression models.
6. **Hyperparameter Tuning:** Use `RandomizedSearchCV` to explore alternative Random Forest configurations.
7. **Model Evaluation:** Evaluate models using R² Score, Mean Absolute Error (MAE), and Root Mean Squared Error (RMSE).
8. **Model Serialization:** Save the trained pipeline using Joblib.
9. **API Development:** Create a FastAPI endpoint to receive input data and return predictions.
10. **Frontend Integration:** Connect the web interface to the backend API.
11. **Deployment:** Deploy the frontend and backend using Render.

## 📈 Model Evaluation

The recorded test-set results from the notebook are:

| Model                          | R² Score |   MAE |  RMSE |
| ------------------------------ | -------: | ----: | ----: |
| Linear Regression              |    0.740 | 0.536 | 0.676 |
| Random Forest Regression       |    0.878 | 0.347 | 0.464 |
| Tuned Random Forest Regression |    0.865 | 0.369 | 0.487 |

The default Random Forest model achieved the highest R² score among these experiments.

**Note:** These figures represent the recorded evaluation results on the notebook's test split. They are not a guarantee of performance on new data or a separate validation of the deployed service.

## 📁 Project Structure

```text
Mental-Sense-Ai/
│
├── Mental_Health_Model.pkl
├── Student Social Media And Mental Health Impact.csv
├── ml_model.ipynb
├── main.py
├── requirements.txt
├── index.html
├── style.css
├── script.js
└── README.md
```

## ⚙️ Run Locally

### 1. Clone the Repository

```bash
git clone https://github.com/tejussaini/Mental-Sense-Ai.git
cd Mental-Sense-Ai
```

### 2. Create a Virtual Environment

```bash
python -m venv venv
```

Activate it on Windows:

```bash
venv\Scripts\activate
```

### 3. Install Dependencies

```bash
pip install -r requirements.txt
```

### 4. Start the Backend

```bash
uvicorn main:app --reload
```

The API should now be available at:

```text
http://127.0.0.1:8000
```

### 5. Open the API Documentation

Visit:

```text
http://127.0.0.1:8000/docs
```

FastAPI provides interact


