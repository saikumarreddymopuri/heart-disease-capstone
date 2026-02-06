import joblib

# Load EBM once
ebm_model = joblib.load("models/ebm_heart_model.pkl")

def get_ebm_explanation(X):
    """
    Returns feature-wise contribution for a single prediction
    """

    explanation = ebm_model.explain_local(X, [0])
    data = explanation.data(0)

    names = data["names"]
    scores = data["scores"]

    feature_contributions = dict(zip(names, scores))

    # Sort by absolute impact
    feature_contributions = dict(
        sorted(feature_contributions.items(),
               key=lambda x: abs(x[1]),
               reverse=True)
    )

    return feature_contributions
