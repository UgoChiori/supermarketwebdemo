import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import Hero from "./components/Hero";




function App() {

  useEffect(() => {
    AOS.init({
      duration: 1000,
      once:  false,
      easing: "ease-out-cubic",
      offset: 100,
    })
  }, [])
  

  return (
    <div className="">
      <Hero />
      {/* <Navbar /> */}
       
    </div>
  )
}

export default App
