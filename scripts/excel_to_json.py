import pandas as pd
import json
import sys
import os

# Hardcode file paths
excel_file = r"C:\Users\randex\Desktop\proyek psd esd\PDMESD.xlsx"
json_file = r"C:\Users\randex\Desktop\proyek psd esd\tags.json"

try:
    # Ensure the Excel file exists
    if not os.path.exists(excel_file):
        raise FileNotFoundError(f"Excel file not found: {excel_file}")

    df = pd.read_excel(excel_file)
    # Convert DataFrame to a list of dictionaries (JSON format)
    # Ensure column names are lowercase and replace spaces with underscores
    df.columns = df.columns.str.lower().str.replace(' ', '_')
    data = df.to_dict(orient='records')

    with open(json_file, 'w') as f:
        json.dump(data, f, indent=2)
    print(f"Successfully converted '{excel_file}' to '{json_file}'")
except Exception as e:
    print(f"Error converting Excel to JSON: {e}", file=sys.stderr)
    sys.exit(1)