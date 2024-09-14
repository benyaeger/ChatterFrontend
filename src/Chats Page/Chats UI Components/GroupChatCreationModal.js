import React, { useState, useEffect } from 'react';
import { searchForUser } from '../BackendInteraction';
import { debounce } from 'lodash'; // You can also use a custom debounce function

const GroupChatCreateModal = ({ onClose }) => {

    const [searchTerm, setSearchTerm] = useState('');
    const [matchingUsers, setMatchingUsers] = useState([]);
    const [loading, setLoading] = useState(false);

    async function fetchSearchMatchingUsers() {
        const [firstName, lastName] = searchTerm.split(' ');
        try {
            let data = await searchForUser(firstName, lastName);
            console.log('Users Matching the Search From Server: ' + JSON.stringify(data));
            setMatchingUsers(data);
        }
        catch (error) {
            console.log("Error: " + error)
            setMatchingUsers([])
        }

    }

    // Debounced version of the fetchSearchMatchingUsers function
    const debouncedFetchSearchMatchingUsers = debounce(fetchSearchMatchingUsers, 300);

    useEffect(() => {
        // Check if the searchTerm contains a space
        if (searchTerm.includes(' ')) {
            const [firstName, lastName] = searchTerm.split(' ');
            // Ensure both firstName and lastName are not empty
            if (firstName && lastName) {
                debouncedFetchSearchMatchingUsers(firstName, lastName);
            }
        } else {
            // Clear matching users if only one name is provided
            setMatchingUsers([]);
        }
    }, [searchTerm]);

    return (
        <div
            className="fixed inset-0 bg-gray-800 z-500 bg-opacity-50 flex items-center justify-center"
            onClick={(e) => e.stopPropagation()} // Close modal when clicking outside
        >
            <div
                className="bg-white rounded-lg shadow-lg w-11/12 max-w-lg p-6 relative"
                onClick={(e) => e.stopPropagation()} // Prevent closing modal when clicking inside
            >
                <button
                    className="absolute top-2 right-2 text-gray-500 hover:text-gray-700 text-3xl"
                    onClick={(e) => {
                        e.stopPropagation(); // Prevent click on the button from closing the modal
                        onClose();
                    }}
                >
                    &times;
                </button>
                <h2 className="text-3xl font-extrabold mb-4">New Group Chat</h2>
                <div className="mb-4">
                    <label className="block text-sm font-bold mb-2 text-left">Group Chat Name</label>
                    <input
                        type="text"
                        placeholder="Enter group chat name"
                        className="form-input w-full border-gray-400 rounded-lg py-2 px-3 border-2 focus:outline-none"
                    />
                </div>
                <div className="mb-4 relative">
                    <label className="block text-sm font-bold mb-2 text-left">Search Users</label>
                    <input
                        type="text"
                        placeholder="Search users"
                        className="form-input w-full border-gray-400 rounded-lg py-2 px-3 border-2 focus:outline-none"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                    {loading && <div>Loading...</div>}

                    {/* Dropdown for matching users */}
                    {matchingUsers.length > 0 && (
                        <div className="absolute z-50 bg-white shadow-lg border-b-2 border-l-2 border-r-2 border-gray-400 w-full max-h-48 overflow-y-auto mt-1">
                            {matchingUsers.slice(0, 6).map(user => (
                                <div
                                    key={user.user_id}
                                    className="p-3 font-medium border-b hover:bg-gray-100 cursor-pointer flex items-center gap-2"
                                    onClick={() => console.log(`Selected user: ${user.first_name} ${user.last_name}`)} // Example of handling selection
                                >
                                    <div className="bg-blue-500 text-white py-1 px-3">
                                        {user.first_name} {user.last_name}
                                    </div>
                                </div>
                            ))}
                            {matchingUsers.length > 6 && (
                                <div className="p-2 text-center text-gray-500">
                                    {`+${matchingUsers.length - 6} more`}
                                </div>
                            )}
                        </div>
                    )}
                </div>
                <div className="mb-4">
                    <label className="block text-sm font-bold mb-2 text-left">Participants</label>
                    <div className="flex flex-wrap gap-2">
                        {/* Example participant */}
                        <div className="bg-green-500 text-white rounded-full py-1 px-3 flex items-center">
                            <span className="text-sm font-bold">John Doe</span>
                            <button className="ml-2 text-white hover:text-gray-300" onClick={(e) => e.stopPropagation()}>
                                &times;
                            </button>
                        </div>
                    </div>
                </div>
                <div className="flex justify-end">
                    <button className="bg-green-500 text-white font-bold py-2 px-4 rounded-lg hover:bg-green-600">
                        Create
                    </button>
                </div>
            </div>
        </div>
    );
};

export default GroupChatCreateModal;
