import Personnel from "./Personnel"
import Owners from "./Owners"

export const personsRoutes = [
    { path: "persons/personnel", element: <Personnel /> },
    { path: "persons/owners", element: <Owners /> }
]