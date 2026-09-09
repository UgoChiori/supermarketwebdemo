import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import Hero from "./components/Hero";
import Category from "./components/Category";




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
    <div className="overflow-hidden ">
      <Hero />
      <Category />
       
    </div>
  )
}

export default App
