import Link from "next/link";
import { debounce } from "debounce";
import { useRouter, usePathname } from "next/navigation";
import { BiSearch, BiUser } from "react-icons/bi";
import { AiOutlinePlus } from "react-icons/ai";
import { CiWallet } from "react-icons/ci";
import { BsThreeDotsVertical } from "react-icons/bs";
import { FiLogOut } from "react-icons/fi";
import { useEffect, useState } from "react";
import { useUser } from "@/app/context/user";
import { useGeneralStore } from "@/app/stores/general";
import useCreateBucketUrl from "@/app/hooks/useCreateBucketUrl";
import { RandomUsers } from "@/app/types";
import useSearchProfilesByName from "@/app/hooks/useSearchProfilesByName";
import dynamic from "next/dynamic";
import { useModalStore } from "@/app/stores/modal";
import { useWallet } from "@meshsdk/react";

export default function TopNav() {
  const userContext = useUser();
  const router = useRouter();
  const pathname = usePathname();
  const { toggleConnectModal } = useModalStore();
  // const connected = useWallet();
  const connected = "";
  const [searchProfiles, setSearchProfiles] = useState<RandomUsers[]>([]);
  let [showMenu, setShowMenu] = useState<boolean>(false);
  let { setIsLoginOpen, setIsEditProfileOpen } = useGeneralStore();

  useEffect(() => {
    setIsEditProfileOpen(false);
  }, []);

  const handleSearchName = debounce(
    async (event: { target: { value: string } }) => {
      if (event.target.value == "") return setSearchProfiles([]);

      try {
        const result = await useSearchProfilesByName(event.target.value);
        if (result) return setSearchProfiles(result);
        setSearchProfiles([]);
      } catch (error) {
        console.log(error);
        setSearchProfiles([]);
        alert(error);
      }
    },
    500
  );

  const goTo = () => {
    if (!userContext?.user) return setIsLoginOpen(true);
    router.push("/upload");
  };

  return (
    <>
      <div
        id="TopNav"
        className="fixed left-0 right-0 top-0 z-50 w-full px-4 md:px-8"
      >
        <div
          className={`relative flex h-20 w-full items-center justify-between rounded-xl  px-5 backdrop-blur-lg md:px-10 ${
            pathname === "/" ? "" : ""
          }`}
        >
          <Link href="/">
            <img className="min-w-[115px] w-[115px]" src="/images/logo.png" />
          </Link>

          <div className="relative hidden md:flex items-center justify-end bg-black/40 p-1 rounded-full max-w-[430px] w-full border border-white/30">
            <input
              type="text"
              onChange={handleSearchName}
              className="w-full pl-3 my-2 bg-transparent placeholder-[#838383] text-[15px] focus:outline-none"
              placeholder="Search accounts"
            />

            {searchProfiles.length > 0 ? (
              <div className="absolute bg-black/50 max-w-[910px] h-auto w-full z-20 left-0 top-12 border border-white/30 p-1">
                {searchProfiles.map((profile, index) => (
                  <div className="p-1" key={index}>
                    <Link
                      href={`/profile/${profile?.id}`}
                      className="flex items-center justify-between w-full cursor-pointer hover:bg-[#F12B56] p-1 px-2 hover:text-white"
                    >
                      <div className="flex items-center">
                        <img
                          className="rounded-md"
                          width="40"
                          src={useCreateBucketUrl(profile?.image)}
                        />
                        <div className="truncate ml-2">{profile?.name}</div>
                      </div>
                    </Link>
                  </div>
                ))}
              </div>
            ) : null}

            <div className="px-3 py-1 flex items-center border-l border-l-gray-300">
              <BiSearch color="#A1A2A7" size="22" />
            </div>
          </div>

          <div className="flex items-center gap-3 ">
            <button
              onClick={() => goTo()}
              className="flex items-center border rounded-sm py-[6px] hover:bg-black/50 pl-1.5"
            >
              <AiOutlinePlus size="22" />
              <span className="px-2 font-medium text-[15px]">Upload</span>
            </button>
            <button
              onClick={() => toggleConnectModal(true)}
              className={`flex items-center border rounded-sm py-[6px] hover:bg-black/50 pl-1.5 ${
                connected && "bg-[#880FD2]"
              } transition-[background]`}
            >
              <span className="px-2 flex gap-1 font-medium text-[15px]">
                {connected ? (
                  "Connected"
                ) : (
                  <>
                    Connect <CiWallet size={22} />
                  </>
                )}
              </span>
            </button>
            {!userContext?.user?.id ? (
              <div className="flex items-center gap-4">
                <button
                  onClick={() => setIsLoginOpen(true)}
                  className="flex items-center bg-[#F02C56] text-white border rounded-md px-3 py-[6px]"
                >
                  <span className="whitespace-nowrap mx-4 font-medium text-[15px]">
                    Log in
                  </span>
                </button>
              </div>
            ) : (
              <div className="flex items-center">
                <div className="relative">
                  <button
                    onClick={() => setShowMenu((showMenu = !showMenu))}
                    className="mt-1 border border-gray-200 rounded-full"
                  >
                    <img
                      className="rounded-full w-[35px] h-[35px]"
                      src={useCreateBucketUrl(userContext?.user?.image || "")}
                    />
                  </button>

                  {showMenu ? (
                    <div className="absolute bg-[#121316] rounded-lg w-[120px] shadow-xl border border-gray-300/30 top-[60px] right-0">
                      <button
                        onClick={() => {
                          router.push(`/profile/${userContext?.user?.id}`);
                          setShowMenu(false);
                        }}
                        className="flex items-center w-full justify-start py-3 px-1.5 hover:bg-white/10 cursor-pointer"
                      >
                        <BiUser size="20" />
                        <span className="pl-2 font-semibold text-sm">
                          Profile
                        </span>
                      </button>
                      <div className="w-[95%] h-[1px] bg-gray-300/30 mx-auto" />
                      <button
                        onClick={async () => {
                          await userContext?.logout();
                          setShowMenu(false);
                        }}
                        className="flex items-center justify-start w-full py-3 px-1.5 hover:bg-white/10 \ border-gray-300/30 cursor-pointer "
                      >
                        <FiLogOut size={20} />
                        <span className="pl-2 font-semibold text-sm">
                          Log out
                        </span>
                      </button>
                    </div>
                  ) : null}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
