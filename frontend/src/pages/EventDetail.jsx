import EventItem from "../components/EventItem";
import { useRouteLoaderData, redirect, Await } from "react-router-dom";
import { Suspense } from "react";
import EventsList from "../components/EventsList";

export default function EventDetailPage() {
  const { event, events } = useRouteLoaderData("event-detail");
  return (
    <>
      <EventItem event={event} />
      <Suspense fallback={<p style={{ textAlign: "center" }}>Loading...</p>}>
        <Await resolve={events}>
          {(loadedEvents) => <EventsList events={loadedEvents} />}
        </Await>
      </Suspense>
    </>
  );
}

async function loadEvents() {
  const response = await fetch("http://localhost:8080/events");

  if (!response.ok) {
    throw new Response(
      JSON.stringify({ message: "Could not fetch events." }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  } else {
    const resData = await response.json();
    return resData.events;
  }
}

async function loadEvent(eventId) {
  const response = await fetch(`http://localhost:8080/events/${eventId}`);
  if (!response.ok) {
    throw new Response(JSON.stringify({ message: "Could not fetch events." }), {
      status: 500,
    });
  } else {
    const resData = await response.json();
    return resData.event;
  }
}

export async function loader({ request, params }) {
  const eventId = params.eventId;

  const eventPromise = loadEvent(eventId);
  const eventsPromise = loadEvents();

  return {
    event: await eventPromise,
    events: eventsPromise,
  };
}

export async function action({ request, params }) {
  const eventId = params.eventId;
  const response = await fetch(`http://localhost:8080/events/${eventId}`, {
    method: request.method,
  });
  if (!response.ok) {
    throw new Response(JSON.stringify({ message: "Could not delete event." }), {
      status: 500,
    });
  } else {
    return redirect("/events");
  }
}
