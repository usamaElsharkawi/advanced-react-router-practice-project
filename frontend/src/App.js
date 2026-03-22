import { createBrowserRouter, RouterProvider } from "react-router-dom";
import HomePage from "./pages/Home";
import EventsPage, {loader as eventsLoader} from "./pages/Events";
import NewEventPage from "./pages/NewEvent";
import EditEventPage from "./pages/EditEvent";
import EventDetailPage from "./pages/EventDetail";
import LayoutRoot from "./pages/LayoutRoot";
import EventsLayout from "./pages/EventsLayout";
 


const router = createBrowserRouter([
  {
    path: "/",
    element: <LayoutRoot />,
    children: [
      { index: true, element: <HomePage /> },
      {
        path: "events",
        element: <EventsLayout />,
        children: [
          { index: true, element: <EventsPage />,  loader:eventsLoader},
          { path: "new", element: <NewEventPage /> },
          { path: ":eventId", element: <EventDetailPage /> },
          { path: ":eventId/edit", element: <EditEventPage /> },
        ],
      },
    ],
  },
]);
function App() {
  return <RouterProvider router={router} />;
}

export default App;
