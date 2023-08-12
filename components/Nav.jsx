"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { signIn, signOut, useSession, getProviders } from "next-auth/react";

const Nav = () => {
  // const isUserLoggedIn = true;
  const { data: session } = useSession();
  const [providers, setProviders] = useState(null);
  const [toggleDropdown, settoggleDropdown] = useState(false);

  useEffect(() => {
    const setUpProviders = async () => {
      const response = await getProviders();
      setProviders(response);
    };
    setUpProviders();
  }, []);
  // if(providers !== null){

  //   Object.values(providers).map(provider => {
  //     console.log(provider.name)
  //   })
  // }
  // console.log(session.user.image);
  return (
    <nav className="flex justify-between items-center w-full mb-16 pt-3">
      <Link href="/" className="flex gap-2 justify-center items-center">
        <Image
          src="/assets/images/logo.svg"
          alt="Promptopia Logo"
          width={30}
          height={30}
          className="object-contain"
        />
        <p className="hidden md:block font-satoshi font-semibold text-log text-black tracking-wide">
          Promptopia
        </p>
      </Link>

      {/* Desktop Navigation */}
      <div className="sm:flex hidden">
        {session?.user ? (
          <div className="flex gap-3 md:gap-5">
            <Link href="/create-prompt" className="black_btn">
              Create Post
            </Link>
            <button className="outline_btn" type="button" onClick={signOut}>
              Sign Out
            </button>

            <Link href="/profile">
              <Image
                src={session.user.image}
                width={37}
                height={37}
                className="rounded-full"
                alt="profile"
              />
            </Link>
          </div>
        ) : (
          <>
            {providers &&
              Object.values(providers).map((provider) => (
                <button
                  type="button"
                  key={provider.name}
                  onClick={() => signIn(provider.id)}
                  className="black_btn"
                >
                  Sign In
                </button>
              ))}
          </>
        )}
      </div>
      {/* Mobile Navigation */}
      <div className="sm:hidden flex relative">
        {session?.user ? (
          <div className="flex">
            <Image
              // src="/assets/images/profile.svg"
              src={session?.user.image}
              width={37}
              height={37}
              className="rounded-full"
              alt="profile"
              onClick={() => settoggleDropdown((prev) => !prev)}
            />
            {toggleDropdown && (
              <div className="absolute right-0 top-[100%] mt-3 w-full p-5 rounded-lg bg-white min-w-[210px] flex flex-col gap-2 justify-end items-end">
                <Link
                  href="/profile"
                  className="text-sm font-inter text-gray-700 hover:text-gray-500 font-medium"
                  onClick={() => settoggleDropdown(false)}
                >
                  Profile
                </Link>
                <Link
                  href="/create-prompt"
                  className="text-sm font-inter text-gray-700 hover:text-gray-500 font-medium"
                  onClick={() => settoggleDropdown(false)}
                >
                  Create Prompt
                </Link>
                <button
                  type="button"
                  onClick={() => {
                    settoggleDropdown(false);
                    signOut();
                  }}
                  className="black_btn mt-5 w-full"
                >
                  Sign Out
                </button>
              </div>
            )}
          </div>
        ) : (
          <>
            {providers &&
              Object.values(providers).map((provider) => (
                <button
                  type="button"
                  key={provider.name}
                  onClick={() => signIn(provider.id)}
                  className="black_btn"
                >
                  Sign In
                </button>
              ))}
          </>
        )}
      </div>
    </nav>
  );
};

export default Nav;
