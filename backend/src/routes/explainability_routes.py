from flask import Blueprint, request, jsonify
import joblib

from services.explainability.ebm_service import get_ebm_explanation
from services.explainability.doctor_explainer import doctor_style_explanation
from controllers.prediction_controller import preprocess_input

# Load model once
xgb_model = joblib.load("models/xgboost_heart_pipeline_v2.pkl")

explainable_bp = Blueprint("explainable_bp", __name__)

# ✅ DECORATOR FIXED
@explainable_bp.route("/predict-explain", methods=["POST"])
def predict_with_explanation():
    data = request.get_json()

    # Preprocess input
    X = preprocess_input(data)

    # XGBoost prediction (AUTHORITATIVE)
    prob = xgb_model.predict_proba(X)[0][1]
    prediction = int(prob >= 0.5)

    # EBM explanation
    ebm_features = get_ebm_explanation(X)

    # Doctor-style explanation
    explanation_text = doctor_style_explanation(
        ebm_features, prediction, prob
    )

    return jsonify({
        "prediction": prediction,
        "risk_probability": round(float(prob), 4),
        "top_features": list(ebm_features.items())[:5],
        "doctor_explanation": explanation_text,
        "prediction_model": "XGBoost",
        "explanation_model": "EBM"
    })
