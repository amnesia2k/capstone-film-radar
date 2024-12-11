import { Link } from "react-router-dom";
// import { ModeToggle } from "../mode-toggle";
import { navLinks } from ".";
import { useState } from "react";
import { Button } from "../ui/button";
import { Menu, User2, X } from "lucide-react";
import { SwitchToggle } from "../switch-toggle";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { reel } from "@/assets";

const Navbar = () => {
  const [open, setOpen] = useState(false);

  const handleToggle = () => setOpen((prev) => !prev);
  return (
    <div className="max-w-7xl w-full flex items-center justify-between mx-auto py-5 px-5">
      <Link
        to="/"
        className="flex items-center text-lg md:text-2xl uppercase hove:scale-105 transition-all font-semibold"
      >
        <img src={reel} className="w-10 h-10 md:w-20 md:h-20" alt="movie_reel" />
        <span className="text-primary">
          <span className="text-2xl md:text-4xl font-bold">R</span>eels
        </span>
        <span className="text-2xl md:text-4xl font-bold">R</span>adar
      </Link>
      <div className="hidden lg:flex items-center font-semibold gap-10">
        {navLinks.map((links) => (
          <Link key={links.id} to={links.link} title={links.tooltip}>
            {links.name}
          </Link>
        ))}
        <div>
          <SwitchToggle />
        </div>
        <Avatar>
          <AvatarImage src={<User2 />} />
          <AvatarFallback className="cursor-pointer">
            <User2 />
          </AvatarFallback>
        </Avatar>
      </div>

      {/* sm to md screens */}
      <div className="flex items-center lg:hidden gap-3">
        <Avatar className="w-[30px] h-[30px]">
          <AvatarImage src={<User2 />} />
          <AvatarFallback className="cursor-pointer">
            <User2 size={15} />
          </AvatarFallback>
        </Avatar>
        <Button
          variant="ghost"
          className="h-[30px] w-[30px] rounded-full border"
          onClick={handleToggle}
        >
          {open ? <X /> : <Menu />}
        </Button>
      </div>

      {/* Mobile Menu */}
      {/* <div
        className={`absolute lg:hidden top-20 left-0 w-full flex flex-col items-center gap-5 font-semibold text-lg transform transition-transform py-5 shadow-md bg-white dark:bg-secondary-foreground ${
          open ? "opacity-100" : "opacity-0"
        }`}
        style={{
          transition: "transform 0.3 ease-in-out opacity 0.3 ease-in-out",
        }}
      >
        <div className="flex flex-col items-center justify-center gap-5">
          {navLinks.map((links) => (
            <Link
              key={links.id}
              to={links.link}
              title={links.tooltip}
              className="text-lg"
              onClick={() => setOpen(false)}
            >
              {links.name}
            </Link>
          ))}
        </div>
        <div>
          <SwitchToggle />
        </div>
      </div> */}
    </div>
  );
};

export default Navbar;
