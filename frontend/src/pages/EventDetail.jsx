import EventItem from "../components/EventItem";
import { useRouteLoaderData,redirect } from "react-router-dom";

export default function EventDetailPage() {
  const { event } = useRouteLoaderData("event-detail");
  return (
    <>
      <EventItem event={event} />
    </>
  );
}

export async function loader({ request, params }) {
  const eventId = params.eventId;
  const response = await fetch(`http://localhost:8080/events/${eventId}`);
  if (!response.ok) {
    throw new Response(JSON.stringify({ message: "Could not fetch events." }), {
      status: 500,
    });
  } else {
    return response;
  }
}

export async function action({ request, params }) {
  const eventId = params.eventId;
  const response = await fetch(`http://localhost:8080/events/${eventId}`, {
    method: "DELETE",
  });
  if (!response.ok) {
    throw new Response(JSON.stringify({ message: "Could not delete event." }), {
      status: 500,
    });
  } else {
    return redirect("/events");
  }
}
  