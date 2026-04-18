import React, { createContext, useContext, useState } from 'react';
import { ALL_EVENTS, FEED_EVENT_IDS, Event } from '@/constants/events';

type EventsContextValue = {
  feedEvents: Event[];
  allEvents: Event[];
  savedEvents: Event[];
  addEvent: (event: Event) => void;
  getEvent: (id: string) => Event | undefined;
  toggleSave: (event: Event) => void;
  isSaved: (id: string) => boolean;
};

const EventsContext = createContext<EventsContextValue | null>(null);

const INITIAL_FEED = ALL_EVENTS.filter(e => FEED_EVENT_IDS.includes(e.id));

export function EventsProvider({ children }: { children: React.ReactNode }) {
  const [feedEvents, setFeedEvents] = useState<Event[]>(INITIAL_FEED);
  const [savedIds, setSavedIds] = useState<Set<string>>(new Set());

  const addEvent = (event: Event) => setFeedEvents(prev => [event, ...prev]);

  const allEvents = [...feedEvents, ...ALL_EVENTS.filter(e => !feedEvents.find(f => f.id === e.id))];

  const getEvent = (id: string) => allEvents.find(e => e.id === id);

  const toggleSave = (event: Event) => {
    setSavedIds(prev => {
      const next = new Set(prev);
      next.has(event.id) ? next.delete(event.id) : next.add(event.id);
      return next;
    });
  };

  const isSaved = (id: string) => savedIds.has(id);

  const savedEvents = allEvents.filter(e => savedIds.has(e.id));

  return (
    <EventsContext.Provider value={{ feedEvents, allEvents, savedEvents, addEvent, getEvent, toggleSave, isSaved }}>
      {children}
    </EventsContext.Provider>
  );
}

export function useEvents() {
  const value = useContext(EventsContext);
  if (!value) throw new Error('useEvents must be used inside EventsProvider');
  return value;
}
