import pandas as pd

BASE_FEATURES = [
    "age", "sex", "cp", "trestbps", "chol",
    "fbs", "restecg", "thalach", "exang",
    "oldpeak", "slope", "ca", "thal"
]

ENGINEERED_FEATURES = [
    "age_x_trestbps",
    "age_x_chol",
    "chol_x_trestbps"
]

FEATURE_ORDER = BASE_FEATURES + ENGINEERED_FEATURES


def preprocess_input(data: dict):
    """
    Safe preprocessing for inference
    """

    # ---- Extract base values safely ----
    age = float(data["age"])
    trestbps = float(data["trestbps"])
    chol = float(data["chol"])

    # ---- Create NEW feature dict (DO NOT modify input) ----
    row = {
        "age": age,
        "sex": float(data["sex"]),
        "cp": float(data["cp"]),
        "trestbps": trestbps,
        "chol": chol,
        "fbs": float(data["fbs"]),
        "restecg": float(data["restecg"]),
        "thalach": float(data["thalach"]),
        "exang": float(data["exang"]),
        "oldpeak": float(data["oldpeak"]),
        "slope": float(data["slope"]),
        "ca": float(data["ca"]),
        "thal": float(data["thal"]),
        # engineered
        "age_x_trestbps": age * trestbps,
        "age_x_chol": age * chol,
        "chol_x_trestbps": chol * trestbps
    }

    return pd.DataFrame([row], columns=FEATURE_ORDER)
