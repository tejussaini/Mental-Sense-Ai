# 🧠 MindScore AI — Mental Health Score Prediction

MindScore AI is a machine learning project that predicts a student's mental health score using demographic information, social media usage patterns, academic habits, sleep duration, physical activity, and stress levels.

The project combines **data analysis, feature engineering, regression modeling, hyperparameter tuning, and API development** to build an interactive mental health score prediction application.

The trained model is integrated with a FastAPI backend and a web frontend built using HTML, CSS, and JavaScript.

> **Disclaimer:** MindScore AI is an educational machine learning project. Its predictions are statistical estimates and should not be interpreted as medical diagnoses or professional mental health assessments.

---

## 🚀 Live Demo

* **Live API:** https://mental-sense-ai-1.onrender.com
* **Interactive API Documentation:** https://mental-sense-ai-1.onrender.com/docs
* **Frontend:** Add your deployed frontend URL here.

---

## ✨ Features

* 🧠 **Mental Health Score Prediction:** Predicts a numerical score using a trained regression model.
* 📊 **Exploratory Data Analysis:** Examines patterns and relationships in student lifestyle and social media data.
* ⚙️ **Feature Engineering:** Groups less frequent countries into an `Other` category.
* 🤖 **Machine Learning:** Implements and compares Linear Regression and Random Forest regression models.
* 🎯 **Hyperparameter Tuning:** Uses RandomizedSearchCV to explore Random Forest hyperparameters.
* 🌐 **REST API:** Integrates the trained model with FastAPI.
* 🎨 **Interactive Frontend:** Provides a web interface for entering student information and viewing predictions.
* ☁️ **Deployment:** Hosts the prediction API on Render.

---

## 🛠️ Tech Stack

| Category                | Technologies            |
| ----------------------- | ----------------------- |
| Programming Language    | Python                  |
| Data Analysis           | Pandas, NumPy           |
| Data Visualization      | Matplotlib, Seaborn     |
| Machine Learning        | Scikit-learn            |
| Model Serialization     | Joblib                  |
| Backend                 | FastAPI                 |
| Data Validation         | Pydantic                |
| Frontend                | HTML5, CSS3, JavaScript |
| Deployment              | Render                  |
| Development Environment | Jupyter Notebook        |

---

## 📂 Project Structure

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

### File Descriptions

| File                                                | Description                                                                       |
| --------------------------------------------------- | --------------------------------------------------------------------------------- |
| `Mental_Health_Model.pkl`                           | Serialized machine learning pipeline used for predictions.                        |
| `Student Social Media And Mental Health Impact.csv` | Dataset used for model development.                                               |
| `ml_model.ipynb`                                    | Notebook containing data analysis, preprocessing, model training, and evaluation. |
| `main.py`                                           | FastAPI application that loads the model and serves predictions.                  |
| `requirements.txt`                                  | Python dependencies required to run the backend.                                  |
| `index.html`                                        | Frontend page structure.                                                          |
| `style.css`                                         | Frontend styling and responsive layout.                                           |
| `script.js`                                         | Frontend interactions and API integration.                                        |

---

## 📊 Dataset Overview

The project uses the **Student Social Media And Mental Health Impact** dataset.

The dataset contains information about students' demographics, social media usage, daily routines, and mental health scores.

### Features Used for Prediction

The model uses the following input features:

| Feature                   | Description                                  |
| ------------------------- | -------------------------------------------- |
| Age                       | Student's age.                               |
| Gender                    | Student's gender.                            |
| Academic Level            | High School, Undergraduate, or Graduate.     |
| Country Group             | Country category used during model training. |
| Most Used Platform        | Social media platform used most frequently.  |
| Purpose of Use            | Main reason for using social media.          |
| Average Daily Usage Hours | Average daily social media usage.            |
| Daily Unlocks             | Number of daily phone unlocks.               |
| Study Hours               | Daily study duration.                        |
| Physical Activity Hours   | Daily physical activity duration.            |
| Sleep Hours Per Night     | Average nightly sleep duration.              |
| Stress Level              | Reported stress category.                    |

**Target variable:** `Mental_Health_Score`

The model predicts this numerical target using the selected input features.

---

## 🔬 Machine Learning Workflow

The project follows a structured machine learning workflow.

### 1. Data Analysis

The dataset is explored to understand its structure, feature distributions, and relationships between variables.

### 2. Data Cleaning

The notebook includes duplicate removal and handling of unrealistic physical activity values.

### 3. Feature Engineering

Countries are grouped into their individual categories when they belong to the selected top-country list. Other countries are assigned to the `Other` category.

### 4. Data Preprocessing

A scikit-learn `ColumnTransformer` combines different preprocessing pipelines:

* **Skewed numerical features:** Log transformation and standardization for `Study_Hours`.
* **Other numerical features:** Standardization.
* **Ordinal feature:** Ordinal encoding for `Stress_Level`.
* **Categorical features:** One-hot encoding with unknown-category handling.

### 5. Model Training

