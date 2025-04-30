from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker
import os

# Using SQLite for simplicity
# In production, use a proper database like PostgreSQL
SQLALCHEMY_DATABASE_URL = "postgresql://neondb_owner:npg_ya20PckGYmqJ@ep-orange-star-a41n32db-pooler.us-east-1.aws.neon.tech/neondb?sslmode=require"

engine = create_engine(
    SQLALCHEMY_DATABASE_URL
)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

Base = declarative_base()

# Function to initialize database with seed data
def init_db():
    from models import Accommodation, Transfer, Activity, ItineraryDay, Itinerary
    from sqlalchemy.orm import Session
    import json
    import os.path
    
    # Skip if the database already exists and is populated
    if os.path.exists("./travel_itinerary.db"):
        db = SessionLocal()
        if db.query(Itinerary).count() > 0:
            db.close()
            return
        db.close()
    
    # Create tables
    Base.metadata.create_all(bind=engine)
    
    # Seed data
    seed_data = _get_seed_data()
    
    db = SessionLocal()
    
    try:
        # Insert seed data
        for accommodation_data in seed_data["accommodations"]:
            db.add(Accommodation(**accommodation_data))
        
        for transfer_data in seed_data["transfers"]:
            db.add(Transfer(**transfer_data))
        
        for activity_data in seed_data["activities"]:
            db.add(Activity(**activity_data))
        
        # Commit to get IDs for relationships
        db.commit()
        
        # Create itineraries
        for itinerary_data in seed_data["itineraries"]:
            days_data = itinerary_data.pop("days")
            itinerary = Itinerary(**itinerary_data)
            db.add(itinerary)
            db.flush()  # Get itinerary ID
            
            for day_data in days_data:
                day = ItineraryDay(
                    itinerary_id=itinerary.id,
                    day=day_data["day"],
                    accommodation_id=day_data["accommodation_id"],
                )
                db.add(day)
                db.flush()  # Get day ID
                
                # Add activity and transfer relationships
                for activity_id in day_data["activity_ids"]:
                    day.activities.append(db.query(Activity).get(activity_id))
                
                for transfer_id in day_data["transfer_ids"]:
                    day.transfers.append(db.query(Transfer).get(transfer_id))
        
        db.commit()
    except Exception as e:
        db.rollback()
        raise e
    finally:
        db.close()

