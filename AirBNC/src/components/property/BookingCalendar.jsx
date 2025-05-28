import React, { useState, useEffect } from 'react';
import { DateRange } from 'react-date-range';
import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';
import './CustomCalendar.css';
import { addDays, isWithinInterval } from 'date-fns';
import axios from 'axios';
import { useUser } from "../UserContext"

const BookingCalendar = ({property}) => {
  const { user, setUser } = useUser();
  const [selectionRange, setSelectionRange] = useState({
    startDate: new Date(),
    endDate: addDays(new Date(), 1),
    key: 'selection',
  });

  const [bookings, setBookings] = useState([]);
  const [disabledDates, setDisabledDates] = useState([]);
  const [userBookings, setUserBookings] = useState([]);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const res = await axios.get(`https://jl-air-bnc.onrender.com/api/properties/${property}/booking`);
        const userRes = await axios.get(`https://jl-air-bnc.onrender.com/api/users/${user.userID}/bookings`);

        setBookings(res.data.bookings);

        const dates = res.data.bookings.flatMap(booking => {
          const start = new Date(booking.check_in_date);
          const end = new Date(booking.check_out_date);
          const dateArray = [];
          let current = new Date(start);
          while (current <= end) {
            dateArray.push(new Date(current));
            current.setDate(current.getDate() + 1);
          }
          return dateArray;
        });


        const userBookingDates = userRes.data.bookings.flatMap(booking => {
          const start = new Date(booking.check_in_date);
          const end = new Date(booking.check_out_date);
          const dateArray = [];
          let current = new Date(start);
          while (current <= end) {
            dateArray.push({ date: new Date(current), bookingId: booking.booking_id });
            current.setDate(current.getDate() + 1);
          }
          return dateArray;
        });


        setDisabledDates([
          ...dates,
          ...userBookingDates.map(d => d.date),
        ]);
        setUserBookings(userBookingDates);
      } catch (error) {
        console.error('Failed to fetch bookings', error);
      }
    };

    fetchBookings();
  }, []);

  const handleSelect = (ranges) => {
    setSelectionRange(ranges.selection);
  };

  const isDateDisabled = (date) => {
    return disabledDates.some(disabled => disabled.toDateString() === date.toDateString());
  };

  const handleUserDateClick = (bookingId) => {
    const confirmCancel = window.confirm('Do you want to cancel this booking?');
    if (!confirmCancel) return;
  
    axios.delete(`https://jl-air-bnc.onrender.com/api/bookings/${bookingId}`)
      .then(() => {
        alert('Booking cancelled');
        // Re-fetch bookings or update state
        window.location.reload(); // Or refetch state
      })
      .catch((err) => {
        console.error(err);
        alert('Failed to cancel booking');
      });
  };

  const handleCreateBooking = async () => {
    console.log(
      user.userID,
      selectionRange.startDate.toISOString().split('T')[0],
      selectionRange.endDate.toISOString().split('T')[0],
      property
    )
    let current = new Date(selectionRange.startDate);
    while (current <= selectionRange.endDate) {
      if (isDateDisabled(current)) {
        alert('Selected range includes unavailable dates.');
        return;
      }
      current.setDate(current.getDate() + 1);
    }

    try {
      await axios.post(`https://jl-air-bnc.onrender.com/api/properties/${property}/booking`, {
        guest_id:user.userID,
        check_in_date:selectionRange.startDate.toISOString().split('T')[0],
        check_out_date:selectionRange.endDate.toISOString().split('T')[0],
      });
      alert('Booking created successfully');
    } catch (error) {
      console.error('Booking failed', error);
      alert('Failed to create booking');
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Book a Date Range</h2>
      <DateRange
        className="rdrCalendarWrapper"
        ranges={[selectionRange]}
        onChange={handleSelect}
        minDate={new Date()}
        disabledDates={disabledDates}
        dayContentRenderer={(date) => {
          const match = userBookings.find(d => d.date.toDateString() === date.toDateString());
        
          if (match) {
            return (
              <div className="tooltip-container" onClick={() => handleUserDateClick(match.bookingId)}>
                <div className="user-booked-date">
                  {date.getDate()}
                </div>
                <span className="tooltip-text">Click to cancel booking</span>
              </div>
            );
          }
        
          return <div>{date.getDate()}</div>;
        }}
      />
      <button
        className="mt-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        onClick={handleCreateBooking}
      >
        Create Booking
      </button>
    </div>
  );
};

export default BookingCalendar;
