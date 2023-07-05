import { PropsWithChildren } from "react"

export function FlexComponent(props: PropsWithChildren) {
  return <div className={"flex justify-center items-center"}>{props.children}</div>
}
