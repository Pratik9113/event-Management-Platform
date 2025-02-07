import React, { useEffect, useState } from 'react';
import { Calendar, Clock, MapPin, Users, Tag, DollarSign } from 'lucide-react';
import axios from "axios";
const EventList = () => {
    const [events, setEvents] = useState([]);
    const [selectedEvent, setSelectedEvent] = useState(null);
    
    const formatDate = (date) => {
        return new Date(date).toLocaleDateString('en-US', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    };
    useEffect(() => {
        const getAllEvent = async () => {
            try {
                const url = `${import.meta.env.VITE_BACKEND}/event/all`;
                const response = await axios.get(url, {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });
                if (response.data.success) {
                    setEvents(response.data.data);
                } else {
                    alert("Error in fetching data");
                }
            } catch (error) {
                console.error(error);
                alert("Error in fetching data");
            }

        }
        getAllEvent();
    }, []);




    const EventCard = ({ event }) => (
        <div
            className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow cursor-pointer mb-4 overflow-hidden"
            onClick={() => setSelectedEvent(event)}
        >
            <img
                src={event.image}
                alt={event.title}
                className="w-full h-48 object-cover"
            />
            <div className="p-4">
                <div className="flex justify-between items-start mb-2">
                    <h3 className="text-xl font-semibold">{event.title}</h3>
                    <span className={`
            px-2 py-1 rounded-full text-sm
            ${event.status === 'Upcoming' ? 'bg-green-100 text-green-800' :
                            event.status === 'Ongoing' ? 'bg-blue-100 text-blue-800' :
                                'bg-gray-100 text-gray-800'}
          `}>
                        {event.status}
                    </span>
                </div>

                <div className="flex items-center gap-2 text-gray-600 mb-2">
                    <Calendar className="w-4 h-4" />
                    <span>{formatDate(event.date)}</span>
                </div>

                <div className="flex items-center gap-2 text-gray-600 mb-2">
                    <MapPin className="w-4 h-4" />
                    <span>{event.location}</span>
                </div>

                <p className="text-gray-600 mb-4 line-clamp-2">{event.description}</p>

                <div className="flex flex-wrap gap-2 mb-4">
                    {event.tags.map(tag => (
                        <span
                            key={tag}
                            className="bg-gray-100 text-gray-700 px-2 py-1 rounded-full text-sm"
                        >
                            {tag}
                        </span>
                    ))}
                </div>

                <div className="flex justify-between items-center">
                    <div className="flex items-center gap-2">
                        <Users className="w-4 h-4" />
                        <span>{event.attendees.length}/{event.maxAttendees}</span>
                    </div>
                    <div className="flex items-center gap-1 text-green-600 font-semibold">
                        <DollarSign className="w-4 h-4" />
                        <span>{event.price}</span>
                    </div>
                </div>
            </div>
        </div>
    );

    const EventDetails = ({ event, onClose }) => (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-lg w-full max-w-2xl max-h-[90vh] overflow-y-auto">
                <div className="p-4 border-b border-gray-200 flex justify-between items-center">
                    <h2 className="text-xl font-semibold">{event.title}</h2>
                    <button
                        onClick={onClose}
                        className="text-gray-500 hover:text-gray-700 text-2xl font-bold"
                    >
                        ×
                    </button>
                </div>

                <div className="p-4">
                    <img
                        src={event.image}
                        alt={event.title}
                        className="w-full h-64 object-cover rounded-lg mb-4"
                    />

                    <div className="space-y-4">
                        <p className="text-gray-600">{event.description}</p>

                        <div className="flex flex-col gap-2">
                            <div className="flex items-center gap-2">
                                <Calendar className="w-4 h-4 text-gray-600" />
                                <span>{formatDate(event.date)}</span>
                            </div>

                            <div className="flex items-center gap-2">
                                <Clock className="w-4 h-4 text-gray-600" />
                                <span>{new Date(event.date).toLocaleTimeString()}</span>
                            </div>

                            <div className="flex items-center gap-2">
                                <MapPin className="w-4 h-4 text-gray-600" />
                                <span>{event.location}</span>
                            </div>

                            <div className="flex items-center gap-2">
                                <Users className="w-4 h-4 text-gray-600" />
                                <span>{event.attendees.length} attending ({event.maxAttendees - event.attendees.length} spots left)</span>
                            </div>

                            <div className="flex items-center gap-2">
                                <Tag className="w-4 h-4 text-gray-600" />
                                <div className="flex flex-wrap gap-2">
                                    {event.tags.map(tag => (
                                        <span
                                            key={tag}
                                            className="bg-gray-100 text-gray-700 px-2 py-1 rounded-full text-sm"
                                        >
                                            {tag}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </div>

                        <button className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors mt-4">
                            Register Now
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {events.map(event => (
                    <EventCard key={event._id} event={event} />
                ))}
            </div>

            {selectedEvent && (
                <EventDetails
                    event={selectedEvent}
                    onClose={() => setSelectedEvent(null)}
                />
            )}
        </div>
    );
};

export default EventList;