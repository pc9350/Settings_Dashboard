from fastapi import FastAPI, Query
from fastapi.middleware.cors import CORSMiddleware
from typing import List, Dict, Any, Optional
from datetime import datetime

app = FastAPI(title="Fridge Settings API")

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Sample data
SETTINGS_DATA = {
    "data": [
        {
            "fridge_id": 1,
            "instrument_name": "instrument_one",
            "parameter_name": "flux_bias",
            "applied_value": 0.37,
            "timestamp": 1739596596
        },
        {
            "fridge_id": 2,
            "instrument_name": "instrument_two",
            "parameter_name": "temperature",
            "applied_value": -0.12,
            "timestamp": 1739597890
        },
        {
            "fridge_id": 3,
            "instrument_name": "instrument_three",
            "parameter_name": "power_level",
            "applied_value": 1.25,
            "timestamp": 1739601234
        },
        {
            "fridge_id": 1,
            "instrument_name": "instrument_four",
            "parameter_name": "current_bias",
            "applied_value": 0.89,
            "timestamp": 1739612345
        },
        {
            "fridge_id": 2,
            "instrument_name": "instrument_five",
            "parameter_name": "voltage",
            "applied_value": 0.02,
            "timestamp": 1739623456
        }
    ]
}

def format_timestamp(timestamp: int) -> str:
    """Convert Unix timestamp to human-readable format."""
    return datetime.fromtimestamp(timestamp).strftime("%Y-%m-%d %H:%M:%S")

@app.get("/")
def read_root():
    return {"message": "Welcome to the Fridge Settings API", "endpoints": ["/settings"]}

@app.get("/settings")
def get_settings(
    fridge_id: Optional[int] = None,
    instrument_name: Optional[str] = None,
    parameter_name: Optional[str] = None,
    min_value: Optional[float] = None,
    max_value: Optional[float] = None,
):
    """
    Get settings with optional filtering.
    
    - **fridge_id**: Filter by fridge ID
    - **instrument_name**: Filter by instrument name
    - **parameter_name**: Filter by parameter name
    - **min_value**: Filter by minimum applied value
    - **max_value**: Filter by maximum applied value
    """
    # Start with all data
    filtered_data = SETTINGS_DATA["data"].copy()
    
    # Apply filters if provided
    if fridge_id is not None:
        filtered_data = [item for item in filtered_data if item["fridge_id"] == fridge_id]
    
    if instrument_name is not None:
        filtered_data = [item for item in filtered_data if instrument_name.lower() in item["instrument_name"].lower()]
    
    if parameter_name is not None:
        filtered_data = [item for item in filtered_data if parameter_name.lower() in item["parameter_name"].lower()]
    
    if min_value is not None:
        filtered_data = [item for item in filtered_data if item["applied_value"] >= min_value]
    
    if max_value is not None:
        filtered_data = [item for item in filtered_data if item["applied_value"] <= max_value]
    
    # Formatting the data for display purposes
    result = {"data": []}
    for item in filtered_data:
        entry = item.copy()
        entry["formatted_time"] = format_timestamp(entry["timestamp"])
        result["data"].append(entry)
    
    return result

@app.get("/stats")
def get_stats():
    """Get statistics about the settings data."""
    data = SETTINGS_DATA["data"]
    
    # Calculating unique values
    unique_fridges = len(set(item["fridge_id"] for item in data))
    unique_instruments = len(set(item["instrument_name"] for item in data))
    unique_parameters = len(set(item["parameter_name"] for item in data))
    
    # Calculate min/max/avg values
    values = [item["applied_value"] for item in data]
    min_value = min(values) if values else 0
    max_value = max(values) if values else 0
    avg_value = sum(values) / len(values) if values else 0
    
    return {
        "total_settings": len(data),
        "unique_fridges": unique_fridges,
        "unique_instruments": unique_instruments,
        "unique_parameters": unique_parameters,
        "min_value": min_value,
        "max_value": max_value,
        "avg_value": round(avg_value, 2)
    }

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True) 