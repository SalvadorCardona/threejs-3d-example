import {
  childrenRoute,
  RoutesEnum,
} from "@/Module/Application/Navigation/routes.tsx"

export const getPathById = (id: RoutesEnum): string => {
  const route = childrenRoute.find((route) => route.id === id)
  return route?.path ?? ""
}
