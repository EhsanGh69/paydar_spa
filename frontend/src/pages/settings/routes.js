import SettingsIndex from "./SettingsIndex"
import FieldsSettings from "./FieldsSettings"

export const settingsRoutes = [
    { path: "settings", element: <SettingsIndex /> },
    { path: "settings/fields", element: <FieldsSettings /> },
]