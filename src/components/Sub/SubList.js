import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getSubs } from "../../functions/sub";
import { LoadingOutlined } from "@ant-design/icons";

const SubList = () => {
  const [subs, setSubs] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    getSubs().then((res) => {
      setSubs(res.data);
      setLoading(false);
    });
  }, []);

  const showSubs = subs.map((s) => (
    <div
      key={s._id}
      className="col-lg-2 col-sm-3 btn btn-outline-primary pt-lg-1 pt-sm-4 btn-lg btn-block m-3"
    >
      <Link to={`/sub/${s.slug}`}>{s.name}</Link>
    </div>
  ));

  return (
    <div className="container">
      <div className="row">
        {loading ? <LoadingOutlined className="text-danger h1" /> : showSubs}
      </div>
    </div>
  );
};

export default SubList;
