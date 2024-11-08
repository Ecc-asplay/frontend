'use client'
import { LeftNavigation } from "./components/navigations/left";
import { RightNavigation } from "./components/navigations/right";
import { Posts } from "./components/posts/posts";
export default function Home() {
  return (
    <div className="flex">
      <LeftNavigation/>
      <Posts/>
      <RightNavigation/>
    </div>
  );
}
