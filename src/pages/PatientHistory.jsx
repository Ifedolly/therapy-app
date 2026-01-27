import React, { useEffect, useState } from 'react'
import { db } from "../firebase";
import { collection, query, where, getDocs } from "firebase/firestore"

const PatientHistory = ({ patientId }) => {
    const [slots, setSlots] = useState([]);
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        if (!patientId) return

        const fetchHistory = async () => {
            try {
                const q = query(
                    collection(db, "slots"),
                    where("bookedBy", "==", patientId)
                )
                
                const snapshot = await getDocs(q);

                const data = snapshot.docs.map(doc => ({
                    id: doc.id,
                    ...doc.data()
                }))

                setSlots(data)
            }   catch (error) {
                console.error(error);
            }   finally{
                setLoading(false)
            }
        }

        fetchHistory();
    }, [patientId])  

    if (loading) return <p>Loading your sessions...</p>

    const now = new Date();

    const upcoming = slots.filter(slot => {
        const d = slot.dateTime?.toDate();
        return d >  now;
    })

    const completed = slots.filter(slot => {
        const d = slot.datetime?.toDate();
        return d <= now;
    })

    console.log()

  return (
    <section className='card'>
        <h2>My Sessions</h2>

        <h3>Upcoming</h3>
        {upcoming.length === 0 && <p>No upcoming sessions</p>}
        {upcoming.map(slot => (
            <p key={slot.id}>
                {slot.dateTime.toDate().toLocaleString()}
            </p>
        ))}

        <h3>Completed</h3>
        {completed.length === 0 && <p>No completed sessions</p>}
        {completed.map(slot => (
            <p key={slot.id}>
                {slot.dateTime.toDate().localeString()}
            </p>
        ))}
    </section>
  )
}

export default PatientHistory