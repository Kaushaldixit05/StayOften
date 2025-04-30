from typing import List, Optional
from pydantic import BaseModel

# Accommodation schemas
class AccommodationBase(BaseModel):
    name: str
    location: str
    type: str
    rating: int
    description: str
    amenities: List[str]
    image_url: str

class Accommodation(AccommodationBase):
    id: int

    class Config:
        from_attributes = True

# Transfer schemas
class TransferBase(BaseModel):
    from_location: str
    to_location: str
    type: str
    duration: float
    description: str

class Transfer(TransferBase):
    id: int

    class Config:
        from_attributes = True

# Activity schemas
class ActivityBase(BaseModel):
    name: str
    location: str
    category: str
    duration: float
    description: str
    included: List[str]
    image_url: str

class Activity(ActivityBase):
    id: int

    class Config:
        from_attributes = True

# ItineraryDay schemas
class ItineraryDayBase(BaseModel):
    day: int

class ItineraryDay(ItineraryDayBase):
    accommodation: Accommodation
    transfers: List[Transfer]
    activities: List[Activity]

    class Config:
        from_attributes = True

# Itinerary schemas
class ItineraryBase(BaseModel):
    title: str
    destination: str
    duration: int
    price: float
    description: str
    highlights: List[str]
    image_url: str
    is_recommended: bool = False

class ItineraryCreate(ItineraryBase):
    pass

class Itinerary(ItineraryBase):
    id: int
    days: List[ItineraryDay]

    class Config:
        from_attributes = True