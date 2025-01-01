import { Link, NavLink } from "react-router-dom";
import { mobileNavLinks, navLinks } from ".";
import { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { LogOut, Menu, Search, User2, Video, X } from "lucide-react";
import { SwitchToggle } from "../switch-toggle";
import { logo } from "@/assets";
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
import { firestoreDb } from "@/services/firestore";

const Navbar = () => {
  const [mobile, setMobile] = useState(false);
  const { user, signInWithGoogle, logout } = useAuth();
  const { userWatchlist } = firestoreDb();
  const [watchlist, setWatchlist] = useState([]);

  const handleToggle = () => setMobile(true);

  const handleLogin = async () => {
    try {
      const res = await signInWithGoogle();
      const user = res?.user;
      const credential = GoogleAuthProvider.credentialFromResult(res);
      const token = credential.accessToken;
      if (token) {
        localStorage.setItem("userToken", JSON.stringify(token));
      } else {
        console.warn("no access token was received");
      }
      toast.success(`Signed in as ${user?.displayName} successfully`);
      // console.log(user, token, "success");
    } catch (error) {
      console.error(error, "error");
    }
  };

  const handleLogout = async () => {
    try {
      await logout();
      localStorage.removeItem("userToken");
      // setGoogleUser(null);
      toast.success(`Logged out of ${user?.displayName} successfully`);
    } catch (error) {
      console.error(error, "error");
    }
  };

  useEffect(() => {
    if (user?.uid) {
      userWatchlist(user?.uid)
        .then((data) => {
          setWatchlist(data);
        })
        .catch((error) => {
          console.error("Error getting user watchlist: ", error);
        });
    }
  }, [user?.uid, userWatchlist]);

  const totalItems = watchlist.length;

  return (
    <header className="shadow-md bg-primary-foreground dark:bg-background">
      {/*dark:bg-[#0c0a09]*/}{" "}
      {/*sticky top-0 z-50 mx-auto might add back later*/}
      <nav className="max-w-7xl w-full mx-auto p-5 flex items-center justify-between">
        <Link
          to="/"
          className="flex items-center text-lg md:text-2xl uppercase transform transition-all hover:scale-110 font-semibold"
        >
          <img
            src={logo}
            className="w-[30px] h-[30px] md:w-[40px] md:h-[40px]"
            alt="movie_reel"
          />
          <span className="text-primary text-lg md:text-xl lg:text-2xl mr-1">
            <span className="text-2xl md:text-3xl font-bold">R</span>eels
          </span>
          <span className="text-lg md:text-xl">
            <span className="text-2xl md:text-3xl font-bold">R</span>adar
          </span>
        </Link>

        {/* Desktop Navlinks */}
        <div className="hidden lg:flex items-center font-semibold gap-10">
          {navLinks.map((links) => (
            <NavLink
              key={links.id}
              className={({ isActive }) =>
                `transition-all duration-300 ${
                  isActive ? "text-primary" : ""
                } hover:text-primary`
              }
              to={links.link}
              title={links.tooltip}
            >
              {/* Conditionally render icon or name */}
              {links.icon ? <links.icon size={25} /> : links.name}
            </NavLink>
          ))}
          <div>
            <SwitchToggle />
          </div>

          {user && (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <div className="cursor-pointer">
                  <img
                    src={user?.photoURL}
                    className="w-[40px] h-[40px] rounded-full object-contain"
                    alt={user?.displayName}
                  />
                </div>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuLabel>
                  <h3 className="text-base">
                    Hello,{" "}
                    <span className="md:font-bold italic md:text-lg">
                      {user?.displayName}
                    </span>
                  </h3>
                </DropdownMenuLabel>
                <DropdownMenuGroup>
                  <DropdownMenuItem className="cursor-pointer">
                    <Video />
                    <Link to="/watchlist">
                      My Watchlist {""}({totalItems})
                    </Link>
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
                <div className="border rounded-full cursor-pointer">
                  <User2 size={25} className="m-[10px]" />
                </div>
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
        <div className="flex items-center lg:hidden gap-5 md:gap-10">
          <Link to={"/search"}>
            <Search size={25} />
          </Link>
          <div
            className="flex items-center justify-center rounded-full cursor-pointer"
            onClick={handleToggle}
          >
            {mobile ? <X size={30} /> : <Menu size={30} />}
          </div>
        </div>
      </nav>
      {/* Mobile Menu */}
      <Dialog
        as="div"
        className={"lg:hidden"}
        open={mobile}
        onClose={setMobile}
      >
        <div className="fixed inset-0 z-50 bg-white dark:bg-background bg-backgroundImg bg-cover bg-center max-w-[450px] w-[80%] md:w-[40%]" />
        <DialogPanel className="fixed inset-y-0 left-0 z-50 overflow-y-auto py-[10px] w-[70%]">
          <div className="flex items-center justify-between mb-3 pb-[12px]">
            {user ? (
              <div className="flex items-center gap-2 pl-5 mt-[10px]">
                <img
                  src={user?.photoURL}
                  className="w-[40px] h-[40px] rounded-full object-contain"
                  alt={user?.displayName}
                />
                <div className="flex">
                  <h3 className="md:font-semibold">
                    Hello,{" "}
                    <span className="font-semibold md:font-bold italic md:text-lg">
                      {user.displayName}!
                    </span>
                  </h3>
                </div>
              </div>
            ) : (
              <div className="flex items-center gap-2 pl-5 mt-[10px]">
                <div className="border rounded-full">
                  <User2 size={25} className="m-[10px]" />
                </div>
                <Button
                  variant="outline"
                  className="text-xs flex items-center p-2"
                  onClick={handleLogin}
                >
                  <FcGoogle />
                  Sign in with Google
                </Button>
              </div>
            )}
          </div>

          {/* Sidebar Links */}
          <div className="flex flex-col gap-5 pl-5 font-semibold">
            {mobileNavLinks.map((links) => (
              <NavLink
                key={links.id}
                className={({ isActive }) =>
                  `${
                    isActive ? "text-primary bg-primary" : ""
                  }transition-all duration-300  hover:text-primary`
                }
                to={links.link}
                title={links.tooltip}
                onClick={() => setMobile(false)}
              >
                {links.name}
              </NavLink>
            ))}
          </div>

          <div className="pl-5 mt-5">
            <SwitchToggle />
          </div>

          {/* Watchlist and Signout */}
          <div>
            {user ? (
              <div className="flex flex-col gap-2 mt-5 pl-5">
                <Button
                  variant="ghost"
                  className="flex justify-start w-[180px]"
                  onClick={() => setMobile(false)}
                >
                  <Video />
                  <Link to="/watchlist">
                    <h3 className="text-base">
                      My Watchlist {""}({totalItems})
                    </h3>
                  </Link>
                </Button>
                <Button
                  variant="ghost"
                  className="flex justify-start w-[180px]"
                  onClick={handleLogout}
                >
                  <LogOut />
                  <h3 className="text-base" onClick={() => setMobile(false)}>
                    Signout
                  </h3>
                </Button>
              </div>
            ) : (
              <div className="flex flex-col gap-2 mt-5 pl-5">
                <Button
                  variant="outline"
                  className="flex justify-start w-[150px]"
                  onClick={() => toast.error("Sign in to access watchlist")}
                >
                  <Video />
                  <Link to="/watchlist" onClick={() => setMobile(false)}>
                    My Watchlist
                  </Link>
                </Button>
              </div>
            )}
          </div>
        </DialogPanel>
      </Dialog>
    </header>
  );
};

export default Navbar;
