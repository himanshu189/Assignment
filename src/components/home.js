import React from "react";
import "../cssFile/home.css";
import ThumbUpIcon from "@material-ui/icons/ThumbUp";
import { IconButton, Badge, debounce } from "@material-ui/core";
import ThumbUpOutlinedIcon from "@material-ui/icons/ThumbUpOutlined";
import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

const Home = () => {
  const dispatch=useDispatch()
  const products1 = useSelector((state) => state.products);
  const [edit, setEdit] = useState();
  const [name, setName] = useState();
  const [price, setPrice] = useState();
  const [quantity, setQuantity] = useState();
  const [description, setDescription] = useState();
  const [photoPreview, setPhotoPreview] = useState();
  const[products,setProducts]=useState([])
  const[search,setSearch]=useState('')
  const[afterSearch,setAfterSearch]=useState([])
  const[priceFilter,setPriceFilter]=useState()
  const[quantityFilter,setQuantityFilter]=useState()

  const[unique,setUnique]=useState()


useEffect(()=>{
setProducts(products1)
},[products1])

const handleEdit=(item,index)=>{
  setEdit(index)
  setName(item.name)
  setPrice(item.price)
  setQuantity(item.quantity)
  setDescription(item.description)
  setPhotoPreview(item.photoPreview)
  setUnique(item.uniqueId)
  
}

const handleSave=(index)=>{
  setEdit('')

  let payload={
    name:name,
    photoPreview:photoPreview,
    description:description,
    quantity:parseInt(quantity),
    price:parseFloat(price),
    uniqueId:unique
  }

if(search.trim()==="" &&  !priceFilter && !quantityFilter)
{
  var res= products.map((item,i)=>{
    if(index===i){
return payload
    }
    else{
      return item
    }
  }
  )}

  else{
    document.getElementById("search").value=""
    setSearch('')
    setPriceFilter("")
    setQuantityFilter('')
    var res= products.map((item,i)=>{
      if(item.uniqueId===afterSearch[index].uniqueId){
  return payload
      }
      else{
        return item
      }
    }
    )
    
        

  }
  console.log(res)
  
  // setProducts([...products,products[index]=payload])
  
  dispatch({type:"EDITPRODUCT",payload:res})

}
const handleImage = (file) => {
  if (file) {
    let reader = new FileReader();
    reader.onload = async () => {
      console.log(reader.result);
      setPhotoPreview(reader.result );
    };
    reader.readAsDataURL(file);
  }
};

useEffect(()=>{

if(search.trim()!=="")
{ var searchedArray= products.filter(item=> item.name.toLowerCase().includes(search.toLowerCase().trim()))
   setAfterSearch(searchedArray)
}

},[search])
useEffect(()=>{
console.log("inside price useEffect",priceFilter)
  if(priceFilter && priceFilter>100)
  { var searchedArray= products.filter(item=> item.price>100 )
     setAfterSearch(searchedArray)
  }
  else if(priceFilter && priceFilter<110)
  { var searchedArray= products.filter(item=> item.price<priceFilter && item.price>=priceFilter-10 )
     setAfterSearch(searchedArray)
  }
  
  },[priceFilter])

  useEffect(()=>{
    console.log("inside quantity useEffect",quantityFilter)
      if(quantityFilter && quantityFilter>100)
      { var searchedArray= products.filter(item=> item.quantity>=100 )
         setAfterSearch(searchedArray)
      }
      else if(quantityFilter && quantityFilter<110)
      { var searchedArray= products.filter(item=> item.quantity<quantityFilter && item.quantity>=quantityFilter-10 )
         setAfterSearch(searchedArray)
      }
      
      },[quantityFilter])

const searchHandle = debounce((text) => {
  setSearch(text);
  setPriceFilter("")
  setQuantityFilter('')

}, 1000);

const handlePriceFilter=(value)=>{
  setPriceFilter(value)
  setSearch("")
  setQuantityFilter('')
  document.getElementById("search").value=""


}

const handleQuantityFilter=(value)=>{
  setQuantityFilter(value)
  setPriceFilter("")
  setSearch("")
  document.getElementById("search").value=""


}

  return (
    <div>
      <h1 className="text-center" >PRODUCTS</h1>
      <div className="text-center p-3">
        <input
              className="searchkaro"
              placeholder="Search Products by name"
              id="search"
              // disabled={products && products.length===0}
              // value={search}
              onChange={(e) => {searchHandle(e.target.value)
                setEdit('')
              } 
              }
            />
      </div>
      <div className="text-center" >
      <select className="m-2" name="cars" id="cars"
       value={priceFilter}
       onChange={(e) => handlePriceFilter(e.target.value)}
      >
    <option value="">Filter by Price</option>
    <option value={10}> &lt;10</option>
    <option value={20}>10-20</option>
    <option value={30}>20-30</option>
    <option value={40}>30-40</option>
    <option value={50}>40-50</option>
    <option value={60}>50-60</option>
    <option value={70}>60-70</option>
    <option value={80}>70-80</option>
    <option value={90}>80-90</option>
    <option value={100}>90-100</option>
    <option value={110}> &gt;100</option>

  </select>
  
  <select className="m-2" name="cars" id="cars"
       value={quantityFilter}
       onChange={(e) => handleQuantityFilter(e.target.value)}
      >
    <option value="">Filter by Quantity</option>
    <option value={10}> &lt;10</option>
    <option value={20}>10-20</option>
    <option value={30}>20-30</option>
    <option value={40}>30-40</option>
    <option value={50}>40-50</option>
    <option value={60}>50-60</option>
    <option value={70}>60-70</option>
    <option value={80}>70-80</option>
    <option value={90}>80-90</option>
    <option value={100}>90-100</option>
    <option value={110}> &gt;100</option>

  </select>

      </div>
      
      <div className="row signupForm mb-5">
        {/* {console.log(products)} */}
        { search.trim()==="" && !priceFilter && !quantityFilter ?  products && products.length>0 ?
          products.map((item, index) => (
            <div
              key={index}
              style={{
                backgroundColor: 
                edit !== index  ? "rgb(256, 256, 256,0.75)"
                  : "rgb(0, 0, 0,0.1)",
              }}
              className="card col-md-4 mt-2 mb-2"
            >
              <p className="pt-2">
                <b>S.No - {index + 1}</b>
              </p>
              {/* {console.log(item)} */}
              <img
                style={{ margin: "auto" }}
                src={ edit === index ? photoPreview?photoPreview:"logo192.png" : item?.photoPreview ? item?.photoPreview : "logo192.png"}
                className="rounded "
                alt="pic"
                width="150px"
              />
               {edit === index && <div className="text-center"> <input
                // style={{margin:"auto"}}
                // className="text-center"
                // required={true}
                type="file"
                accept="image/*"
                onClick={(e) => {
                  e.target.value = "";
                }}
                onChange={(e) => handleImage(e.target.files[0])}
              /> </div>}
              <hr></hr>
              <div className="text-left ">
                {edit !== index ? (
                  <p>
                    <b>Name -</b> {item.name}
                  </p>
                ) : (
                  <div className="row">
                    <div className="col-md-3">
                      <label class="form-label" htmlFor="form1Example1">
                        <b>Name-</b>
                      </label>
                    </div>
                    <div className="col-md-8 pb-1">
                      <input
                        type="text"
                        id="name"
                        class="form-control"
                        
                        value={name}
                        onChange={(e) => {
                          setName(e.target.value);
                        }}
                        // onFocus={(e) => setError({ ...error, name: "" })}
                        // onBlur={(e) => handleValidation("name")}
                      />
                    </div>
                  </div>
                )}
               {edit !== index ? ( <p>
                  <b>Price -</b> &#x20B9; {item.price}
                </p>)
                : (
                  <div className="row">
                    <div className="col-md-3">
                      <label class="form-label" htmlFor="form1Example1">
                        <b>Price-</b>
                      </label>
                    </div>
                    <div className="col-md-8  pb-1">
                      <input
                        type="text"
                        id="name"
                        class="form-control"
                        value={price}
                        onChange={(e) => {
                          setPrice( e.target.value);
                        }}
                        // onFocus={(e) => setError({ ...error, name: "" })}
                        // onBlur={(e) => handleValidation("name")}
                      />
                    </div>
                  </div>
                )}

               {edit !== index ? (  <p>
                 <b>Quantity -</b> {item.quantity}
                </p>)
                : (
                  <div className="row">
                    <div className="col-md-3">
                      <label class="form-label" htmlFor="form1Example1">
                        <b>Quantity-</b>
                      </label>
                    </div>
                    <div className="col-md-8 pb-1">
                      <input
                        type="text"
                        id="name"
                        class="form-control"
                        value={quantity}
                        onChange={(e) => {
                          setQuantity( e.target.value);
                        }}
                        // onFocus={(e) => setError({ ...error, name: "" })}
                        // onBlur={(e) => handleValidation("name")}
                      />
                    </div>
                  </div>
                )}
               {edit !== index ? (  <p>
                  <b>Description -</b> {item.description}
                </p>)
                : (
                  <div className="row">
                    <div className="col-md-3">
                      <label class="form-label" htmlFor="form1Example1">
                        <b>Description-</b>
                      </label>
                    </div>
                    <div className="col-md-8">
                      <input
                        type="text"
                        id="name"
                        class="form-control"
                        value={description}
                        onChange={(e) => {
                          setDescription(e.target.value);
                        }}
                        // onFocus={(e) => setError({ ...error, name: "" })}
                        // onBlur={(e) => handleValidation("name")}
                      />
                    </div>
                  </div>
                )}
                <div className="text-center">
                  {edit !== index ? (
                    <button
                      className="btn btn-primary btn-sm m-2"
                      onClick={() => handleEdit(item,index)}
                    >
                      Edit
                    </button>
                  ) : (
                    <button
                      className="btn btn-danger btn-sm m-2"
                      onClick={() => handleSave(index)}
                    >
                      Save
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))
        :
        <h1 className="text-center">
          Please Add product first</h1>:
          
          afterSearch && afterSearch.length>0?
          afterSearch.map((item, index) => (
            <div
              key={index}
              style={{
                backgroundColor: 
                edit !== index  ? "rgb(256, 256, 256,0.75)"
                  : "rgb(0, 0, 0,0.1)",
              }}
              className="card col-md-4 mt-2 mb-2"
            >
              <p className="pt-2">
                <b>S.No - {index + 1}</b>
              </p>
              {/* {console.log(item)} */}
              <img
                style={{ margin: "auto" }}
                src={ edit === index ? photoPreview?photoPreview:"logo192.png" : item?.photoPreview ? item?.photoPreview : "logo192.png"}
                className="rounded "
                alt="pic"
                width="150px"
              />
               {edit === index && <input
                // style={{margin:"auto"}}
                // className="custom-file-input mt-2"
                // required={true}
                type="file"
                accept="image/*"
                onClick={(e) => {
                  e.target.value = "";
                }}
                onChange={(e) => handleImage(e.target.files[0])}
              />}
              <hr></hr>
              <div className="text-left ">
                {edit !== index ? (
                  <p>
                    <b>Name -</b> {item.name}
                  </p>
                ) : (
                  <div className="row">
                    <div className="col-md-3">
                      <label class="form-label" htmlFor="form1Example1">
                        <b>Name-</b>
                      </label>
                    </div>
                    <div className="col-md-8 pb-1">
                      <input
                        type="text"
                        id="name"
                        class="form-control"
                        
                        value={name}
                        onChange={(e) => {
                          setName(e.target.value);
                        }}
                        // onFocus={(e) => setError({ ...error, name: "" })}
                        // onBlur={(e) => handleValidation("name")}
                      />
                    </div>
                  </div>
                )}
               {edit !== index ? ( <p>
                  <b>Price -</b> &#x20B9; {item.price}
                </p>)
                : (
                  <div className="row">
                    <div className="col-md-3">
                      <label class="form-label" htmlFor="form1Example1">
                        <b>Price-</b>
                      </label>
                    </div>
                    <div className="col-md-8  pb-1">
                      <input
                        type="text"
                        id="name"
                        class="form-control"
                        value={price}
                        onChange={(e) => {
                          setPrice( e.target.value);
                        }}
                        // onFocus={(e) => setError({ ...error, name: "" })}
                        // onBlur={(e) => handleValidation("name")}
                      />
                    </div>
                  </div>
                )}

               {edit !== index ? (  <p>
                 <b>Quantity -</b> {item.quantity}
                </p>)
                : (
                  <div className="row">
                    <div className="col-md-3">
                      <label class="form-label" htmlFor="form1Example1">
                        <b>Quantity-</b>
                      </label>
                    </div>
                    <div className="col-md-8 pb-1">
                      <input
                        type="text"
                        id="name"
                        class="form-control"
                        value={quantity}
                        onChange={(e) => {
                          setQuantity( e.target.value);
                        }}
                        // onFocus={(e) => setError({ ...error, name: "" })}
                        // onBlur={(e) => handleValidation("name")}
                      />
                    </div>
                  </div>
                )}
               {edit !== index ? (  <p>
                  <b>Description -</b> {item.description}
                </p>)
                : (
                  <div className="row">
                    <div className="col-md-3">
                      <label class="form-label" htmlFor="form1Example1">
                        <b>Description-</b>
                      </label>
                    </div>
                    <div className="col-md-8">
                      <input
                        type="text"
                        id="name"
                        class="form-control"
                        value={description}
                        onChange={(e) => {
                          setDescription(e.target.value);
                        }}
                        // onFocus={(e) => setError({ ...error, name: "" })}
                        // onBlur={(e) => handleValidation("name")}
                      />
                    </div>
                  </div>
                )}
                <div className="text-center">
                  {edit !== index ? (
                    <button
                      className="btn btn-primary btn-sm m-2"
                      onClick={() => handleEdit(item,index)}
                    >
                      Edit
                    </button>
                  ) : (
                    <button
                      className="btn btn-danger btn-sm m-2"
                      onClick={() => handleSave(index)}
                    >
                      Save
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))
        :
        <h1 className="text-center">
          No matched products</h1>
          }
      </div>
    </div>
  );
};

export default Home;
