import { Outlet } from "react-router-dom";

const LayoutNonAuth = () => {
  return (
    <>
      <main className=" ">
        <Outlet />
      </main>
    </>
  );
};

export default LayoutNonAuth;
