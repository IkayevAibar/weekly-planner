import React, { useState } from "react";
import { auth } from "./firebase";
import { sendEmailVerification } from "firebase/auth";

const VerifyEmail = () => {
    const [message, setMessage] = useState("");

    const resendVerificationEmail = async () => {
        if (auth.currentUser) {
            try {
                await sendEmailVerification(auth.currentUser);
                setMessage("Verification email sent!");
            } catch (error) {
                setMessage("Error sending verification email: " + error.message);
            }
        }
    };

    return (
        <div className="min-h-screen bg-gray-100 flex items-center justify-center p-6">
            <div className="w-full max-w-md bg-white shadow-lg rounded-lg p-6 text-center">
                <h2 className="text-2xl font-bold mb-4 text-gray-800">Verify Your Email</h2>
                <p className="text-gray-600 mb-4">Please check your email to verify your account.</p>
                <button
                    onClick={resendVerificationEmail}
                    className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 mb-4"
                >
                    Resend Email
                </button>
                {message && <p className="text-green-500 mt-2">{message}</p>}
            </div>
        </div>
    );
};

export default VerifyEmail;
