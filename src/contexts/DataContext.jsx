import { createContext, useContext, useState, useEffect } from "react";
import { useAuth } from "./AuthContext";

const DataContext = createContext(undefined);

export const useData = () => {
  const context = useContext(DataContext);
  if (!context) {
    throw new Error("useData must be used within DataProvider");
  }
  return context;
};

export const DataProvider = ({ children }) => {
  const { currentUser } = useAuth();

  // Helper function to get data from localStorage
  function getFromStorage(key) {
    const stored = localStorage.getItem(key);
    return stored ? JSON.parse(stored) : [];
  }
  const [todos, setTodos] = useState(() => getFromStorage("todos"));
  const [habits, setHabits] = useState(() => getFromStorage("habits"));
  const [events, setEvents] = useState(() => getFromStorage("events"));

  // ----------- Fetch quote ----------- //
  const [quote, setQuote] = useState(null);
  const fetchQuote = () => {
    fetch("http://103.177.249.170:5000/quote")
      .then((res) => res.json())
      .then((data) =>
        setQuote({ content: data.text, author: data.author.name })
      )
      .catch(() =>
        setQuote({ content: "Varje dag är en ny möjlighet.", author: "Okänd" })
      );
  };
  useEffect(() => {
    fetchQuote();
    const interval = setInterval(fetchQuote, 120000);
    return () => clearInterval(interval);
  }, []);
  // -----------\\ Fetch quote \\----------- //

  useEffect(() => {
    localStorage.setItem("events", JSON.stringify(events));
  }, [events]);

  const addEvent = (event) => {
    if (!currentUser) return;
    const newEvent = {
      ...event,
      id: crypto.randomUUID(),
      userId: currentUser,
      createdAt: new Date().toISOString(),
    };
    const newEvents = [...events, newEvent];
    setEvents(newEvents);
  };

  const updateEvent = (id, updates) => {
    const newEvents = events.map((e) =>
      e.id === id ? { ...e, ...updates } : e
    );
    setEvents(newEvents);
  };

  const deleteEvent = (id) => {
    const newEvents = events.filter((e) => e.id !== id);
    setEvents(newEvents);
  };

  const value = {
    quote,
    fetchQuote,
    todos,
    habits,
    events,
    addEvent,
    updateEvent,
    deleteEvent,
  };

  return <DataContext.Provider value={value}>{children}</DataContext.Provider>;
};
