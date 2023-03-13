import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { TopBar } from "../TopBar/TopBar";

export function Header() {
  const [accountId, setAccountId] = useState(localStorage.getItem("logged"));
  const [pages, setPages] = useState([]);
  const [navFuncs, setNavFuncs] = useState([]);
  let navigate = useNavigate();

  const pagesCustomer = ["Projects"];
  const pagesCustNav = [
    () => {
      navigate(`/customer/projects/${accountId}`);
    },
  ];

  const pagesEmployee = ["Teams", "Tasks", "Employees"];
  const pagesEmplNav = [
    () => {
      navigate(`/employee/teams/${accountId}`);
    },
    () => {
      navigate(`/employee/tasks/${accountId}`);
    },
    () => {
      navigate(`/employees`);
    },
  ];

  const pagesAdmin = ["Projects", "Teams"];
  const pagesAdminNav = [
    () => {
      navigate(`/admin/projects`);
    },
    () => {
      navigate(`/admin/teams`);
    },
  ];

  useEffect(() => {
    const accountType = localStorage.getItem("accountType");
    switch (accountType) {
      case "admin":
        setPages(pagesAdmin);
        setNavFuncs(pagesAdminNav);
        break;
      case "customer":
        setPages(pagesCustomer);
        setNavFuncs(pagesCustNav);
        break;
      case "employee":
        setPages(pagesEmployee);
        setNavFuncs(pagesEmplNav);
        break;
    }
  }, []);

  return <TopBar pages={pages} navigateFuncs={navFuncs} />;
}
