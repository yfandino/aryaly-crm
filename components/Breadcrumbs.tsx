import { useRouter } from "next/router";
import { HomeIcon } from "@heroicons/react/outline";

export default function Breadcrumbs() {
  const router = useRouter();
  const path = router.pathname;

  return (
    <div>
      <HomeIcon className="h-5 w-5 inline"/>
      {">"} Fake {">"} path
    </div>
  );
}