Two regression algorithms are evaluated:

* Linear Regression
* Random Forest Regressor

### 6. Hyperparameter Tuning

`RandomizedSearchCV` with five-fold cross-validation is used to explore Random Forest hyperparameters.

### 7. Model Evaluation

The models are evaluated using:

* R² Score
* Mean Absolute Error (MAE)
* Root Mean Squared Error (RMSE)

### 8. Model Deployment

The trained model is serialized using Joblib and integrated into a FastAPI application for real-time prediction requests.

---

## 📈 Model Performance

The following results are recorded in the project notebook for the test dataset.

| Model                   | Test R² Score | Test MAE | Test RMSE |
| ----------------------- | ------------: | -------: | --------: |
| Linear Regression       |        0.7398 |   0.5362 |    0.6760 |
| Random Forest — Default |        0.8776 |   0.3472 |    0.4637 |
| Random Forest — Tuned   |        0.8650 |   0.3689 |    0.4869 |

### Interpretation

**Random Forest (Default)** achieved the strongest recorded test performance among these three models.

* **R² Score:** Measures how much of the variation in the target is explained by the model.
* **MAE:** Measures the average absolute difference between predicted and actual scores.
* **RMSE:** Penalizes larger prediction errors more heavily than MAE.

Lower MAE and RMSE values generally indicate better predictions, while a higher R² score generally indicates a better fit.

These metrics reflect the notebook's recorded test split and do not guarantee equivalent performance on unseen populations.

### Selected Model

The notebook saves the default Random Forest pipeline as `Mental_Health_Model.pkl`.

The saved artifact includes the preprocessing pipeline and regressor, allowing the backend to transform incoming data before generating predictions.

---

## 🌐 API Development

The backend is developed using FastAPI and Pydantic.

It loads the trained model using Joblib, validates incoming requests, constructs a DataFrame, and returns the predicted mental health score.

### API Endpoint

**Method:** `POST`

**Endpoint:** `/predict`

### Example Request

```json
{
  "age": 20,
  "gender": "Male",
  "country": "India",
  "academic_level": "Undergraduate",
  "most_used_platform": "Instagram",
  "purpose_of_use": "Education",
  "avg_daily_usage_hours": 5.0,
  "daily_unlocks": 80,
  "study_hours": 4.0,
  "physical_activity_hours": 1.0,
  "sleep_hours_per_night": 7.0,
  "stress_level": "Medium"
}
```

### Example Response

```json
{
  "predicted_mental_health_score": 6.77
}
```

*The response above is illustrative. The actual score depends on the submitted data and the loaded model.*

---

## 💻 Run the Project Locally

Follow these steps to run MindScore AI on your computer.

### Prerequisites

Install the following:

* Python
* pip
* Git

### Step 1: Clone the Repository

```bash
git clone https://github.com/tejussaini/Mental-Sense-Ai.git
```

Navigate to the project directory:

```bash
cd Mental-Sense-Ai
```

### Step 2: Create a Virtual Environment

```bash
python -m venv .venv
```

Activate the environment.

**Windows PowerShell:**

```powershell
.venv\Scripts\Activate.ps1
```

**macOS or Linux:**

```bash
source .venv/bin/activate
```

### Step 3: Install Dependencies

```bash
pip install -r requirements.txt
```

For reliable model loading, use compatible versions of Python, scikit-learn, and the other libraries used when the model was trained.

### Step 4: Start the FastAPI Backend

Run:

```bash
uvicorn main:app --reload
```

The backend should now be available at:

* API homepage: `http://127.0.0.1:8000`
* Interactive documentation: `http://127.0.0.1:8000/docs`

### Step 5: Open the Frontend

Open `index.html` in your browser.

In the frontend's connection settings, configure the API address as:

```text
http://127.0.0.1:8000
```

Ensure demo mode is disabled when you want to obtain a prediction from the actual model.

The frontend appends `/predict` to the configured API address.

---

## ☁️ Deployment

The FastAPI backend is configured for deployment on Render.

The production start command can use the hosting environment's assigned port:

```bash
uvicorn main:app --host 0.0.0.0 --port ${PORT:-10000}
```

For a deployed frontend, configure the API address as:

```text
https://mental-sense-ai-1.onrender.com
```

The FastAPI application currently enables CORS. For production use, configure CORS to allow only the trusted frontend origin rather than all origins.

---

## ⚠️ Limitations and Responsible Use

* The model's predictions depend on the quality and representativeness of the training dataset.
* A predicted score is not a medical diagnosis or clinical assessment.
* The model should not be used for high-stakes decisions about an individual's mental health.
* Performance may differ across populations and demographic groups.
* The meaning and interpretation of the target score depend on the dataset's definition.
* The deployed model artifact and preprocessing pipeline must remain compatible with the inference environment.

This project is intended for educational purposes and for demonstrating an end-to-end machine learning workflow.

---

## 👨‍💻 Author

**Tejus Saini**

AI/ML Enthusiast | Python Developer

GitHub: @tejussaini

---

