import React from "react";
import Resizer from "react-image-file-resizer";
import axios from "axios";
import { useSelector } from "react-redux";
import { Avatar, Badge } from "antd";

const FileUpload = ({ values, setValues, setLoading }) => {
  const { user } = useSelector((state) => ({ ...state }));

  const fileUploadAndResize = (e) => {
    e.preventDefault();

    //let files = e.target.files[0]; ----> if we want to pick one file.

    let files = e.target.files;

    let allUploadedFiles = values.images;

    if (files) {
      setLoading(true);
      for (let i = 0; i < files.length; i++) {
        Resizer.imageFileResizer(
          files[i],
          720,
          720,
          "JPEG",
          100,
          0,
          (uri) => {
            axios
              .post(
                "http://localhost:8000/api/uploadimages",
                { image: uri },
                { headers: { authtoken: user ? user.token : "" } }
              )
              .then((res) => {
                console.log(res);
                setLoading(false);
                allUploadedFiles.push(res.data);
                setValues({ ...values, images: allUploadedFiles });
              })
              .catch((err) => console.log(err));
          },
          "base64"
        );
      }
    }
  };

  const removeImageHandler = (public_id) => {
    setLoading(true);
    // console.log(public_id);
    axios
      .post(
        "http://localhost:8000/api/removeimage",
        { public_id },
        {
          headers: {
            authtoken: user ? user.token : "",
          },
        }
      )
      .then((res) => {
        setLoading(false);
        const { images } = values;
        const filteredImages = images.filter(
          (image) => image.public_id !== public_id
        );
        setValues({ ...values, images: filteredImages });
      })
      .catch((err) => {
        setLoading(false);
        console.log(err);
      });
  };

  return (
    <>
      <div className="row">
        {values.images &&
          values.images.map((image) => (
            <Badge
              count="X"
              key={image.public_id}
              style={{ cursor: "pointer" }}
              onClick={() => removeImageHandler(image.public_id)}
            >
              <Avatar
                src={image.url}
                size={100}
                shape="square"
                className="ml-3"
              />
            </Badge>
          ))}
      </div>
      <br />
      <div className="row">
        <label className="btn btn-info shadow">
          Choose File
          <input
            type="file"
            multiple
            hidden
            accept="images/*"
            onChange={fileUploadAndResize}
          />
        </label>
      </div>
    </>
  );
};

export default FileUpload;
