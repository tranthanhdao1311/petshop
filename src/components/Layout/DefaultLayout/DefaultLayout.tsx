import React, { ReactNode, useEffect, useRef } from "react";
import HeaderUser from "../../Header/HeaderUser";
import { useDispatch, useSelector } from "react-redux";
import './DefaultLayout.scss'
import { setToggleShowSideBarMobile } from "../../../store/app/slice";
import Footer from "../../Footer/Footer";
interface GlobalStyleProps {
  children: ReactNode;
}
const DefaultLayout = ({ children }: GlobalStyleProps) => {
  const toggleShowSideBarMobile = useSelector(
    (state: any) => state.app.toggleShowSideBarMobile
  );

 const dispatch = useDispatch()

  const handleCloseSideBar = (e:React.MouseEvent<HTMLDivElement>):any => {
    if (e.target === e.currentTarget) {
        dispatch(setToggleShowSideBarMobile(false))
      }
  }

  return (
    <>
      <div className={`${toggleShowSideBarMobile}`}>
        <HeaderUser></HeaderUser>
        {children}
        <Footer></Footer>
      </div>
      {toggleShowSideBarMobile && <div onClick={handleCloseSideBar} className="overlay"></div>}
    </>
  );
};

export default DefaultLayout;
