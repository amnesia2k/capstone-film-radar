import { Link, NavLink } from "react-router-dom";
import { navLinks } from ".";
import { useState } from "react";
import { Button } from "../ui/button";
import { LogOut, Menu, User2, Video, X } from "lucide-react";
import { SwitchToggle } from "../switch-toggle";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { reel } from "@/assets";
import { useAuth } from "@/context/useAuth";
import { Dialog, DialogPanel } from "@headlessui/react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { FcGoogle } from "react-icons/fc";
import { GoogleAuthProvider } from "firebase/auth";
import { toast } from "sonner";

const Navbar = () => {
  const [mobile, setMobile] = useState(false);
  const { user, signInWithGoogle, logout } = useAuth();
  const [googleUser, setGoogleUser] = useState(null);
  // const [open, setOpen] = useState(false);

  const handleToggle = () => setMobile(true);

  const handleLogin = async () => {
    try {
      const res = await signInWithGoogle();
      const user = res.user;
      const credential = GoogleAuthProvider.credentialFromResult(res);
      const token = credential.accessToken;
      if (token) {
        localStorage.setItem("userToken", JSON.stringify(token));
      } else {
        console.warn("no access token was received");
      }
      setGoogleUser(user);
      toast.success(`Signed in as ${user?.displayName} successfully`);
      console.log(user, token, "success");
    } catch (error) {
      console.error(error, "error");
    }
  };

  const handleLogout = async () => {
    try {
      await logout();
      localStorage.removeItem("userToken");
      setGoogleUser(null);
      toast.success(`Logged out of ${googleUser?.displayName} successfully`);
    } catch (error) {
      console.error(error, "error");
    }
  };

  return (
    <header className="bg-white dark:bg-[#0c0a09] shadow-md border-b sticky top-0 z-50 mx-auto">
      <nav className="max-w-7xl w-full mx-auto py-[10px] px-5 flex items-center justify-between">
        <Link
          to="/"
          className="flex items-center text-lg md:text-2xl uppercase hove:scale-105 transition-all font-semibold"
        >
          <img
            src={reel}
            className="w-[30px] h-[30px] md:w-[60px] md:h-[60px]"
            alt="movie_reel"
          />
          <span className="text-primary text-lg md:text-xl">
            <span className="text-2xl md:text-3xl font-bold">R</span>eels
          </span>
          <span className="text-lg md:text-xl">
            <span className="text-2xl md:text-3xl font-bold">R</span>adar
          </span>
        </Link>

        <div className="hidden lg:flex items-center font-semibold gap-10">
          {navLinks.map((links) => (
            <NavLink
              key={links.id}
              className={({ isActive }) =>
                `${isActive ? "text-primary" : ""} hover:text-primary`
              }
              to={links.link}
              title={links.tooltip}
            >
              {/* Conditionally render icon or name */}
              {links.icon ? <links.icon size={20} /> : links.name}
            </NavLink>
          ))}
          <div>
            <SwitchToggle />
          </div>

          {user && (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Avatar className="w-[30px] h-[30px]">
                  <AvatarImage src={user.photoURL} className="cursor-pointer" />
                  <AvatarFallback className="cursor-pointer">
                    <AvatarImage
                      src={user.photoURL}
                      className="cursor-pointer"
                    />
                  </AvatarFallback>
                </Avatar>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuLabel>
                  Welcome, {googleUser?.displayName} 😊
                </DropdownMenuLabel>
                <DropdownMenuGroup>
                  <DropdownMenuItem className="cursor-pointer">
                    <Video />
                    <Link to="/watchlist">My Watchlist</Link>
                  </DropdownMenuItem>
                </DropdownMenuGroup>
                <DropdownMenuItem
                  className="cursor-pointer"
                  onClick={handleLogout}
                >
                  <LogOut />
                  <span>Log out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          )}

          {!user && (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Avatar className="w-[30px] h-[30px]">
                  <AvatarImage
                    src={<User2 className="w-[50px] h-150px] p-1" />}
                  />
                  <AvatarFallback className="cursor-pointer">
                    <User2 className="w-[50px] h-150px] p-1" />
                  </AvatarFallback>
                </Avatar>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem onClick={handleLogin}>
                  <FcGoogle />
                  Sign in with Google
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          )}
        </div>

        {/* sm to md screens */}
        <div className="flex items-center lg:hidden gap-3">
          {user && (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Avatar className="w-[30px] h-[30px]">
                  <AvatarImage src={user.photoURL} className="cursor-pointer" />
                  <AvatarFallback className="cursor-pointer">
                    <AvatarImage
                      src={user.photoURL}
                      className="cursor-pointer"
                    />
                  </AvatarFallback>
                </Avatar>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuLabel>
                  Welcome, {googleUser?.displayName} 😊
                </DropdownMenuLabel>
                <DropdownMenuGroup>
                  <DropdownMenuItem className="cursor-pointer">
                    <Video />
                    <Link to="/watchlist">My Watchlist</Link>
                  </DropdownMenuItem>
                </DropdownMenuGroup>
                <DropdownMenuItem
                  className="cursor-pointer"
                  onClick={handleLogout}
                >
                  <LogOut />
                  <span>Log out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          )}

          {!user && (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Avatar className="w-[30px] h-[30px]">
                  <AvatarImage
                    src={<User2 className="w-[50px] h-150px] p-1" />}
                  />
                  <AvatarFallback className="cursor-pointer">
                    <User2 className="w-[50px] h-150px] p-1" />
                  </AvatarFallback>
                </Avatar>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem onClick={handleLogin}>
                  <FcGoogle />
                  Sign in with Google
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          )}
          <Button
            variant="ghost"
            className="h-[30px] w-[30px] border p-[10px] rounded-full"
            onClick={handleToggle}
          >
            {mobile ? <X /> : <Menu />}
          </Button>
        </div>
      </nav>

      {/* Mobile Menu */}
      <Dialog
        as="div"
        className={"lg:hidden"}
        open={mobile}
        onClose={setMobile}
      >
        <div className="fixed inset-0 z-50 bg-white dark:bg-[#0c0a09] w-[60%] md:w-[50%]" />
        <DialogPanel className="fixed inset-y-0 left-0 z-50 overflow-y-auto py-[10px] sm:max-w-sm sm:ring-1 sm:ring-text/10 w-[50%]">
          <div className="flex items-center justify-between mb-3 pb-[12px]">
            <Link
              to="/"
              className="flex items-center text-lg md:text-2xl uppercase hove:scale-105 transition-all font-semibold pl-5"
              onClick={() => setMobile(false)}
            >
              <img
                src={reel}
                className="w-[30px] h-[30px] md:w-[60px] md:h-[60px]"
                alt="movie_reel"
              />
              <span className="text-primary text-lg md:text-xl">
                <span className="text-2xl md:text-3xl font-bold">R</span>eels
              </span>
              <span className="text-lg md:text-xl">
                <span className="text-2xl md:text-3xl font-bold">R</span>adar
              </span>
            </Link>
          </div>
          <div className="flex flex-col gap-5 pl-5 md:pl-10 font-semibold">
            {navLinks.map((links) => (
              <NavLink
                key={links.id}
                className={({ isActive }) =>
                  `${isActive ? "text-primary" : ""} hover:text-primary`
                }
                to={links.link}
                title={links.tooltip}
                onClick={() => setMobile(false)}
              >
                {links.name}
              </NavLink>
            ))}
          </div>

          <div className="pl-5 md:pl-10 mt-5">
            <SwitchToggle />
          </div>
        </DialogPanel>
      </Dialog>
    </header>
  );
};

export default Navbar;
