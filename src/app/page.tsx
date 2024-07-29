import Card from "../app/card";
import { getUserData } from "@/utils/webAppUtils";

const userData = getUserData();

export default function Home() {
  return (
    <main className="text-white pb-2 bg-[url(/background2.png)] bg-no-repeat bg-center bg-cover">
      <Card />
    </main>
  );
}
