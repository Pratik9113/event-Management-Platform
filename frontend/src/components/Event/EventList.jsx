import React, { useEffect, useState } from 'react';
import { Calendar, Clock, MapPin, Users, Tag, DollarSign } from 'lucide-react';
import { UserCircle, Search, Filter, Menu, X, TrendingUp } from 'lucide-react';
import io from 'socket.io-client';
import axios from "axios";
import EventDashboard from './EventDashboard';
const EventList = () => {
    const [events, setEvents] = useState([]);
    const [selectedEvent, setSelectedEvent] = useState(null);
    const [isRegistered, setIsRegistered] = useState('');
    const formatDate = (date) => {
        return new Date(date).toLocaleDateString('en-US', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    };

    const [activeFilter, setActiveFilter] = useState('all');

    const [filteredEvents, setFilteredEvents] = useState([]);
    useEffect(() => {
        const filtered = events.filter(event => {
            if (activeFilter === 'all') return true;
            return event.status.toLowerCase() === activeFilter.toLowerCase();
        });

        setFilteredEvents(filtered);
    }, [activeFilter, events]);

    const filterButtons = [
        { id: 'all', icon: <TrendingUp size={18} />, label: 'All Events' },
        { id: 'Upcoming', icon: <Clock size={18} />, label: 'Upcoming' },
        { id: 'Past', icon: <Calendar size={18} />, label: 'Past' }
    ];


    const [socket, setSocket] = useState(null);
    const [userSelectedEvent, setUserSelectedEvent] = useState(null);

    useEffect(() => {
        const getAllEvent = async () => {
            try {
                const url = `${import.meta.env.VITE_BACKEND}/event/all`;
                const response = await axios.get(url, {
                    withCredentials: true,
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });
                if (response.data.success) {
                    setEvents(response.data.data);
                    setIsRegistered(response.data.data.isAttending);
                } else {
                    alert("Error in fetching data");
                }
                const socketInstance = io(import.meta.env.VITE_BACKEND);
                setSocket(socketInstance);

                socketInstance.on('updateAttendeeList', (updatedEvent) => {
                    setEvents((prevEvents) =>
                        prevEvents.map((event) =>
                            event._id === updatedEvent._id ? updatedEvent : event
                        )
                    );
                });

                return () => {
                    socketInstance.disconnect();
                };
            } catch (error) {
                console.error(error);
                alert("Error in fetching data");
            }

        }
        getAllEvent();
    }, []);

    const handleRegister = async (event) => {
        const url = `${import.meta.env.VITE_BACKEND}/event/register`;
        const data = { eventId: event._id };
        const eventId = event._id
        try {
            const response = await axios.post(url, data, {
                withCredentials: true,
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            if (response.data.success) {
                alert("Registered successfully");
                setSelectedEvent(null);
                if (socket) {
                    socket.emit('enrollment', eventId);
                } else {
                    print("Not connected with socket");
                }
            } else {
                alert("Already Registered for the event ");
            }
        } catch (error) {
            console.error(error);
            alert("Error in registering for event");
        }
    }




    const EventCard = ({ event }) => (
        <div
            className="group bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-300 cursor-pointer overflow-hidden m-2.5"
            onClick={() => setSelectedEvent(event)}
        >
            <div className="relative">
                <img
                    src={event.image}
                    alt={event.title}
                    className="w-full h-56 object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <span className={`
              absolute top-4 right-4 px-3 py-1.5 rounded-full text-sm font-medium
              ${event.status === 'Upcoming' ? 'bg-green-100 text-green-800' :
                        event.status === 'Ongoing' ? 'bg-blue-100 text-blue-800' :
                            'bg-gray-100 text-gray-800'}
            `}>
                    {event.status}
                </span>
            </div>

            <div className="p-6">
                <h3 className="text-xl font-semibold text-gray-800 mb-4 group-hover:text-blue-600 transition-colors">
                    {event.title}
                </h3>

                <div className="space-y-3 mb-6">
                    <div className="flex items-center gap-3 text-gray-600">
                        <Calendar className="w-5 h-5 text-blue-500" />
                        <span className="text-sm">{formatDate(event.date)}</span>
                    </div>

                    <div className="flex items-center gap-3 text-gray-600">
                        <MapPin className="w-5 h-5 text-blue-500" />
                        <span className="text-sm">{event.location}</span>
                    </div>
                </div>

                <p className="text-gray-600 text-sm mb-6 line-clamp-2">
                    {event.description}
                </p>

                <div className="flex flex-wrap gap-2 mb-6">
                    {event.tags.map(tag => (
                        <span
                            key={tag}
                            className="bg-gray-50 text-gray-600 px-3 py-1 rounded-full text-sm border border-gray-100"
                        >
                            {tag}
                        </span>
                    ))}
                </div>

                <div className="flex justify-between items-center pt-4 border-t border-gray-100">
                    <div className="flex items-center gap-2 text-gray-600">
                        <Users className="w-5 h-5 text-blue-500" />
                        <span className="text-sm font-medium">{event.attendees.length}/{event.maxAttendees}</span>
                    </div>
                    <div className="flex items-center gap-2 text-green-600">
                        <DollarSign className="w-5 h-5" />
                        <span className="font-semibold">{event.price}</span>
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

                        <button onClick={() => handleRegister(event)} className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors mt-4">
                            {event.isAttending ? "Already Registered " : "Register Now"}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );


    return (
        <div className="container mx-auto px-4 py-8">
            <EventDashboard setActiveFilter={setActiveFilter} filterButtons={filterButtons} activeFilter={activeFilter} />

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredEvents.map(event => (
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