import React from "react";
import {  Outlet ,useNavigate } from "react-router-dom";
import Loading from "../components/Layout/Loading";
import { useEffect } from "react";

const LoginOnlyRoute = ({loading, isAuthenticated, checkAdmin, user }) => {
   const history = useNavigate();
   const activeLoading = loading !== undefined ? loading : user?.loading;

   useEffect(() => {
     if (activeLoading) return;

     if (!isAuthenticated) {
       history("/login");
       return;
     }

     if (checkAdmin) {
       if (user?.user?.role !== "admin") {
         history("/");
       }
     }
   }, [isAuthenticated, activeLoading, checkAdmin, user, history]);

   return <>{activeLoading ? <Loading /> : <Outlet  />}</>;
};

export default LoginOnlyRoute;