def _get_seed_data():
    # This would typically be loaded from a JSON file
    # For simplicity, we'll define it inline
    return {
        "accommodations": [
            {
                "id": 1,
                "name": "The Palmery Resort & Spa",
                "location": "Patong Beach, Phuket",
                "type": "Resort",
                "rating": 4,
                "description": "A beautiful resort near Patong Beach with lush gardens and a spa.",
                "amenities": ["Swimming Pool", "Spa", "Restaurant", "Free WiFi", "Airport Shuttle"],
                "image_url": "https://images.pexels.com/photos/53464/sheraton-palace-hotel-lobby-architecture-53464.jpeg"
            },
            {
                "id": 2,
                "name": "Krabi Sea Resort",
                "location": "Ao Nang, Krabi",
                "type": "Beach Resort",
                "rating": 5,
                "description": "Luxury beachfront resort with stunning views of limestone karsts.",
                "amenities": ["Private Beach", "Infinity Pool", "Spa", "Multiple Restaurants", "Water Sports"],
                "image_url": "https://images.pexels.com/photos/189296/pexels-photo-189296.jpeg"
            },
            {
                "id": 3,
                "name": "Island View Hotel",
                "location": "Phi Phi Islands",
                "type": "Boutique Hotel",
                "rating": 4,
                "description": "Charming hotel with panoramic views of the Phi Phi archipelago.",
                "amenities": ["Ocean View", "Restaurant", "Bar", "Snorkeling Equipment", "Tour Desk"],
                "image_url": "https://images.pexels.com/photos/261102/pexels-photo-261102.jpeg"
            },
            {
                "id": 4,
                "name": "Railay Beach Resort",
                "location": "Railay, Krabi",
                "type": "Beach Resort",
                "rating": 4,
                "description": "Located on the stunning Railay Peninsula, accessible only by boat.",
                "amenities": ["Beachfront", "Two Pools", "Spa", "Restaurant", "Rock Climbing"],
                "image_url": "https://images.pexels.com/photos/258154/pexels-photo-258154.jpeg"
            }
        ],
        "transfers": [
            {
                "id": 1,
                "from_location": "Phuket International Airport",
                "to_location": "The Palmery Resort & Spa",
                "type": "Private Car",
                "duration": 1,
                "description": "Comfortable private transfer from the airport to your hotel with air conditioning and bottled water."
            },
            {
                "id": 2,
                "from_location": "The Palmery Resort & Spa",
                "to_location": "Rassada Pier",
                "type": "Minivan",
                "duration": 0.5,
                "description": "Morning transfer to Rassada Pier for your Phi Phi Islands tour."
            },
            {
                "id": 3,
                "from_location": "Rassada Pier",
                "to_location": "The Palmery Resort & Spa",
                "type": "Minivan",
                "duration": 0.5,
                "description": "Evening return transfer from Rassada Pier to your hotel."
            },
            {
                "id": 4,
                "from_location": "The Palmery Resort & Spa",
                "to_location": "Phuket International Airport",
                "type": "Private Car",
                "duration": 1,
                "description": "Transfer to the airport for your departure flight."
            },
            {
                "id": 5,
                "from_location": "Krabi International Airport",
                "to_location": "Krabi Sea Resort",
                "type": "Private Car",
                "duration": 0.5,
                "description": "Direct transfer from Krabi Airport to your beachfront resort."
            },
            {
                "id": 6,
                "from_location": "Krabi Sea Resort",
                "to_location": "Ao Nang Pier",
                "type": "Shuttle",
                "duration": 0.25,
                "description": "Hotel shuttle to Ao Nang Pier for island tours."
            },
            {
                "id": 7,
                "from_location": "Phuket",
                "to_location": "Krabi",
                "type": "Ferry",
                "duration": 2,
                "description": "Scenic ferry ride between Phuket and Krabi with stunning views."
            }
        ],
        "activities": [
            {
                "id": 1,
                "name": "Phi Phi Islands Tour",
                "location": "Phi Phi Islands",
                "category": "Island Tour",
                "duration": 8,
                "description": "Full-day speedboat tour to the stunning Phi Phi Islands. Visit Maya Bay, explore Viking Cave, and enjoy snorkeling in crystal clear waters.",
                "included": ["Speedboat transfer", "Lunch", "Snorkeling equipment", "National park fees", "English-speaking guide"],
                "image_url": "https://images.pexels.com/photos/1450353/pexels-photo-1450353.jpeg"
            },
            {
                "id": 2,
                "name": "Patong Beach Relaxation",
                "location": "Patong Beach, Phuket",
                "category": "Beach",
                "duration": 4,
                "description": "Spend your afternoon relaxing at the famous Patong Beach. Lounge on the sand, swim in the Andaman Sea, or try water sports.",
                "included": ["Beach chair", "Umbrella"],
                "image_url": "https://images.pexels.com/photos/1174732/pexels-photo-1174732.jpeg"
            },
            {
                "id": 3,
                "name": "Thai Cooking Class",
                "location": "Phuket Cooking Academy",
                "category": "Cultural",
                "duration": 4,
                "description": "Learn to prepare authentic Thai dishes with a professional chef. Visit a local market to select fresh ingredients, then cook several dishes.",
                "included": ["Market tour", "Cooking class", "Lunch", "Recipe booklet"],
                "image_url": "https://images.pexels.com/photos/5718071/pexels-photo-5718071.jpeg"
            },
            {
                "id": 4,
                "name": "Big Buddha and Temple Tour",
                "location": "Phuket",
                "category": "Cultural",
                "duration": 4,
                "description": "Visit Phuket's famous Big Buddha statue and Wat Chalong Temple. Learn about Thai Buddhism and enjoy panoramic views of the island.",
                "included": ["English-speaking guide", "Entrance fees", "Bottled water"],
                "image_url": "https://images.pexels.com/photos/6266007/pexels-photo-6266007.jpeg"
            },
            {
                "id": 5,
                "name": "Four Islands Tour",
                "location": "Krabi",
                "category": "Island Tour",
                "duration": 7,
                "description": "Visit four stunning islands around Krabi: Phra Nang Cave Beach, Tup Island, Chicken Island, and Poda Island with snorkeling opportunities.",
                "included": ["Longtail boat", "Lunch", "Snorkeling gear", "National park fees"],
                "image_url": "https://images.pexels.com/photos/1320684/pexels-photo-1320684.jpeg"
            },
            {
                "id": 6,
                "name": "Rock Climbing at Railay",
                "location": "Railay, Krabi",
                "category": "Adventure",
                "duration": 4,
                "description": "Try rock climbing on Railay's world-famous limestone cliffs with professional instructors. Suitable for beginners and experienced climbers.",
                "included": ["Equipment", "Instructor", "Insurance", "Refreshments"],
                "image_url": "https://images.pexels.com/photos/1574216/pexels-photo-1574216.jpeg"
            },
            {
                "id": 7,
                "name": "Night Market Food Tour",
                "location": "Phuket Town",
                "category": "Food",
                "duration": 3,
                "description": "Explore the vibrant night markets of Phuket Town and sample a variety of authentic Thai street food dishes.",
                "included": ["Food samples", "Local guide", "One drink"],
                "image_url": "https://images.pexels.com/photos/2696064/pexels-photo-2696064.jpeg"
            },
            {
                "id": 8,
                "name": "Hong Island Kayaking",
                "location": "Hong Island, Krabi",
                "category": "Adventure",
                "duration": 6,
                "description": "Kayak through the stunning lagoons and caves of Hong Island, exploring hidden beaches and mangrove forests.",
                "included": ["Kayak rental", "Guide", "Lunch", "National park fees"],
                "image_url": "https://images.pexels.com/photos/1430672/pexels-photo-1430672.jpeg"
            }
        ],
        "itineraries": [
            {
                "title": "Phuket Paradise Explorer",
                "destination": "Phuket",
                "duration": 4,
                "price": 799,
                "description": "Experience the best of Phuket with this perfectly balanced 4-day itinerary. From stunning beaches to cultural sites, delicious food experiences to island adventures.",
                "highlights": [
                    "Relaxing day at world-famous Patong Beach with water activities",
                    "Full-day Phi Phi Islands speedboat tour with snorkeling",
                    "Authentic Thai cooking class learning to prepare local specialties",
                    "Big Buddha and cultural temple tour with panoramic island views"
                ],
                "image_url": "https://images.pexels.com/photos/1268855/pexels-photo-1268855.jpeg",
                "is_recommended": True,
                "days": [
                    {
                        "day": 1,
                        "accommodation_id": 1,
                        "activity_ids": [2],
                        "transfer_ids": [1]
                    },
                    {
                        "day": 2,
                        "accommodation_id": 1,
                        "activity_ids": [1],
                        "transfer_ids": [2, 3]
                    },
                    {
                        "day": 3,
                        "accommodation_id": 1,
                        "activity_ids": [3, 4],
                        "transfer_ids": []
                    },
                    {
                        "day": 4,
                        "accommodation_id": 1,
                        "activity_ids": [7],
                        "transfer_ids": [4]
                    }
                ]
            },
            {
                "title": "Krabi Adventure",
                "destination": "Krabi",
                "duration": 4,
                "price": 899,
                "description": "Adventure through the limestone karsts and emerald waters of Krabi with this action-packed 4-day itinerary.",
                "highlights": [
                    "Railay Beach rock climbing adventure on world-famous limestone cliffs",
                    "Four Islands boat tour exploring Krabi's most beautiful beaches",
                    "Hong Island kayaking experience through stunning lagoons",
                    "Free time to explore Ao Nang's beaches and viewpoints"
                ],
                "image_url": "https://images.pexels.com/photos/1450353/pexels-photo-1450353.jpeg",
                "is_recommended": True,
                "days": [
                    {
                        "day": 1,
                        "accommodation_id": 2,
                        "activity_ids": [],
                        "transfer_ids": [5]
                    },
                    {
                        "day": 2,
                        "accommodation_id": 2,
                        "activity_ids": [5],
                        "transfer_ids": [6]
                    },
                    {
                        "day": 3,
                        "accommodation_id": 4,
                        "activity_ids": [6],
                        "transfer_ids": []
                    },
                    {
                        "day": 4,
                        "accommodation_id": 2,
                        "activity_ids": [8],
                        "transfer_ids": []
                    }
                ]
            },
            {
                "title": "Phuket & Krabi Combo",
                "destination": "Phuket & Krabi",
                "duration": 7,
                "price": 1499,
                "description": "Experience the best of both Phuket and Krabi in one perfect itinerary, combining beautiful beaches, cultural experiences, and adventure activities.",
                "highlights": [
                    "Explore the vibrant beaches and nightlife of Phuket",
                    "Island hopping to the stunning Phi Phi Islands",
                    "Adventure activities in Krabi including rock climbing and kayaking",
                    "Scenic ferry transfer between Phuket and Krabi"
                ],
                "image_url": "https://images.pexels.com/photos/1287460/pexels-photo-1287460.jpeg",
                "is_recommended": True,
                "days": [
                    {
                        "day": 1,
                        "accommodation_id": 1,
                        "activity_ids": [2],
                        "transfer_ids": [1]
                    },
                    {
                        "day": 2,
                        "accommodation_id": 1,
                        "activity_ids": [1],
                        "transfer_ids": [2, 3]
                    },
                    {
                        "day": 3,
                        "accommodation_id": 1,
                        "activity_ids": [3, 7],
                        "transfer_ids": []
                    },
                    {
                        "day": 4,
                        "accommodation_id": 2,
                        "activity_ids": [],
                        "transfer_ids": [7]
                    },
                    {
                        "day": 5,
                        "accommodation_id": 2,
                        "activity_ids": [5],
                        "transfer_ids": [6]
                    },
                    {
                        "day": 6,
                        "accommodation_id": 4,
                        "activity_ids": [6],
                        "transfer_ids": []
                    },
                    {
                        "day": 7,
                        "accommodation_id": 2,
                        "activity_ids": [8],
                        "transfer_ids": []
                    }
                ]
            }
        ]
    }