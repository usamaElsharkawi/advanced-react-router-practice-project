import { createBrowserRouter, RouterProvider } from "react-router-dom";
import HomePage from "./pages/Home";
import EventsPage, { loader as eventsLoader } from "./pages/Events";
import NewEventPage from "./pages/NewEvent";
import EditEventPage from "./pages/EditEvent";
import EventDetailPage, {
  loader as eventDetailLoader,
  action as deleteEventAction,
} from "./pages/EventDetail";
import LayoutRoot from "./pages/LayoutRoot";
import EventsLayout from "./pages/EventsLayout";
import ErrorPage from "./pages/Error";
import { action as manipulateEventAction } from "./components/EventForm";

const router = createBrowserRouter([
  {
    path: "/",
    element: <LayoutRoot />,
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <HomePage /> },
      {
        path: "events",
        element: <EventsLayout />,
        children: [
          { index: true, element: <EventsPage />, loader: eventsLoader },
          { path: "new", element: <NewEventPage />, action: manipulateEventAction },
          {
            path: ":eventId",
            id: "event-detail",
            loader: eventDetailLoader,
            children: [
              { index: true, element: <EventDetailPage />, action:deleteEventAction },
              { path: "edit", element: <EditEventPage />, action: manipulateEventAction },
            ],
          },
        ],
      },
    ],
  },
]);
function App() {
  return <RouterProvider router={router} />;
}

export default App;
