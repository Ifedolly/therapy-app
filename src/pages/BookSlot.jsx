import { React, useState } from 'react'
import { db } from "../firebase";
import { doc, runTransaction, serverTimestamp } from "firebase/firestore"

const BookSlot = ({ slotId, patientId, onBooked }) => {
    const [booking, setBooking] = useState(false);

    const handleBookSlot = async () => {
        if (booking) return;
        setBooking(true)

        const slotRef = doc(db, "slots", slotId);

        try {
            await runTransaction(db, async (transaction) => {
                const slotSnap = await transaction.get(slotRef);

                if(!slotSnap.exists()) {
                    throw new Error("Slot does not exist");
                }

                if(slotSnap.data().isBooked) {
                    throw new Error("Slot already booked");
                }

                transaction.update(slotRef, {
                    isBooked: true,
                    bookedBy: patientId,
                    bookedAt: serverTimestamp(),
                });
            });

            onBooked?.(slotId);
            alert("Slot booked succesfully!");

        }   catch (error) {
            alert(error.message)
        }  finally {
            setBooking(false)
        };
    };

    return (
        <button onClick={handleBookSlot} disabled={booking}>
            {booking ? "Booking..." : "Book Slot"}
        </button>
    )
}

export default BookSlot