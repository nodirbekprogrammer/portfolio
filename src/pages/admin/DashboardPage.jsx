import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getSkill } from "../../redux/slices/skillSlice";
import { Spin } from "antd";

const DashboardPage = () => {
  const dispatch = useDispatch();
  const { total, loading } = useSelector((state) => state.skill);

  useEffect(() => {
    dispatch(getSkill());
  }, [dispatch]);

  return (
    <div>
      {loading ? (
        <div
          style={{
            marginTop: "300px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Spin size="large" />
        </div>
      ) : (
        <div>
          <h1>All Skills ({total})</h1>
        </div>
      )}
    </div>
  );
};

export default DashboardPage;
