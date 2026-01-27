import React, { useEffect, useState } from 'react'
import { db } from "../firebase"
import { collection, query, where, getDocs } from "firebase/firestore"
import BookSlot from "./BookSlot"

const PatientSlots = ({ patientId }) => {
    const [slots, setSlots] = useState([])
    const [loading, setLoading] = useState(true)
    const [now, setNow] = useState(new Date())

    useEffect(() => {
        const fetchSlots = async () => {
            try {
                const q = query(
                    collection(db, "slots"),
                    where("isBooked", "==", false)
                )

                const querySnapshot = await getDocs(q)

                const slotsData = querySnapshot.docs.map(doc => ({
                    id: doc.id,
                    ...doc.data()
                }))

                setSlots(slotsData)
            } catch (error) {
                console.error(error)
            } finally {
                setLoading(false)
            }
        }

        fetchSlots()
    }, [patientId])

    useEffect(() => {
        const interval = setInterval(() => {
            setNow(new Date());
        }, 60 * 1000); 

        return () => clearInterval(interval);
    }, []);


    if (loading) return <p>Loading available slots...</p>


    // Only show slots in the future
    // const availableSlots = slots.filter(slot => {
    //     const slotDate = slot.dateTime?.toDate ? slot.dateTime.toDate() : new Date(slot.dateTime)
    //     return slotDate > now
    // })

    const availableSlots = slots.filter(slot => {
        const end = slot.endTime?.toDate
            ? slot.endTime.toDate()
            : new Date(slot.endTime);
        return end > now;
    });


    return (
        <section className='card'>
            <h2>Available Slots</h2>

            {availableSlots.length === 0 && (
                <p>No available slots at the moment.</p>
            )}

            {availableSlots.map(slot => {
                const slotDate = slot.dateTime?.toDate ? slot.dateTime.toDate() : new Date(slot.dateTime)
                return (
                    <div className='card' key={slot.id}>
                        <span>{slotDate.toLocaleString()}</span>{" "}
                        <BookSlot
                            slotId={slot.id}
                            patientId={patientId}
                            onBooked={(id) =>
                                setSlots(prev => prev.filter(s => s.id !== id))
                            }
                        />
                    </div>
                )
            })}
        </section>
    )
}

export default PatientSlots
