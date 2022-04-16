import logo from "../logo.svg";
import { ActiveLink } from "raviger";

export default function Header(props: { title: string }) {
  const links = [
    { key: 1, page: "Home", url: "/" },
    { key: 2, page: "About", url: "/about" },
    { key: 3, page: "Form", url: "/form" },
    { key: 4, page: "Preview", url: "/preview" },
  ];
  return (
    <>
      <div className="flex items-center justify-center gap-2">
        <img
          className="h-16 w-16 hover:animate-spin hover:duration-1000"
          src={logo}
          alt="logo"
          // style={{ animation: "spin 2s infinite linear" }}
        />
        <h1 className="text-center text-2xl">{props.title}</h1>
      </div>
      <div className="grid sm:grid-cols-2 sm:gap-3 md:grid-cols-4 md:gap-5 lg:my-5 lg:grid-cols-5 lg:items-center lg:justify-center lg:gap-6 lg:text-xl">
        {links.map((link) => {
          return ["/form", "/preview"].indexOf(link.url) >= 0 ? (
            <ActiveLink
              className="my-5 rounded-3xl px-3 py-1 shadow-lg hover:bg-sky-500 hover:text-white"
              key={link.key}
              href={link.url}
              activeClass="text-white font-bold bg-sky-500 px-3 py-1 my-5 rounded-3xl"
            >
              {link.page}
            </ActiveLink>
          ) : (
            <ActiveLink
              className="my-5 rounded-3xl px-3 py-1 shadow-lg hover:bg-sky-500 hover:text-white"
              key={link.key}
              exactActiveClass="text-white font-bold bg-sky-500 px-3 py-1 my-5 rounded-3xl"
              href={link.url}
            >
              {link.page}
            </ActiveLink>
          );
        })}
      </div>
    </>
  );
}
