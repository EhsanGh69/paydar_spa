import { createBrowserRouter } from "react-router-dom"

import Index from "./pages/Index"
import Home from "./pages/Home"
import NotFound from "./pages/NotFound"

import { personsRoutes } from "./pages/persons/routes"
import { settingsRoutes } from "./pages/settings/routes"

import AuthIndex from "./pages/auth/AuthIndex"
import authRoutes from "./pages/auth/routes"

const router = createBrowserRouter([
    { path: "", element: <Index />,
      children: [
        { path: "/", element: <Home /> },
        ...personsRoutes,
        ...settingsRoutes
      ]
    },
    { path: "/auth", element: <AuthIndex />,
      children: [ ...authRoutes ]
    },
    { path: "*", element: <NotFound /> }
])

export default router