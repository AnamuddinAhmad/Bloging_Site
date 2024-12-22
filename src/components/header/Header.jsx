import React from "react";
import { LogoutBtn, Container, Logo } from "../index";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const Header = () => {
  const authStatus = useSelector((state) => state.auth.status);
  return <div>Header</div>;
};
 
export default Header;
