import React, { useState, useEffect } from "react";
import Login from "./Login";
import Register from "./Register";
import { auth } from "./firebase";
import { onAuthStateChanged, signOut } from "firebase/auth";
import VerifyEmail from "./VerifyEmail";
import Dashboard from "./Dashboard";
import { useTranslation } from "react-i18next";
import "./i18n";
import { getAnalytics, logEvent } from "firebase/analytics";

const App = () => {
    const { t, i18n } = useTranslation();
    const [user, setUser] = useState(null);
    const [view, setView] = useState("login");

    const analytics = getAnalytics();
    logEvent(analytics, 'entered_page');

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
            if (currentUser) {
                if (!currentUser.emailVerified) {
                    setView("verify");
                } else {
                    setView("planner");
                }
            } else {
                setView("login");
            }
        });

        return () => unsubscribe();
    }, []);

    const handleLogout = () => {
        signOut(auth);
        setView("login");
    };

    const changeLanguage = (lng) => {
        i18n.changeLanguage(lng);
    };

    return (
        <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-6">
            {view === "login" && <Login onRegister={() => setView("register")} />}
            {view === "register" && <Register onLogin={() => setView("login")} />}
            {view === "verify" && <VerifyEmail />}
            <div className="min-h-screen bg-gray-100 flex flex-col">
                {view === "planner" && (
                    <div className="flex-grow flex flex-col">
                        <div className="flex justify-between items-center bg-gray-50 p-4">
                            <p className="text-lg font-semibold text-gray-800">
                                {t("Welcome")}, {user?.email || "User"}!
                            </p>
                            <div className="relative">
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
                            <button
                                onClick={handleLogout}
                                className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600"
                            >
                                {t("Logout")}
                            </button>
                        </div>
                        <Dashboard className="flex-grow" />
                    </div>
                )}
            </div>

            {view !== "planner" && (
                <p className="mt-4 text-gray-600">
                    {view === "login"
                        ? t("Don't have an account?")
                        : t("Already have an account? ")
                    }
                    <button
                        onClick={() => setView(view === "login" ? "register" : "login")}
                        className="text-blue-500 hover:underline"
                    >
                        {view === "login" ? "Register" : "Login"}
                    </button>
                </p>
            )}
        </div>
    );
};

export default App;
