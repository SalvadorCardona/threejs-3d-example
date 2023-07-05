import { RouteObject, RouteObject as RouteObjectBase } from "react-router-dom"
import { HomePage } from "../Page/Home/HomePage.tsx"
import { GamePage } from "../Page/GamePage/GamePage.tsx"
import { VideoPage } from "@/Module/Application/Page/Video/VideoPage.tsx"
import { LayoutComponent } from "@/Module/Shared/Component/LayoutComponent.tsx"
import { FiberTestPage } from "@/Module/Application/Page/FiberTest/FiberTestPage.tsx"
import { ShoesPage } from "@/Module/Application/Page/Shoes/ShoesPage.tsx"
import { BoolingPage } from "@/Module/Application/Page/Booling/BoolingPage.tsx"
import { CinemaPage } from "@/Module/Application/Page/Cinema/CinemaPage.tsx"
import { CityPage } from "@/Module/Application/Page/City/CityPage.tsx"
import { lazy } from "react"
import { ImportFiber } from "@/Module/Application/Page/ImportFiber/ImportFiber.tsx"
import { BuilderPage } from "@/Module/Application/Page/Builder/BuilderPage.tsx"

interface NavigationItemInterface {
  name: string
  // icon: ComponentType
}

type RouteObjectApp = RouteObjectBase & NavigationItemInterface

export enum RoutesEnum {
  MAIN = "main",
  GAME = "game",
  VIDEO = "video",
  Fiber = "fiber",
  SHOES = "shoes",
  BOOLING = "booling",
  CINEMA = "cinema",
  CITY = "city",
  IMPORT_FIBER = "import-fiber",
  COOKING = "cooking",
  BUILDER = "builder",
}

export const childrenRoute: RouteObjectApp[] = [
  {
    path: "/",
    element: <HomePage />,
    id: RoutesEnum.MAIN,
    name: "Faux Océan",
    index: true,
  },
  {
    path: "/" + RoutesEnum.IMPORT_FIBER,
    // element: <ImportFiberAsync />,
    id: RoutesEnum.IMPORT_FIBER,
    name: "Open World",
    async lazy() {
      let { ImportFiber } = await import(
        "@/Module/Application/Page/ImportFiber/ImportFiber.tsx"
      )
      return { Component: ImportFiber }
    },
  },
  {
    path: "/" + RoutesEnum.COOKING,
    // element: <ImportFiberAsync />,
    id: RoutesEnum.COOKING,
    name: "Copy Overcooked",
    async lazy() {
      let { CookingPage } = await import(
        "@/Module/Application/Page/Cooking/CookingPage.tsx"
      )
      return { Component: CookingPage }
    },
  },

  {
    path: "/video",
    element: <VideoPage />,
    id: RoutesEnum.VIDEO,
    name: "Example 3D plus un lecteur vidéo",
  },

  {
    path: "/" + RoutesEnum.SHOES,
    element: <ShoesPage />,
    id: RoutesEnum.SHOES,
    name: "Chaussure qui change de couleur",
  },
  {
    path: "/" + RoutesEnum.BOOLING,
    element: <BoolingPage />,
    id: RoutesEnum.BOOLING,
    name: "Mini Bowling",
  },
  {
    path: "/" + RoutesEnum.CINEMA,
    element: <CinemaPage />,
    id: RoutesEnum.CINEMA,
    name: "Example de vidéo 3D",
  },
  {
    path: "/" + RoutesEnum.CITY,
    element: <CityPage />,
    id: RoutesEnum.CITY,
    name: "Example de shader possible",
  },

  {
    path: "/" + RoutesEnum.BUILDER,
    // element: <ImportFiberAsync />,
    id: RoutesEnum.BUILDER,
    name: "Builder :  WI",
    async lazy() {
      let { BuilderPage } = await import(
        "@/Module/Application/Page/Builder/BuilderPage.tsx"
      )
      return { Component: BuilderPage }
    },
  },
]

export const routes: RouteObject[] = [
  {
    path: "/",
    element: <LayoutComponent />,
    id: "base",
    children: childrenRoute,
  },
]
