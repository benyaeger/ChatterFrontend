import React, { useEffect, useState } from 'react';

const AlertModal = ({ type, message, onClose }) => {
    const [visible, setVisible] = useState(false); // Initially hidden
    const [fadeOut, setFadeOut] = useState(false); // State to trigger fade-out

    // Trigger fade-in immediately on mount
    useEffect(() => {
        setVisible(true); // Start fade-in

        // After 5 seconds, trigger fade-out
        const timer = setTimeout(() => {
            setFadeOut(true); // Trigger fade-out
            setTimeout(() => {
                setVisible(false); // Hide modal after fade-out
                if (onClose) {
                    onClose(); // Optionally call onClose callback
                }
            }, 250); // Duration of fade-out transition (250ms)
        }, 5000); // Wait for 5 seconds before starting fade-out

        return () => clearTimeout(timer); // Cleanup timer on unmount
    }, [onClose]);

    if (!visible && !fadeOut) return null; // Don't render if not visible

    // Set the styles based on type (error or success)
    const modalStyles =
        type === 'error'
            ? 'bg-red-100 text-red-700 border-red-400' // Error styling
            : 'bg-green-100 text-green-700 border-green-400'; // Success styling

    return (
        <div
            className={`fixed bottom-5 left-5 p-4 border rounded-md z-[9999] shadow-lg min-w-[200px] text-center
            transition-opacity duration-500 ${fadeOut ? 'opacity-0' : 'opacity-100'} ${modalStyles}`}
        >
            {message}
        </div>
    );
};

export default AlertModal;
