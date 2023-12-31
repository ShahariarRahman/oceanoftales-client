import { Avatar, AvatarFallback, AvatarImage } from "../components/ui/avatar";
import { Button } from "../components/ui/button";
import { DropdownMenuSeparator } from "../components/ui/dropdown-menu";
import { DropdownMenuLabel } from "../components/ui/dropdown-menu";
import {
  DropdownMenuItem,
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
} from "../components/ui/dropdown-menu";
import Logo from "@/components/ui/logo";
import { BsCartPlus, BsFillPersonLinesFill } from "react-icons/bs";
import { AiOutlineRead, AiOutlineHome } from "react-icons/ai";
import { LuBookPlus, LuUserPlus } from "react-icons/lu";
import { GiBookshelf } from "react-icons/gi";
import { PiSun, PiSunFill } from "react-icons/pi";
import { RiLogoutBoxRLine } from "react-icons/ri";
import { Switch } from "@/components/ui/switch";
import { useState } from "react";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { setLoading, setUser } from "@/redux/features/auth/authSlice";
import { signOut } from "firebase/auth";
import { auth } from "@/lib/firebase";
import CustomLink from "@/routes/CustomLink";
import avatar from "@/assets/images/illustration/avatar.png";

export default function Navbar() {
  const {
    user: { email },
    isLoading,
  } = useAppSelector((state) => state.auth);
  const [isNight, setIsNight] = useState<boolean>(false);

  const dispatch = useAppDispatch();

  const handleSignOut = async () => {
    dispatch(setLoading(true));
    await signOut(auth).then(() => {
      dispatch(setUser(null));
    });
    dispatch(setLoading(false));
  };

  return (
    <nav className="w-full h-16 fixed top backdrop-blur-lg z-10 caret-transparent">
      <div className="h-full w-full bg-white/60">
        <div className="flex items-center justify-between w-full md:max-w-7xl h-full mx-auto">
          <Logo className="[&>p]:hidden [&>p]:lg:block" />
          <div>
            <ul className="hidden md:flex items-center [&>li]:whitespace-nowrap">
              <li>
                <Button variant="link" asChild>
                  <CustomLink to="/">
                    <span className="mr-1">
                      <AiOutlineHome />
                    </span>
                    <span>Home</span>
                  </CustomLink>
                </Button>
              </li>
              <li>
                <Button variant="link" asChild>
                  <CustomLink to="/books">
                    <span className="mr-1">
                      <GiBookshelf />
                    </span>
                    <span>Books</span>
                  </CustomLink>
                </Button>
              </li>
              {email && (
                <>
                  <li>
                    <Button variant="link" asChild>
                      <CustomLink to="/add-new-book">
                        <span className="mr-1">
                          <LuBookPlus />
                        </span>
                        <span>Add New Book</span>
                      </CustomLink>
                    </Button>
                  </li>
                  <li>
                    <Button variant="link" asChild>
                      <CustomLink to="/reading-book">
                        <span className="mr-1">
                          <AiOutlineRead />
                        </span>
                        <span> Reading list</span>
                      </CustomLink>
                    </Button>
                  </li>
                  <li>
                    <Button variant="link" asChild>
                      <CustomLink to="/wishlist-book">
                        <span className="mr-1">
                          <BsCartPlus />
                        </span>
                        <span>Wishlist</span>
                      </CustomLink>
                    </Button>
                  </li>
                  <li className="cursor-pointer" onClick={handleSignOut}>
                    <Button disabled={isLoading} className="" variant="link">
                      <span className="flex justify-center items-center">
                        <span className="mr-1">
                          <RiLogoutBoxRLine />
                        </span>
                        <span>Sign Out</span>
                      </span>
                    </Button>
                  </li>
                </>
              )}
              {!email && (
                <li>
                  <Button variant="link" asChild>
                    <CustomLink to="/login">
                      <span className="mr-1">
                        <LuUserPlus />
                      </span>
                      <span>Sign In</span>
                    </CustomLink>
                  </Button>
                </li>
              )}
              <li
                className="flex space-x-2"
                onClick={() => setIsNight(!isNight)}
              >
                <Switch checked={isNight} />
                {isNight ? <PiSunFill size={25} /> : <PiSun size={25} />}
              </li>
              {email && (
                <li className="ml-5">
                  <DropdownMenu>
                    <DropdownMenuTrigger className="outline-none">
                      <Avatar>
                        <div>
                          <AvatarImage className="bg-[#3870ff]" src={avatar} />
                        </div>
                        <AvatarFallback>CN</AvatarFallback>
                      </Avatar>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="w-52">
                      <DropdownMenuLabel>
                        <p className="capitalize">{email?.split("@")[0]}</p>
                        <small> {email}</small>
                      </DropdownMenuLabel>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem
                        title="not done"
                        className="cursor-not-allowed text-red-300"
                      >
                        My Profile
                      </DropdownMenuItem>
                      <CustomLink to="/my-books">
                        <DropdownMenuItem className="cursor-pointer">
                          My Books
                        </DropdownMenuItem>
                      </CustomLink>
                      <CustomLink to="/wishlist-book">
                        <DropdownMenuItem className="cursor-pointer">
                          Wish List
                        </DropdownMenuItem>
                      </CustomLink>
                      <CustomLink to="/reading-book">
                        <DropdownMenuItem className="cursor-pointer">
                          Reading List
                        </DropdownMenuItem>
                      </CustomLink>
                      <CustomLink to="/finished-book">
                        <DropdownMenuItem className="cursor-pointer">
                          Finished List
                        </DropdownMenuItem>
                      </CustomLink>
                      <button onClick={handleSignOut}>
                        <DropdownMenuItem className="cursor-pointer">
                          Sign Out
                        </DropdownMenuItem>
                      </button>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </li>
              )}
            </ul>
            <ul className="flex md:hidden mr-4">
              <DropdownMenu>
                <DropdownMenuTrigger className="outline-none">
                  <div className="bg-gray-100 rounded-lg px-4 py-1 text-blue-700 hover:text-white hover:bg-blue-600">
                    <BsFillPersonLinesFill size={30} />
                  </div>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuItem className="cursor-pointer">
                    <Button variant="link" asChild>
                      <CustomLink to="/">
                        <li className="w-52 flex justify-start items-center">
                          <span className="mr-1">
                            <AiOutlineHome />
                          </span>
                          <span>Home</span>
                        </li>
                      </CustomLink>
                    </Button>
                  </DropdownMenuItem>
                  <DropdownMenuItem className="cursor-pointer">
                    <Button variant="link" asChild>
                      <CustomLink to="/books">
                        <li className="w-52 flex justify-start items-center">
                          <span className="mr-1">
                            <GiBookshelf />
                          </span>
                          <span>Books</span>
                        </li>
                      </CustomLink>
                    </Button>
                  </DropdownMenuItem>
                  {email && (
                    <>
                      <DropdownMenuItem className="cursor-pointer">
                        <Button variant="link" asChild>
                          <CustomLink to="/my-books">
                            <li className="w-52 flex justify-start items-center">
                              <span className="mr-1">
                                <LuBookPlus />
                              </span>
                              <span>My Books</span>
                            </li>
                          </CustomLink>
                        </Button>
                      </DropdownMenuItem>
                      <DropdownMenuItem className="cursor-pointer">
                        <Button variant="link" asChild>
                          <CustomLink to="/add-new-book">
                            <li className="w-52 flex justify-start items-center">
                              <span className="mr-1">
                                <LuBookPlus />
                              </span>
                              <span>Add New Book</span>
                            </li>
                          </CustomLink>
                        </Button>
                      </DropdownMenuItem>
                      <DropdownMenuItem className="cursor-pointer">
                        <Button variant="link" asChild>
                          <CustomLink to="/reading-book">
                            <li className="w-52 flex justify-start items-center">
                              <span className="mr-1">
                                <AiOutlineRead />
                              </span>
                              <span> Reading list</span>
                            </li>
                          </CustomLink>
                        </Button>
                      </DropdownMenuItem>
                      <DropdownMenuItem className="cursor-pointer">
                        <Button variant="link" asChild>
                          <CustomLink to="/wishlist-book">
                            <li className="w-52 flex justify-start items-center">
                              <span className="mr-1">
                                <BsCartPlus />
                              </span>
                              <span>Wishlist</span>
                            </li>
                          </CustomLink>
                        </Button>
                      </DropdownMenuItem>
                      <DropdownMenuItem className="cursor-pointer">
                        <Button variant="link" asChild>
                          <CustomLink to="/finished-book">
                            <li className="w-52 flex justify-start items-center">
                              <span className="mr-1">
                                <BsCartPlus />
                              </span>
                              <span>Finished list</span>
                            </li>
                          </CustomLink>
                        </Button>
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={handleSignOut}
                        className="cursor-pointer"
                      >
                        <Button disabled={isLoading} variant="link" asChild>
                          <li>
                            <span className="mr-1">
                              <RiLogoutBoxRLine />
                            </span>
                            <span>Sign Out</span>
                          </li>
                        </Button>
                      </DropdownMenuItem>
                    </>
                  )}
                  {!email && (
                    <DropdownMenuItem className="cursor-pointer">
                      <Button variant="link" asChild>
                        <CustomLink to="/login">
                          <li className="w-52 flex justify-start items-center">
                            <span className="mr-1">
                              <LuUserPlus />
                            </span>
                            <span>Sign In</span>
                          </li>
                        </CustomLink>
                      </Button>
                    </DropdownMenuItem>
                  )}
                </DropdownMenuContent>
              </DropdownMenu>
            </ul>
          </div>
        </div>
      </div>
    </nav>
  );
}
