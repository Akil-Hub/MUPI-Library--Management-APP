import { useDispatch, useSelector } from "react-redux";
import { resetAuthSlice } from "../store/slices/authSlice";
import { logout } from "../store/slices/authSlice";
import { useEffect } from "react";
import { toast } from "react-toastify";
import logoutIcon from "../assets/logout.png";
import logo_with_title from "../assets/logo-with-title.png";
import dashboardIcon from "../assets/element.png";
import bookIcon from "../assets/book.png";
import settingIcon from "../assets/setting-white.png";
import userIcon from "../assets/people.png";
import closeIcon from "../assets/white-close-icon.png";
import catalogIcon from "../assets/catalog.png";
import { RiAdminFill } from "react-icons/ri";
import { toggleAddNewAdminPopup, toggleSettingPopup } from "../store/slices/popUpSlice";
import AddNewAdmin from "../popups/AddNewAdmin";

const SideBar = ({ isSideBarOpen, setIsSideBarOpen, setSelectedComponent }) => {
  const dispatch = useDispatch();
  const { addNewAdminPopup } = useSelector((state) => state.popup);

  const { isLoading, message, error, user, isAuthenticated } = useSelector((state) => state.auth);

  const handleLogout = () => {
    dispatch(logout())
    
  };

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(resetAuthSlice());
    }
    if (message) {
      toast.success(message);
      dispatch(resetAuthSlice());
    }
  }, [dispatch, isAuthenticated, error, isLoading, message]);

  return (
    <>
      <aside
        className={`${
          isSideBarOpen ? "left-0" : "-left-full"
        } z-10 duration-500 md:left-0  flex w-64 bg-black text-white flex-col h-full`}
        style={{ position: "fixed" }}
      >
        <div className="px-6 py-4 my-8">
          <img src={logo_with_title} alt="logo" />
        </div>
        <nav className="flex-1 px-6 space-y-2">
          <button
            className="w-full py-2 font-medium bg-transparent rounded-md hover:cursor-pointer flex items-center space-x-2"
            onClick={() => {
              setSelectedComponent("Dashboard");
            }}
          >
            <img src={dashboardIcon} alt="" />
            <span>DashBoard</span>
          </button>
          <button
            className="w-full py-2 font-medium bg-transparent rounded-md hover:cursor-pointer flex items-center space-x-2"
            onClick={() => {
              setSelectedComponent("Books");
            }}
          >
            <img src={bookIcon} alt="" />
            <span>Books</span>
          </button>
          {isAuthenticated && user?.role === "Admin" && (
            <>
              <button
                className="w-full py-2 font-medium bg-transparent rounded-md hover:cursor-pointer flex items-center space-x-2"
                onClick={() => {
                  setSelectedComponent("Catalog");
                }}
              >
                <img src={catalogIcon} alt="" />
                <span>Catalogs</span>
              </button>
              <button
                className="w-full py-2 font-medium bg-transparent rounded-md hover:cursor-pointer flex items-center space-x-2"
                onClick={() => {
                  setSelectedComponent("Users");
                }}
              >
                <img src={userIcon} alt="" />
                <span>Users</span>
              </button>
              <button
                className="w-full py-2 font-medium bg-transparent rounded-md hover:cursor-pointer flex items-center space-x-2"
                onClick={() => dispatch(toggleAddNewAdminPopup())}
              >
                <RiAdminFill className="w-6 h-6" /> <span>Add New Admin</span>
              </button>
            </>
          )}
          {isAuthenticated && user?.role === "User" && (
            <>
              <button
                className="w-full py-2 font-medium bg-transparent rounded-md hover:cursor-pointer flex items-center space-x-2"
                onClick={() => {
                  setSelectedComponent("My Borrowed Books");
                }}
              >
                <img src={catalogIcon} alt="" />
                <span>My Borrowed Books</span>
              </button>
            </>
          )}
          <button className="w-full py-2 font-medium bg-transparent rounded-md hover:cursor-pointer flex items-center space-x-2" 
          onClick={( )=> dispatch(toggleSettingPopup)}>
            <img src={settingIcon} alt="" />
            <span>Update Credentials</span>
          </button>
        </nav>
        <div className="py-4 px-6">
          <button className="py-2 font-medium text-center bg-transparent rounded-md hover:cursor-pointer flex items-center justify-center space-x-5 mx-auto"
          onClick={handleLogout}>
            <img src={logoutIcon} alt="logout" />
            <span>Log Out</span>
          </button>
        </div>
        <img
          src={closeIcon}
          alt=""
          onClick={() => {
            setIsSideBarOpen(!isSideBarOpen);
          }}
          className="h-fit w-fit absolute top-0 right-4 mt-4 block md:hidden"
        />
      </aside>
      {addNewAdminPopup && <AddNewAdmin />}
    </>
  );
};

export default SideBar;