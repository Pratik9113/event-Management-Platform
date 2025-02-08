import React, { useState } from 'react'
import { UserCircle, Search, Calendar } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const EventDashboard = ({ setActiveFilter, filterButtons, activeFilter }) => {
    const [searchQuery, setSearchQuery] = useState('');
    const [isOpen, setIsOpen] = useState(false);

    const navigate = useNavigate();
    const handleCreateEvent = () => {
        navigate("/create")
    }
    return (
        <div className="bg-white">
            <nav className="bg-white shadow-sm top-0 z-50 border-b">
                <div className="mx-auto px-4">
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
                            <button className="px-4 py-2 rounded-lg bg-blue-600 text-white font-medium hover:bg-blue-700 transition-all"
                                onClick={handleCreateEvent}>
                                Create Event
                            </button>
                        </div>

                        <button className="flex items-center px-4 py-2 rounded-lg text-gray-600 hover:bg-gray-100">
                            <UserCircle className="mr-2" size={30} />
                        </button>
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


                    <div className={`md:hidden ${isOpen ? 'block' : 'hidden'} pb-4`}>
                        <div className="space-y-2">
                            <button className="flex items-center w-full px-4 py-2 rounded-lg text-gray-600 hover:bg-gray-100">
                                <Calendar className="mr-2" size={20} />
                                Create Event
                            </button>
                            <button className="flex items-center w-full px-4 py-2 rounded-lg text-gray-600 hover:bg-gray-100">
                                <UserCircle className="mr-2" size={20} />
                                Profile
                            </button>
                        </div>
                    </div>

                </div>
            </nav>
        </div>
    )
}

export default EventDashboard
