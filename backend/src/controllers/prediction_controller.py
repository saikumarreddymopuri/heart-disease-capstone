from flask import request, jsonify
import joblib
from utils.preprocessing import preprocess_input

# Load model once
xgb_model = joblib.load("models/xgboost_heart_pipeline_v2.pkl")

def predict_heart_disease():
    try:
        data = request.get_json()

        X = preprocess_input(data)   # Pandas DataFrame (correct)

        # Predict probability
        prob_disease = xgb_model.predict_proba(X)[0][1]
        prediction = int(prob_disease >= 0.5)

        return jsonify({
            "prediction": prediction,
            "risk_probability": round(float(prob_disease), 4),
            "message": "High risk" if prediction == 1 else "Low risk"
        })

    except Exception as e:
        return jsonify({"error": str(e)}), 500
