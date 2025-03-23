import threading
import psycopg2
import select
import os
import json
import requests
from dotenv import load_dotenv
from fastapi import FastAPI, Request
from kpi_compute import compute_all_normalized_kpis

load_dotenv()
app = FastAPI()
DATABASE_URL = os.getenv("DATABASE_URL")

@app.post("/receive-kpi")
async def receive_kpi(data: Request):
    body = await data.json()
    print("Received KPI Data:")
    print(json.dumps(body, indent=2))
    return {"status": "Received successfully"}