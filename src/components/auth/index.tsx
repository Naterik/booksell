import { useCurrentApp } from "components/context/app.context";
import { Button, Result } from "antd";
import { Link, useLocation } from "react-router-dom";
interface IProps {
  children: React.ReactNode;
}
const ProtectedRoute = (props: IProps) => {
  const location = useLocation();
  const { user, isAuthenticated } = useCurrentApp();
  if (isAuthenticated === false) {
    return (
      <Result
        status="404"
        title="Not Login"
        subTitle="Vui lòng đăng nhập để sử dụng tính năng này !"
        extra={
          <Button type="primary">
            <Link to="/login">Đăng nhập</Link>
          </Button>
        }
      />
    );
  }
  const isAdminRoute = location.pathname.includes("admin");
  if (isAdminRoute === true && isAuthenticated === true) {
    const role = user?.role;
    if (role === "USER") {
      return (
        <Result
          status="403"
          title="403"
          subTitle="Sorry, you are not authorized to access this page."
          extra={<Button type="primary">Back Home</Button>}
        />
      );
    }
  }

  return <>{props.children}</>;
};
export default ProtectedRoute;
