import { Outlet } from "react-router-dom";
import MainNavigation from "../components/MainNavigation";
import Footer from "../components/footer";





const Root = () => {
    
    
     return (
       <div className="flex flex-col">

        <MainNavigation/>
         <Outlet/> 
        <Footer/>

        
         </div>  
         
            
)
}
export default Root;