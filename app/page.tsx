import Navbar from "@/components/LandingPage/Navbar";
import Landingpage from "@/components/LandingPage/Landingpage";
import { Button } from "@/components/ui/Button";

export default function Home() {
  return (
    <>
      <Navbar />
      <Landingpage />
      <div>This is content</div>
      <Button variant="default">Click Me</Button>
    </>
  );
}
