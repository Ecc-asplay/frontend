'use client'
import { LeftNavigation } from "./components/navigations/left";
import { RightNavigation } from "./components/navigations/right";
import { Main } from "./components/main/main";
export default function Home() {
  return (
    <div className="flex">
      <LeftNavigation/>
      <Main/>
      <RightNavigation/>
    </div>
  );
}
