import React, { useEffect, useState } from "react";
import { db } from "../firebase";
import { collection, addDoc, serverTimestamp, query, where, getDocs } from "firebase/firestore";
import { SLOT_DURATION_MINUTES } from "../constants/slotConfig";
import '../styles/therapist.css'

const TherapistDashboard = () => {
  const therapistId = "TEST_THERAPIST_ID";
  const [slots, setSlots] = useState([]);
  const [loading, setLoading] = useState(true);
  const [dateTime, setDateTime] = useState("");
  const [now, setNow] = useState(new Date());

  useEffect(() => {
    fetchSlots();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setNow(new Date());
    }, 60 * 1000);

    return () => clearInterval(interval);
  }, []);


  const fetchSlots = async () => {
    setLoading(true);
    try {
      const q = query(
        collection(db, "slots"),
        where("therapistId", "==", therapistId)
      );

      const snapshot = await getDocs(q);

      const data = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));

      setSlots(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateSlot = async (e) => {
    e.preventDefault();

    if (!dateTime) {
      alert("Please select date and time");
      return;
    }

    const selectedDate = new Date(dateTime);
    const endTime = new Date(
      selectedDate.getTime() + SLOT_DURATION_MINUTES * 60 * 1000
    );
    const now = new Date();
    if (selectedDate <= now) {
      alert("Cannot create a slot in the past");
      return;
    }

    try {
      //duplicate slot check
      const q = query(
        collection(db, "slots"),
        where("therapistId", "==", therapistId),
        where("dateTime", "==", selectedDate)
      );

      const existing = await getDocs(q);
      if (!existing.empty) {
        alert("Slot already exists for this time");
        return;
      }

      //slot creation
      await addDoc(collection(db, "slots"), {
        therapistId,
        dateTime: selectedDate,
        endTime,
        isBooked: false,
        createdAt: serverTimestamp()
      });

      alert("Slot created!");
      setDateTime("");
      fetchSlots(); //refresh immediately
    } catch (error) {
      console.error(error);
      alert("Error creating slot");
    }
  };

  if (loading) return <p>Loading dashboard...</p>;

  const availableSlots = slots.filter(slot => {
    const slotDate = slot.dateTime?.toDate ? slot.dateTime.toDate() : new Date(slot.dateTime)
    return !slot.isBooked && slotDate > now
  });

  const bookedSlots = slots.filter(slot => {
    const slotDate = slot.dateTime?.toDate ? slot.dateTime.toDate() : new Date(slot.dateTime)
    return slot.isBooked && slotDate > now
  });

  const completedSlots = slots.filter(slot => {
    const slotDate = slot.dateTime?.toDate ? slot.dateTime.toDate() : new Date(slot.dateTime)
    return slot.isBooked && slotDate < now
  });

  return (
    <div className="therapist-dashboard">
      <h2 className="dashboard-title">Welcome Back</h2>
      
      <div className="dashboard-grid">
        {/* Create Slot */}
        <section className="card">
          <h3>Create Slot</h3>
          <form onSubmit={handleCreateSlot}>
            <input
              type="datetime-local"
              value={dateTime}
              onChange={e => setDateTime(e.target.value)}
            />
            <button type="submit">Create Slot</button>
          </form>
        </section>

        {/* Available Slots */}
        <section className="card">
          <h3>Available Slots</h3>
          {availableSlots.length === 0 && <p>No available slots</p>}
          {availableSlots.map(slot => {
            const slotDate = slot.dateTime?.toDate
              ? slot.dateTime.toDate()
              : new Date(slot.dateTime);
            return <p key={slot.id}>{slotDate.toLocaleString()}</p>;
          })}
        </section>

        {/* Booked Sessions */}
        <section className="card">
          <h3>Booked Sessions</h3>
          {bookedSlots.length === 0 && <p>No upcoming bookings</p>}
          {bookedSlots.map(slot => {
            const slotDate = slot.dateTime?.toDate
              ? slot.dateTime.toDate()
              : new Date(slot.dateTime);
            return <p key={slot.id}>{slotDate.toLocaleString()}</p>;
          })}
        </section>

        {/* Completed Sessions */}
        <section className="card">
          <h3>Completed Sessions</h3>
          {completedSlots.length === 0 && <p>No past sessions</p>}
          {completedSlots.map(slot => {
            const slotDate = slot.dateTime?.toDate
              ? slot.dateTime.toDate()
              : new Date(slot.dateTime);
            return <p key={slot.id}>{slotDate.toLocaleString()}</p>;
          })}
        </section>
      </div>
    </div>
  );

};

export default TherapistDashboard;
