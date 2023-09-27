import Signin from "../pages/auth/Signin";
import Signup from "../pages/auth/Signup";

import Dashboard from "../pages/admin/Dashboard";
import Products from "../pages/admin/Products";
import AddProduct from "../pages/admin/AddProduct";
const authRoutes = [
  { path: "/auth/signin", component: Signin },
  { path: "/auth/signup", component: Signup },
];

const adminRoutes = [
  { path: "/admin/dashboard", component: Dashboard },
  { path: "/admin/astrologers", component: Products },
  { path: "/admin/users", component: AddProduct },
];
export { authRoutes, adminRoutes };
