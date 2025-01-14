import React, { useState, useEffect } from "react";
import { collection, addDoc, query, where, getDocs, doc, getDoc, updateDoc, deleteDoc } from "firebase/firestore";
import { db, auth } from "./firebase";
import { useTranslation } from "react-i18next";
import "./i18n";

const WeeklyPlanner = () => {
    const [tasks, setTasks] = useState([]);
    const [newTask, setNewTask] = useState("");
    const [dayOfWeek, setDayOfWeek] = useState("Monday");
    const { t } = useTranslation();

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

    const addTask = async () => {
        const user = auth.currentUser;
        if (!user || !newTask) return;

        try {
            const docRef = await addDoc(collection(db, "weeklyTasks"), {
                task: newTask,
                completed: false,
                userId: user.uid,
                dayOfWeek: dayOfWeek,
                createdAt: new Date().toISOString(),
            });

            setTasks([
                ...tasks,
                { id: docRef.id, task: newTask, completed: false, userId: user.uid, dayOfWeek, createdAt: new Date().toISOString() },
            ]);
            setNewTask("");
            setDayOfWeek("Monday");
        } catch (error) {
            console.error("Error adding task:", error);
        }
    };

    const toggleTaskCompletion = async (id, completed) => {
        try {
            const user = auth.currentUser;
            if (!user) return;

            const taskDoc = doc(db, "weeklyTasks", id);
            const taskSnapshot = await getDoc(taskDoc);

            if (taskSnapshot.exists() && taskSnapshot.data().userId === user.uid) {
                await updateDoc(taskDoc, { completed: !completed });
                setTasks(tasks.map((task) =>
                    task.id === id ? { ...task, completed: !completed } : task
                ));
            } else {
                console.error("Unauthorized or task not found.");
            }
        } catch (error) {
            console.error("Error updating task:", error.message);
        }
    };

    const deleteTask = async (id) => {
        try {
            const user = auth.currentUser;
            if (!user) return;

            const taskDoc = doc(db, "weeklyTasks", id);
            const taskSnapshot = await getDoc(taskDoc);

            if (taskSnapshot.exists() && taskSnapshot.data().userId === user.uid) {
                await deleteDoc(taskDoc);
                setTasks(tasks.filter((task) => task.id !== id));
            } else {
                console.error("Unauthorized or task not found.");
            }
        } catch (error) {
            console.error("Error deleting task:", error.message);
        }
    };

    return (
        <>
            <div className="h-full flex flex-col">
                <h2 className="text-2xl font-bold mb-4 text-center text-gray-800">{t("Weekly Planner")}</h2>
                <div className="mb-4">
                    <input
                        type="text"
                        placeholder={t("New task")}
                        value={newTask}
                        onChange={(e) => setNewTask(e.target.value)}
                        className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-400 mb-2"
                    />
                    <select
                        value={dayOfWeek}
                        onChange={(e) => setDayOfWeek(e.target.value)}
                        className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                    >
                        {[t("Monday"), t("Tuesday"), t("Wednesday"), t("Thursday"), t("Friday"), t("Saturday"), t("Sunday")].map((day) => (
                            <option key={day} value={day}>
                                {day}
                            </option>
                        ))}
                    </select>
                    <button
                        onClick={addTask}
                        className="w-full bg-blue-500 text-white px-4 py-2 mt-2 rounded-lg hover:bg-blue-600"
                    >
                        {t("Add Task")}
                    </button>
                </div>
                <ul className="space-y-2">
                    {tasks.map((task) => (
                        <li
                            key={task.id}
                            className={`flex items-center justify-between p-3 border rounded-lg ${
                                task.completed ? "bg-green-100" : "bg-gray-50"
                            }`}
                        >
                            <div>
                                <p
                                    className={`cursor-pointer ${
                                        task.completed ? "line-through text-gray-500" : ""
                                    }`}
                                    onClick={() => toggleTaskCompletion(task.id, task.completed)}
                                >
                                    {task.task}
                                </p>
                                <small className="text-gray-500">{t(task.dayOfWeek)}</small>
                            </div>
                            <button
                                onClick={() => deleteTask(task.id)}
                                className="text-red-500 hover:text-red-700"
                            >
                                {t("Delete")}
                            </button>
                        </li>
                    ))}
                </ul>
            </div>
        </>
    );
};

export default WeeklyPlanner;
