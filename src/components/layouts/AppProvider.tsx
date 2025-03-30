"use client";
import { createContext, useContext, useState, useEffect } from "react";
import { isMobile, isAndroid } from "react-device-detect";
import Image from "next/image";

type Props = {
  children: React.ReactNode;
};
const AppContext = createContext<{
  userPoints: number;
  setUserPoints: React.Dispatch<React.SetStateAction<number>>;
  currentUserId: string;
  setCurrentUserId: React.Dispatch<React.SetStateAction<string>>;
}>({
  userPoints: 0,
  setUserPoints: () => {},
  currentUserId: "",
  setCurrentUserId: () => {},
});

export const useAppProvider = () => useContext(AppContext);

export default function AppProvider({ children }: Props) {
  const [userPoints, setUserPoints] = useState<number>(0);
  const [currentUserId, setCurrentUserId] = useState<string>("");

  // Track if the component has mounted
  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    setHasMounted(true);
  }, []);

  const isFoldableOrMobile =
    isMobile || (isAndroid && /fold/i.test(navigator.userAgent)) || true;

  if (!hasMounted) {
    // Prevents SSR mismatch by rendering nothing until the component has mounted
    return null;
  }

  return (
    <AppContext.Provider
      value={{
        userPoints,
        setUserPoints,
        currentUserId,
        setCurrentUserId,
      }}
    >
      {isFoldableOrMobile ? (
        <>{children}</>
      ) : (
        <div className="h-screen">
          <div className="flex flex-col items-center justify-center h-full p-4">
            <Image src="/nftpage.png" alt="Telegram" height={350} width={350} />
            <h3 className="text-center mt-4 text-white text-2xl font-bold textarea-lg">
              Sorry, this app is only available on mobile devices.
            </h3>
          </div>
        </div>
      )}
    </AppContext.Provider>
  );
}
