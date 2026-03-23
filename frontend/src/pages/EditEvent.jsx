import EventForm from "../components/EventForm";
import { useRouteLoaderData } from "react-router-dom";
export default function EditEventPage() {
    const {event} = useRouteLoaderData("event-detail");
  return <EventForm event={event} method="patch" />;
}
