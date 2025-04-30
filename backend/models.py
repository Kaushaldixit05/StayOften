from sqlalchemy import Boolean, Column, ForeignKey, Integer, String, Float, Table, Text, ARRAY
from sqlalchemy.orm import relationship
from database import Base

# Association tables for many-to-many relationships
day_activity_association = Table(
    "day_activity",
    Base.metadata,
    Column("day_id", Integer, ForeignKey("itinerary_days.id")),
    Column("activity_id", Integer, ForeignKey("activities.id")),
)

day_transfer_association = Table(
    "day_transfer",
    Base.metadata,
    Column("day_id", Integer, ForeignKey("itinerary_days.id")),
    Column("transfer_id", Integer, ForeignKey("transfers.id")),
)

class Accommodation(Base):
    __tablename__ = "accommodations"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, index=True)
    location = Column(String)
    type = Column(String)
    rating = Column(Integer)
    description = Column(Text)
    amenities = Column(ARRAY(String))
    image_url = Column(String)
    
    # Relationship
    days = relationship("ItineraryDay", back_populates="accommodation")

class Transfer(Base):
    __tablename__ = "transfers"

    id = Column(Integer, primary_key=True, index=True)
    from_location = Column(String)
    to_location = Column(String)
    type = Column(String)
    duration = Column(Float)  # in hours
    description = Column(Text)
    
    # Relationship
    days = relationship("ItineraryDay", secondary=day_transfer_association, back_populates="transfers")

class Activity(Base):
    __tablename__ = "activities"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, index=True)
    location = Column(String)
    category = Column(String)
    duration = Column(Float)  # in hours
    description = Column(Text)
    included = Column(ARRAY(String))
    image_url = Column(String)
    
    # Relationship
    days = relationship("ItineraryDay", secondary=day_activity_association, back_populates="activities")

class ItineraryDay(Base):
    __tablename__ = "itinerary_days"

    id = Column(Integer, primary_key=True, index=True)
    itinerary_id = Column(Integer, ForeignKey("itineraries.id"))
    day = Column(Integer)  # Day number in the itinerary
    accommodation_id = Column(Integer, ForeignKey("accommodations.id"))
    
    # Relationships
    itinerary = relationship("Itinerary", back_populates="days")
    accommodation = relationship("Accommodation", back_populates="days")
    activities = relationship("Activity", secondary=day_activity_association, back_populates="days")
    transfers = relationship("Transfer", secondary=day_transfer_association, back_populates="days")

class Itinerary(Base):
    __tablename__ = "itineraries"

    id = Column(Integer, primary_key=True, index=True)
    title = Column(String, index=True)
    destination = Column(String, index=True)
    duration = Column(Integer)  # in days
    price = Column(Float)
    description = Column(Text)
    highlights = Column(ARRAY(String))
    image_url = Column(String)
    is_recommended = Column(Boolean, default=False)
    
    # Relationship
    days = relationship("ItineraryDay", back_populates="itinerary", cascade="all, delete-orphan")