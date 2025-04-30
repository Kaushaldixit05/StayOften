from fastapi import FastAPI, HTTPException, Depends
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session
from typing import List, Optional
import models, schemas, crud
from database import SessionLocal, engine, init_db

app = FastAPI(title="Travel Itinerary API")

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # In production, replace with specific origins
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Initialize database
models.Base.metadata.create_all(bind=engine)

# Dependency
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@app.on_event("startup")
async def startup_event():
    init_db()

# API routes
@app.get("/")
def read_root():
    return {"message": "Welcome to the Travel Itinerary API"}

@app.get("/api/itineraries", response_model=List[schemas.Itinerary])
def get_itineraries(
    duration: Optional[int] = None, 
    destination: Optional[str] = None,
    max_price: Optional[float] = None,
    db: Session = Depends(get_db)
):
    return crud.get_itineraries(db, duration=duration, destination=destination, max_price=max_price)

@app.get("/api/itineraries/{itinerary_id}", response_model=schemas.Itinerary)
def get_itinerary(itinerary_id: int, db: Session = Depends(get_db)):
    itinerary = crud.get_itinerary(db, itinerary_id=itinerary_id)
    if itinerary is None:
        raise HTTPException(status_code=404, detail="Itinerary not found")
    return itinerary

@app.post("/api/itineraries", response_model=schemas.Itinerary)
def create_itinerary(itinerary: schemas.ItineraryCreate, db: Session = Depends(get_db)):
    return crud.create_itinerary(db=db, itinerary=itinerary)

@app.get("/api/recommended-itineraries", response_model=List[schemas.Itinerary])
def get_recommended_itineraries(duration: int, db: Session = Depends(get_db)):
    return crud.get_recommended_itineraries(db, duration=duration)

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)