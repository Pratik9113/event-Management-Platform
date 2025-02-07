import React, { useState } from 'react';
import { Calendar, UserCircle, Search, Filter, Menu, X, Clock, TrendingUp } from 'lucide-react';

const EventDashboard = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [activeFilter, setActiveFilter] = useState('all');
    const [searchQuery, setSearchQuery] = useState('');

    const filterButtons = [
        { id: 'all', icon: <TrendingUp size={18} />, label: 'All Events' },
        { id: 'upcoming', icon: <Clock size={18} />, label: 'Upcoming' },
        { id: 'past', icon: <Calendar size={18} />, label: 'Past' }
    ];

    const categories = ['Technology', 'Business', 'Arts', 'Education', 'Social'];

    return (
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

                        {/* Desktop Search */}
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

                        {/* Desktop Menu */}
                        <div className="hidden md:flex items-center space-x-4">
                            <button className="px-4 py-2 rounded-lg bg-blue-600 text-white font-medium hover:bg-blue-700 transition-all">
                                Create Event
                            </button>
                            <button className="p-2 rounded-lg hover:bg-gray-100 transition-all">
                                <UserCircle size={24} className="text-gray-600" />
                            </button>
                        </div>

                        {/* Mobile Menu Button */}
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

                    {/* Category Pills */}
                    <div className="pb-3 flex items-center gap-2 overflow-x-auto">
                        {categories.map((category) => (
                            <button
                                key={category}
                                className="px-4 py-1.5 rounded-lg bg-gray-50 hover:bg-gray-100 text-gray-600 transition-all"
                            >
                                {category}
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
    );
};

export default EventDashboard;