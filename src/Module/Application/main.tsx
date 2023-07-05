import ReactDOM from "react-dom/client"
import "./index.css"
import { createHashRouter, RouterProvider } from "react-router-dom"
import { routes } from "@/Module/Application/Navigation/routes.tsx"

const router = createHashRouter(routes)

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <>
    <RouterProvider router={router} />
  </>
)
