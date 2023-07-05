import { Outlet } from "react-router"
import { TopMenuComponent } from "@/Module/Shared/Component/TopMenuComponent.tsx"

export function LayoutComponent() {
  const height = window.screen.height
  const width = window.screen.width

  const style = {
    height: height,
    width: width,
  }

  return (
    <>
      <TopMenuComponent></TopMenuComponent>
      <div style={style}>
        <Outlet />
      </div>
    </>
  )
}
