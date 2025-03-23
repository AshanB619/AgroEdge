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