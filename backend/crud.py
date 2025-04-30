from sqlalchemy.orm import Session
from sqlalchemy import and_
from typing import List, Optional
import models, schemas

def get_itinerary(db: Session, itinerary_id: int):
    return db.query(models.Itinerary).filter(models.Itinerary.id == itinerary_id).first()

def get_itineraries(
    db: Session, 
    skip: int = 0, 
    limit: int = 100,
    duration: Optional[int] = None,
    destination: Optional[str] = None,
    max_price: Optional[float] = None
):
    query = db.query(models.Itinerary)
    
    # Apply filters if provided
    if duration:
        query = query.filter(models.Itinerary.duration == duration)
    
    if destination:
        query = query.filter(models.Itinerary.destination.like(f"%{destination}%"))
    
    if max_price:
        query = query.filter(models.Itinerary.price <= max_price)
    
    return query.offset(skip).limit(limit).all()

def get_recommended_itineraries(db: Session, duration: int, limit: int = 3):
    # Get recommended itineraries for the specified duration
    return db.query(models.Itinerary).filter(
        and_(
            models.Itinerary.duration == duration,
            models.Itinerary.is_recommended == True
        )
    ).limit(limit).all()

def create_itinerary(db: Session, itinerary: schemas.ItineraryCreate):
    # Create a new itinerary
    db_itinerary = models.Itinerary(
        title=itinerary.title,
        destination=itinerary.destination,
        duration=itinerary.duration,
        price=itinerary.price,
        description=itinerary.description,
        highlights=itinerary.highlights,
        image_url=itinerary.image_url,
        is_recommended=itinerary.is_recommended
    )
    db.add(db_itinerary)
    db.commit()
    db.refresh(db_itinerary)
    
    # In a real application, we would also create the days, accommodations, activities, etc.
    # For simplicity, we'll return the itinerary without days for now
    
    return db_itinerary