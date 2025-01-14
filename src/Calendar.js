import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import "./i18n";

const Calendar = ({ tasks }) => {
    const [selectedDay, setSelectedDay] = useState("Monday");
    const { t } = useTranslation();

    // Генерация дней недели
    const daysOfWeek = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

    // Фильтрация задач для выбранного дня
    const tasksForSelectedDay = selectedDay
        ? tasks.filter((task) => task.dayOfWeek === selectedDay)
        : [];

    return (
        <div className="h-full flex flex-col">
            <h2 className="text-2xl font-bold mb-4 text-gray-800 text-center">{t("Weekly Calendar")}</h2>
            <div className="grid grid-cols-7 gap-2 mb-4">
                {daysOfWeek.map((day) => (
                    <div
                        key={day}
                        className={`p-4 text-center border rounded-lg cursor-pointer ${
                            selectedDay === day ? "bg-blue-100 border-blue-500" : "bg-gray-50"
                        }`}
                        onClick={() => setSelectedDay(day)}
                    >
                        <p className="font-semibold text-gray-800">{t(day)}</p>
                        <p className="text-sm text-gray-500">
                            {tasks.filter((task) => task.dayOfWeek === day).length} {t("tasks")}
                        </p>
                    </div>
                ))}
            </div>
            {selectedDay && (
                <div>
                    <h3 className="text-lg font-semibold mb-2 text-gray-800">
                        {t("Tasks")} {t("for")} {t(selectedDay)}:
                    </h3>
                    <ul className="space-y-2">
                        {tasksForSelectedDay.length > 0 ? (
                            tasksForSelectedDay.map((task) => (
                                <li
                                    key={task.id}
                                    className={`p-3 border rounded-lg ${
                                        task.completed ? "bg-green-100" : "bg-gray-50"
                                    }`}
                                >
                                    <p
                                        className={`${
                                            task.completed ? "line-through text-gray-500" : ""
                                        }`}
                                    >
                                        {task.task}
                                    </p>
                                    <small className="text-gray-500">
                                        {t("Created on")}: {new Date(task.createdAt).toLocaleDateString()}
                                    </small>
                                </li>
                            ))
                        ) : (
                            <p className="text-gray-600">No tasks for this day.</p>
                        )}
                    </ul>
                </div>
            )}
        </div>
    );
};

export default Calendar;
