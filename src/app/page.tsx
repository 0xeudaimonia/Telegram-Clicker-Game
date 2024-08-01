import Card from "../app/card";
import { getUserData } from "@/utils/webAppUtils";
import LayoutHome from "@/components/layouts";
import "./globals.css";

const userData = getUserData();

export default function Home() {
  return (
    <LayoutHome>
      <main className="text-white pb-2 bg-[url(/background2.png)] bg-no-repeat bg-center bg-cover">
        <Card />
      </main>
    </LayoutHome>
  );
}
