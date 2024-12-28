import Personnel from "./Personnel"
import Owners from "./Owners"
import Contractors from "./Contractors"

export const personsRoutes = [
    { path: "persons/personnel", element: <Personnel /> },
    { path: "persons/owners", element: <Owners /> },
    { path: "persons/contractors", element: <Contractors /> },
]