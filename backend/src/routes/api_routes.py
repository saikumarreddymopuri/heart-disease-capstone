from flask import Blueprint
from controllers.prediction_controller import predict_heart_disease

predict_bp = Blueprint("predict_bp", __name__)

predict_bp.route("/predict", methods=["POST"])(predict_heart_disease)
