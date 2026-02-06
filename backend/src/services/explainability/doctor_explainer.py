import os
import google.generativeai as genai
#print(os.getenv("GOOGLE_API_KEY"))
# add your key here API KEY
Key ="put your key here"
genai.configure(api_key=Key)

model = genai.GenerativeModel("gemini-2.5-flash")


def doctor_style_explanation(feature_impacts, prediction, probability):
    """
    Uses Google Gemini to generate doctor-style explanation
    """

    # Prepare top features
    feature_summary = "\n".join([
        f"- {feature}: {'increases risk' if impact > 0 else 'reduces risk'} "
        f"(impact score {impact:.2f})"
        for feature, impact in list(feature_impacts.items())[:5]
    ])

    prompt = f"""
You are a senior cardiologist explaining test results to a patient.

Prediction result:
- Risk level: {"High Risk" if prediction == 1 else "Low Risk"}
- Estimated probability: {probability*100:.1f}%

Key contributing factors:
{feature_summary}

Explain this in simple, reassuring language.
Avoid technical ML terms.
Sound like a real doctor talking to a patient.
Do not mention models or algorithms.
"""

    response = model.generate_content(prompt)

    return response.text.strip()
