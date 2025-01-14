import React, { useState, useEffect } from "react";
import WeeklyPlanner from "./WeeklyPlanner";
import Calendar from "./Calendar";
import { collection, query, where, getDocs } from "firebase/firestore";
import { db, auth } from "./firebase";

const Dashboard = () => {
    const [tasks, setTasks] = useState([]);

    useEffect(() => {
        const fetchTasks = async () => {
            try {
                const user = auth.currentUser;
                if (!user) return;

                const tasksQuery = query(
                    collection(db, "weeklyTasks"),
                    where("userId", "==", user.uid)
                );

                const querySnapshot = await getDocs(tasksQuery);
                const tasksArray = querySnapshot.docs.map((doc) => ({
                    id: doc.id,
                    ...doc.data(),
                }));
                setTasks(tasksArray);
            } catch (error) {
                console.error("Error fetching tasks:", error);
            }
        };

        fetchTasks();
    }, []);

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 flex-grow">
            <div className="bg-white shadow-md rounded-lg p-6 flex flex-col flex-grow">
                <WeeklyPlanner />
            </div>
            <div className="bg-white shadow-md rounded-lg p-6 flex flex-col flex-grow">
                <Calendar tasks={tasks || []} />
            </div>
        </div>
    );
};

export default Dashboard;
