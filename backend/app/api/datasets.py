from io import BytesIO
from fastapi import APIRouter, File, HTTPException, UploadFile
import pandas as pd

router = APIRouter()

@router.post("/profile")
async def profile_dataset(file: UploadFile = File(...)):
    name = (file.filename or "").lower()
    if not name.endswith((".csv", ".xlsx", ".xls")):
        raise HTTPException(status_code=400, detail="Upload a CSV or Excel file.")

    content = await file.read()
    if not content:
        raise HTTPException(status_code=400, detail="The uploaded file is empty.")
    if len(content) > 20 * 1024 * 1024:
        raise HTTPException(status_code=413, detail="Maximum upload size is 20 MB.")

    try:
        if name.endswith(".csv"):
            df = pd.read_csv(BytesIO(content))
        else:
            df = pd.read_excel(BytesIO(content))
    except Exception as exc:
        raise HTTPException(status_code=400, detail=f"Could not read dataset: {exc}")

    preview = df.head(5).where(pd.notna(df.head(5)), None).to_dict(orient="records")
    return {
        "filename": file.filename,
        "rows": int(df.shape[0]),
        "columns": int(df.shape[1]),
        "column_names": [str(c) for c in df.columns],
        "missing_values": {str(k): int(v) for k, v in df.isna().sum().items()},
        "duplicate_rows": int(df.duplicated().sum()),
        "preview": preview,
    }
