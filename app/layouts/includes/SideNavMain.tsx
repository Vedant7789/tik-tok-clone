import Link from "next/link";
import { usePathname } from "next/navigation";
import MenuItem from "./MenuItem";
import MenuItemFollow from "./MenuItemFollow";
import { useEffect } from "react";
import { useUser } from "@/app/context/user";
import ClientOnly from "@/app/components/ClientOnly";
import { useGeneralStore } from "@/app/stores/general";

export default function SideNavMain() {
  let { setRandomUsers, randomUsers } = useGeneralStore();

  const contextUser = useUser();
  const pathname = usePathname();

  useEffect(() => {
    setRandomUsers();
  }, []);
  return (
    <>
      <div
        className={`hidden sm:flex sticky top-[100px] font-helvetica-light tracking-wider ${
          pathname ? "lg:w-[310px]" : "w-[220px]"
        } flex flex-col border border-[#FFFFFF12] lg:border-r-0 border-r rounded-[20px] bg-[#121316]  [&::-webkit-scrollbar]:hidden p-3 max-h-[84vh] overflow-auto`}
      >
        <div className="lg:w-full w-[55px] mx-auto pb-5 ">
          <Link href="/">
            <MenuItem
              iconString="For You"
            //   colorString={pathname == "/" ? "#F02C56" : ""}
              sizeString="25"
            />
          </Link>
          {/* <MenuItem iconString="Following" sizeString="25" /> */}
          {/* <MenuItem iconString="LIVE"  sizeString="25"/> */}

          <div className="border-b lg:ml-2 mt-2" />
          <h3 className="lg:block hidden text-xs text-gray-600 font-semibold pt-4 pb-2 px-2 font-offbit-101-bold">
            Suggested accounts
          </h3>

          <div className="lg:hidden block pt-3" />
          <ClientOnly>
            <div className="cursor-pointer">
              {randomUsers?.map((user, index) => (
                <MenuItemFollow key={index} user={user} />
              ))}
            </div>
          </ClientOnly>

          <button className="lg:block hidden pt-1.5 pl-2 text-[13px]">
            See all
          </button>
{/* 
          {contextUser?.user?.id ? (
            <div>
              <div className="border-b lg:ml-2 mt-2" />
              <h3 className="lg:block hidden text-xs text-gray-600 font-semibold pt-4 pb-2 px-2 font-offbit-101-bold">
                Following accounts
              </h3>

              <div className="lg:hidden block pt-3" />
              <ClientOnly>
                <div className="cursor-pointer">
                  {randomUsers?.map((user, index) => (
                    <MenuItemFollow key={index} user={user} />
                  ))}
                </div>
              </ClientOnly>

              <button className="lg:block hidden pt-1.5 pl-2 text-[13px]">
                See more
              </button>
            </div>
          ) : null} */}
          {/* <div className="lg:block hidden border-b lg:ml-2 mt-2" /> */}

          {/* <div className="lg:block hidden text-[11px] text-gray-500">
            <p className="pt-4 px-2">
              About Newsroom TikTok Shop Contact Careers ByteDance
            </p>
            <p className="pt-4 px-2">
              TikTok for Good Advertise Developers Transparency TikTok Rewards
              TikTok Browse TikTok Embeds
            </p>
            <p className="pt-4 px-2">
              Help Safety Terms Privacy Creator Portal Community Guidelines
            </p>
            <p className="pt-4 px-2">© 2023 TikTok</p>
          </div> */}

          {/* <div className="pb-14"></div> */}
        </div>
      </div>
    </>
  );
}
