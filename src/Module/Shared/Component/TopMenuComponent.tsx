import logoImage from "@/Module/Shared/Asset/logo.png"
import { AiOutlineTwitter } from "react-icons/ai"
import { Link } from "react-router-dom"
import { childrenRoute } from "@/Module/Application/Navigation/routes.tsx"

export function TopMenuComponent() {
  return (
    <>
      <section className="fixed mx-auto z-10">
        <nav className="flex justify-between bg-recim/50   w-screen">
          <div className="px-5 xl:px-12 py-3 flex w-full items-center">
            <a className="text-3xl font-bold font-heading" href="#">
              <img className={"h-11"} src={logoImage} alt={"logo"} />
            </a>

            <ul className="hidden md:flex px-4 mx-auto font-semibold font-heading space-x-12">
              <li>
                <Link
                  className=" text-white hover:text-gray-200 flex justify-content-center items-center"
                  to={"/"}
                >
                  Home
                </Link>
              </li>
              <li>
                <div className="group inline-block">
                  <button className="outline-none focus:outline-none border px-3 py-1 bg-white rounded-sm flex items-center min-w-32">
                    <span className="pr-1 font-semibold flex-1 ">
                      Les propositions
                    </span>
                    <span>
                      <svg
                        className="fill-current h-4 w-4 transform group-hover:-rotate-180
        transition duration-150 ease-in-out"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                      >
                        <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                      </svg>
                    </span>
                  </button>

                  <ul
                    className="bg-white border rounded-sm transform scale-0 group-hover:scale-100 absolute
  transition duration-150 ease-in-out origin-top min-w-32"
                  >
                    {childrenRoute.map((route) => {
                      return (
                        <li
                          className="rounded-sm px-3 py-1 hover:bg-gray-100"
                          key={route.id}
                        >
                          <Link
                            className="rounded-sm px-3 py-1 hover:bg-gray-100"
                            to={route.path}
                          >
                            {route.name}
                          </Link>
                        </li>
                      )
                    })}
                  </ul>
                </div>
              </li>
            </ul>

            <div className="hidden xl:flex items-center space-x-5 items-center">
              <a
                className="hover:text-gray-200"
                href="https://twitter.com/recimapp"
                target={"_blank"}
              >
                <AiOutlineTwitter></AiOutlineTwitter>
              </a>
            </div>
          </div>
        </nav>
      </section>
    </>
  )
}
