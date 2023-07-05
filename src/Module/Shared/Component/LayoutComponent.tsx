import { Outlet } from "react-router"
import { TopMenuComponent } from "@/Module/Shared/Component/TopMenuComponent.tsx"

export function LayoutComponent() {
  return (
    <>
      <TopMenuComponent></TopMenuComponent>
      <div className={"min-h-screen min-w-full"}>
        <Outlet />
      </div>
    </>
  )
}
