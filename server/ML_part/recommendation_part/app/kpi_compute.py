import pandas as pd
import numpy as np
from db import get_connection
from recommendation import generate_recommendations

# Normalize KPI values using Z-score method (scaled to mean=50, std=10)
def z_score_normalization(values, inverse=False):
    mean_val = values.mean()
    std_dev = values.std()
    if std_dev == 0:
        return np.full(len(values), 50)
    z_scores = (values - mean_val) / std_dev
    if inverse:
        z_scores = -z_scores
    return 50 + (z_scores * 10)

# Main function to calculate and store normalized KPIs for a given session
def compute_all_normalized_kpis(farm_id: int):
    conn = get_connection()
    cur = conn.cursor()

    # Get current session data
    session_query = """
    SELECT id, crop_type, farm_size, actual_harvest, seed_quantity,
           water_usage, labor_hours, seed_cost, irrigation_cost, labor_wages
    FROM sessions
    WHERE id = %s
    """
    current_df = pd.read_sql(session_query, conn, params=(farm_id,))
    if current_df.empty:
        return {"error": "Farm session not found"}
    crop_type = current_df.iloc[0]["crop_type"]