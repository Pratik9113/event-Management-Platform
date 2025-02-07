import React, { useEffect, useState } from 'react';
import { Calendar, Clock, MapPin, Users, Tag, DollarSign } from 'lucide-react';
import { UserCircle, Search, Filter, Menu, X, TrendingUp } from 'lucide-react';

import axios from "axios";
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

    const [isOpen, setIsOpen] = useState(false);
    const [activeFilter, setActiveFilter] = useState('all');
    const [searchQuery, setSearchQuery] = useState('');

    const filteredEvents = events.filter(event => {
        if (activeFilter === "Upcoming") {
            return new Date(event.date) > new Date(); 
        }
        return true; 
    });

    const filterButtons = [
        { id: 'all', icon: <TrendingUp size={18} />, label: 'All Events' },
        { id: 'Upcoming', icon: <Clock size={18} />, label: 'Upcoming' },
        { id: 'Ongoing', icon: <Calendar size={18} />, label: 'Ongoing' }
    ];

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
            className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow cursor-pointer mb-4 overflow-hidden p-12"
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

                        <button onClick={() => handleRegister(event)} className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors mt-4">
                            {isRegistered ? "Register Now" : "Already Registered "}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );

    const EventDashboard = () => (
        <div className="bg-white">
            <nav className="bg-white shadow-sm sticky top-0 z-50 border-b">
                <div className="max-w-7xl mx-auto px-4">
                    <div className="flex justify-between h-16">
                        {/* Logo */}
                        <div className="flex items-center">
                            <span className="text-2xl font-bold text-gray-800">
                                EventHub
                            </span>
                        </div>

                        <div className="hidden md:flex items-center flex-1 max-w-md mx-4">
                            <div className="relative w-full">
                                <input
                                    type="text"
                                    placeholder="Search events..."
                                    className="w-full px-4 py-2 pl-10 rounded-lg border border-gray-200 focus:border-blue-500 focus:outline-none bg-gray-50"
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                />
                                <Search className="absolute left-3 top-2.5 text-gray-400" size={20} />
                            </div>
                        </div>

                        <div className="hidden md:flex items-center space-x-4">
                            <button className="px-4 py-2 rounded-lg bg-blue-600 text-white font-medium hover:bg-blue-700 transition-all">
                                Create Event
                            </button>
                            <button className="p-2 rounded-lg hover:bg-gray-100 transition-all">
                                <UserCircle size={24} className="text-gray-600" />
                            </button>
                        </div>

                        <div className="md:hidden flex items-center">
                            <button
                                onClick={() => setIsOpen(!isOpen)}
                                className="p-2 rounded-lg hover:bg-gray-100"
                            >
                                {isOpen ? <X size={24} /> : <Menu size={24} />}
                            </button>
                        </div>
                    </div>

                    {/* Filter Pills */}
                    <div className="py-3 flex items-center gap-3 overflow-x-auto">
                        {filterButtons.map((button) => (
                            <button
                                key={button.id}
                                onClick={() => setActiveFilter(button.id)}
                                className={`flex items-center px-4 py-2 rounded-lg font-medium transition-all
                  ${activeFilter === button.id
                                        ? 'bg-blue-50 text-blue-600 border border-blue-200'
                                        : 'text-gray-600 hover:bg-gray-50'}`}
                            >
                                <span className="mr-2">{button.icon}</span>
                                {button.label}
                            </button>
                        ))}
                    </div>

                </div>

                {/* Mobile Menu */}
                <div className={`md:hidden ${isOpen ? 'block' : 'hidden'} border-t border-gray-100`}>
                    <div className="p-4 space-y-4 bg-white">
                        <input
                            type="text"
                            placeholder="Search events..."
                            className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:border-blue-500 focus:outline-none"
                        />
                        <button className="w-full px-4 py-2 rounded-lg bg-blue-600 text-white font-medium hover:bg-blue-700">
                            Create Event
                        </button>
                    </div>
                </div>
            </nav>
        </div>
    )

    return (
        <div className="container mx-auto px-4 py-8">
            <EventDashboard />
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