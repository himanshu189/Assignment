import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { useDispatch, useSelector } from "react-redux";
import "../cssFile/home.css"
import { Validation } from "../helpers/validation";
import { useHistory } from "react-router";


const Add = () => {
  const isAuth = useSelector((state) => state.isAuth);
  const dispatch = useDispatch();
  const history=useHistory()
  const [data, setData] = useState({
    name: "",
    description: "",
    photoPreview: "",
  });
  const [error, setError] = useState({});
  const [price, setPrice] = useState();
  const [quantity, setQuantity] = useState();

  const handleImage = (file) => {
    if (file) {
      let reader = new FileReader();
      reader.onload = async () => {
        console.log(reader.result);
        setData({ ...data, photoPreview: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };

  const clearState = () => {
    setData({
      name: "",
      description: "",
      photoPreview: "",
    });
    setError({})
    setPrice('')
    setQuantity('')
  };

  const handleValidation = (type) => {
     if (type === "price") {
      //  console.log("inside",!data.price ,data.price)
      if (!price ) {
        setError({ ...error, price: "Price is required" });
        return false;
      }
     else if (parseFloat(price)==0 ) {
        setError({ ...error, price: "Price can't be 0" });
        return false;
      }
    } else if (type === "quantity")  {
      //  console.log("inside",!data.price ,data.price)
      if (!quantity  ) {
        setError({ ...error, quantity: "Quantity is required" });
        return false;
      }
     else if ( parseInt(quantity)==0 ) {
        setError({ ...error, quantity: "Quantity can't be 0" });
        return false;
      }
    }else if (type === "name") {
      if (Validation.empty(data.name)) {
        setError({ ...error, name: "Name is required" });
        return false;
      } else if (!Validation.name(data.name)) {
        setError({
          ...error,
          name: "Min 2 and Max 50 characters allowed",
        });
        return false;
      }
    }

    return true;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let fields = [
      "name",
      "price",
      "quantity"
    ];
    let isvalid = false;
    for (let i = 0; i < fields.length; i++) {
      isvalid = handleValidation(fields[i]);
      if (!isvalid) break;
    }
    if (!isvalid) return;

    let pay={
      name:data.name,
      photoPreview:data.photoPreview,
      description:data.description,
      quantity:parseInt(quantity),
      price:parseFloat(price),
      uniqueId: (Math.random() + 1).toString(36).substring(2)
    }

    if (isAuth) {
      dispatch({ type: "ADDPRODUCTS", payload: pay });
      toast.success("Product added successfully");

      clearState();
      history.push("/")
    } else {
      toast.error(" Please Login First to Add");
      clearState();
    }
  };

  const handlePriceChange = (value) => {
    if (value.split(".")[1] || value.split(".")[1] == "") {
      setPrice(
        value.split(".")[0] +
          "." +
          value
            .slice(value.indexOf("."), value.length)
            .replace(/[^0-9]/g, "")
            .slice(0, 2));
    } else {
      setPrice(value)
    }
  };

  return (
    <div className="text-center">
      <h1>Add Product</h1>
      
      {/* {console.log(data)} */}

      <div className="row mt-5 signupForm">
        <div className="col-md-4"></div>
        <div className="col-md-4 pb-3  border rounded bg-light">
          <form>
            <div className="icon-upload">
              <input
                // style={{margin:"auto"}}
                className="custom-file-input mt-2"
                // required={true}
                type="file"
                accept="image/*"
                onClick={(e) => {
                  e.target.value = "";
                }}
                onChange={(e) => handleImage(e.target.files[0])}
              />
              <label class="custom-file-label" for="inputGroupFile01">
                Choose file
              </label>
              <div className="row">
                {data?.photoPreview && (
                  <img
                    style={{ margin: "auto" }}
                    src={data?.photoPreview}
                    className="rounded-circle"
                    alt="pic"
                    width="250px"
                  />
                )}
              </div>
            </div>

            <div class="form-outline mb-2 mt-3">
              <label class="form-label" htmlFor="form1Example1">
                Name
              </label>{" "}
              <input
                type="text"
                id="name"
                class="form-control"
                // required={true}
                value={data.name}
                onChange={(e) => {
                  setData({ ...data, name: e.target.value });
                }}
                onFocus={(e) => setError({ ...error, name: "" })}
                onBlur={(e) => handleValidation("name")}
              />
              {error && (
                    <span style={{ color: "red" }}>{error?.name}</span>
                  )}
              <div class="form-outline mb-2">
                <label class="form-label" htmlFor="form1Example2">
                  Description
                </label>{" "}
                <input
                  type="text"
                  id="Description"
                  //  required={true}
                  class="form-control"
                  value={data.description}
                  onChange={(e) => {
                    setData({ ...data, description: e.target.value });
                  }}
                  //   onFocus={(e) => setError({ ...error, password: "" })}
                  //   onBlur={(e) => handleValidation("password")}
                />
                {/* {error && (
                    <span style={{ color: "red" }}>{error?.password}</span>
                  )} */}
              </div>
              <div class="form-outline mb-2">
                <label class="form-label" htmlFor="form1Example1">
                  Price
                </label>{" "}
                <input
                  type="text"
                  id="mrp"
                  required={true}
                  class="form-control"
                  value={price}
                  onChange={(e) =>
                    handlePriceChange(
                      e.target.value.replace(/[^0-9|^.]/g, "")
                    )
                  }
                  onFocus={(e) =>
                    setError({ ...error, price: "" })
                  }
                  onBlur={(e) => {
                    handleValidation("price");
                    if (e.target.value) {
                      handlePriceChange(e.target.value + ".00");
                    }
                  }}
                />
                {error && (
                    <span style={{ color: "red" }}>{error?.price}</span>
                  )}
              </div>
            </div>
            <div class="form-outline mb-2">
              <label class="form-label" htmlFor="form1Example12">
                Quantity
              </label>{" "}
              <input
                type="text"
                required={true}
                id="quantity"
                class="form-control"
                value={quantity}
                onChange={(e) =>setQuantity( e.target.value.replace(/[^0-9|^]/g, "")) }
                  onFocus={(e) => setError({ ...error, quantity: "" })}
                  onBlur={(e) => handleValidation("quantity")}
              />
              {error && (
                    <span style={{ color: "red" }}>{error?.quantity}</span>
                  )}
            </div>

            <button
              type="submit"
              class="btn btn-primary "
              onClick={(e) => handleSubmit(e)}
            >
              Add
            </button>
          </form>
        </div>
        <div className="col-md-4"></div>
      </div>
    </div>
  );
};

export default Add;
