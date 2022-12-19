import { Search } from "./Search";
import { NavLink, useNavigate} from "react-router-dom";
import { AuthBlock } from "./AuthBlock";
import { CartBlock } from "./CartBlock";

function Header(){

    return (
      <div className="header">
        <div className="container">
          <div className="container__left">
            <div>
              <NavLink to = '/'>
                <h1>Sweet shop</h1>
              </NavLink>
              <p>The most delicious sweets</p>
            </div>
          </div>

          <div className="container__center">
              <Search/>
          </div>
          

          <div className="container__right">
            <CartBlock/>

            <AuthBlock />
          </div> 
        </div>
      </div>
)}

export default Header;