import Image from "next/image";
import Link from "next/link";
import { BorderBeam } from "@/components/border-beam";
import { Button } from "@/components/ui/button";
import { SiteConfig } from "@/config/site";
import { cn } from "@/lib/utils";

import landingImg from "./landing-page.png";

export default function LandingPage() {
  return (
    <div className="flex flex-col items-center container overflow-y-hidden overflow-x-hidden  justify-center">
      <div className={cn("flex flex-col mb-4 items-center justify-center")}>
        <h1 className="mb-6 text-center text-xl md:text-6xl">
          Simplify todo management with Planyk
        </h1>
      </div>

      <div className="relative   rounded-xl">
        <BorderBeam />
        <Image src={landingImg} alt="Tasky Board" className="rounded-xl" priority />
      </div>

      <Button className="mt-6" size="lg" asChild>
        <Link href="/sign-up">Get {SiteConfig.title}</Link>
      </Button>
    </div>
  );
}
