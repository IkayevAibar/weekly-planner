import React, { useState } from "react";
import { auth } from "./firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useTranslation } from "react-i18next";
import "./i18n";

const Login = ({ onRegister }) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const { t, i18n } = useTranslation();

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            await signInWithEmailAndPassword(auth, email, password);
        } catch (error) {
            setError("Invalid email or password");
        }
    };
    
    const changeLanguage = (lng) => {
        i18n.changeLanguage(lng);
    };

    return (
        <div className="min-h-screen bg-gray-100 flex items-center justify-center p-6">
            <div className="w-full max-w-md bg-white shadow-lg rounded-lg p-6">
                <h2 className="text-2xl font-bold mb-4 text-center text-gray-800">{t("Login")} {t("Page")}</h2>
                <form onSubmit={handleLogin} className="space-y-4">
                    <input
                        type="email"
                        placeholder={t("Email")}
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                    />
                    <input
                        type="password"
                        placeholder={t("Password")}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                    />
                    <button
                        type="submit"
                        className="w-full bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
                    >
                        {t("Login")}
                    </button>
                </form>
                {error && <p className="text-red-500 mt-4">{error}</p>}
                <p className="text-center mt-4 text-gray-600">
                {t("Don't have an account?")}
                    <button
                        onClick={onRegister}
                        className="text-blue-500 hover:underline ml-1"
                    >
                        {t("Register")}
                    </button>
                </p>
            <div className="relative mt-4 text-center">
                <select
                    onChange={(e) => changeLanguage(e.target.value)}
                    className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                    value={i18n.language}
                >
                    <option value="en">English</option>
                    <option value="kz">Қазақша</option>
                    <option value="ru">Русский</option>
                </select>
            </div>
            </div>
        </div>
    );
};

export default Login;
