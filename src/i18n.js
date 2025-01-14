import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

i18n
  .use(LanguageDetector) // Автоопределение языка
  .use(initReactI18next) // Интеграция с React
  .init({
    resources: {
      en: {
        translation: {
          "Welcome": "Welcome",
          "Weekly Planner": "Weekly Planner",
          "Weekly Calendar": "Weekly Calendar",
          "Add Task": "Add Task",
          "Delete": "Delete",
          "New Task": "New Task",
          "Logout": "Logout",
          "Monday": "Monday",
          "Tuesday": "Tuesday",
          "Wednesday": "Wednesday",
          "Thursday": "Thursday",
          "Friday": "Friday",
          "Saturday": "Saturday",
          "Sunday": "Sunday",
          "Don't have an account?": "Don't have an account?",
          "Already have an account?": "Already have an account?",
          "Register": "Register",
          "Login": "Login",
          "Email": "Email",
          "Password": "Password",
          "Page": "Page",
          "New task": "New task",
          "tasks": "tasks",
          "Tasks": "Tasks",
          "for": "for",
          "Created on": "Created on",
        },
      },
      kz: {
        translation: {
          "Welcome": "Қош келдіңіз",
          "Weekly Planner": "Апталық жоспарлаушы",
          "Weekly Calendar": "Апталық күнтізбе",
          "Add Task": "Тапсырма қосу",
          "Delete": "Жою",
          "New Task": "Жаңа тапсырма",
          "Logout": "Шығу",
          "Monday": "Дүйсенбі",
          "Tuesday": "Сейсенбі",
          "Wednesday": "Сәрсенбі",
          "Thursday": "Бейсенбі",
          "Friday": "Жұма",
          "Saturday": "Сенбі",
          "Sunday": "Жексенбі",
          "Don't have an account?": "Есептік жазбаңыз жоқ па?",
          "Already have an account?": "Есептік жазбаңыз бар ма?",
          "Register": "Тіркелу",
          "Login": "Кіру",
          "Email": "Электрондық пошта",
          "Password": "Құпия сөз",
          "Page": "Бетi",
          "New task": "Жаңа тапсырма",
          "tasks": "тапсырмалар",
          "Tasks": "Тапсырмалар",
          "for": "-",
          "Created on": "Жасалған күні",
        },
      },
      ru: {
        translation: {
          "Welcome": "Добро пожаловать",
          "Weekly Planner": "Еженедельный планировщик",
          "Weekly Calendar": "Еженедельный календарь",
          "Add Task": "Добавить задачу",
          "Delete": "Удалить",
          "New Task": "Новая задача",
          "Logout": "Выйти",
          "Monday": "Понедельник",
          "Tuesday": "Вторник",
          "Wednesday": "Среда",
          "Thursday": "Четверг",
          "Friday": "Пятница",
          "Saturday": "Суббота",
          "Sunday": "Воскресенье",
          "Don't have an account?": "Нет аккаунта?",
          "Already have an account?": "Уже есть аккаунт?",
          "Register": "Регистрация",
          "Login": "Войти",
          "Email": "Электронная почта",
          "Password": "Пароль",
          "Page": "Страница",
          "New task": "Новая задача",
          "tasks": "задач",
          "Tasks": "Задачи",
          "for": "на",
          "Created on": "Создано",
        },
      },
    },
    fallbackLng: "en", // Английский язык по умолчанию
    // lng: "en",
    debug: true,
    detection: {
        order: ["querystring", "localStorage", "navigator"], // Порядок определения языка
        caches: ["localStorage"], // Кэширование языка
    },
    interpolation: {
      escapeValue: false, // React уже экранирует строки
    },
  });

export default i18n;
