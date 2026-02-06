from flask import Flask
from flask_cors import CORS
from routes.api_routes import predict_bp
from routes.insights_routes import insights_bp
from routes.explainability_routes import explainable_bp
def create_app():
    app = Flask(__name__)
    CORS(app)  # Allow frontend requests (Vite)

    # ✅ Register routes
    app.register_blueprint(predict_bp, url_prefix="/api")
    app.register_blueprint(explainable_bp, url_prefix="/api")
    app.register_blueprint(insights_bp, url_prefix="/api")  # Add prefix for clarity

    return app


if __name__ == "__main__":
    app = create_app()
    app.run(debug=True, port=5000)
