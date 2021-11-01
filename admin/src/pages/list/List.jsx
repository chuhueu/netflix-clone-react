import { Link, useLocation } from "react-router-dom";
import { useState, useContext } from "react";
import { ListContext } from "../../context/listContext/ListContext";
import { updateList } from "../../context/listContext/apiCalls";
import "./list.css";
//import { Publish } from "@material-ui/icons";

export default function List() {
    const location = useLocation();
    const getList = location.list;
    const [list, setList] = useState(getList);
    const { dispatch } = useContext(ListContext);
    const handleChange = (e) => {
        const value = e.target.value;
        setList({...list, [e.target.name]: value});
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        updateList(list._id, dispatch, list);
        alert("Edit successfully");
    }
    return (
        <div className="product">
            <div className="productTitleContainer">
                <h1 className="productTitle">List</h1>
                <Link to="/newList">
                    <button className="productAddButton">Create</button>
                </Link>
            </div>
            <div className="productTop">
                <div className="productTopRight">
                    <div className="productInfoTop">
                        <span className="productName">{list.title}</span>
                    </div>
                    <div className="productInfoBottom">
                        <div className="productInfoItem">
                            <span className="productInfoKey">id:</span>
                            <span className="productInfoValue">{list._id}</span>
                        </div>
                        <div className="productInfoItem">
                            <span className="productInfoKey">genre:</span>
                            <span className="productInfoValue">{list.genre}</span>
                        </div>
                        <div className="productInfoItem">
                            <span className="productInfoKey">type:</span>
                            <span className="productInfoValue">{list.type}</span>
                        </div>
                    </div>
                </div>
            </div>
            <div className="productBottom">
                <form className="productForm">
                    <div className="productFormLeft">
                        <label>List Title</label>
                        <input type="text" name="title" value={list.title} onChange={handleChange}/>
                        <label>Type</label>
                        <input type="text" name="type" value={list.type} onChange={handleChange}/>
                        <label>Genre</label>
                        <input type="text" name="genre" value={list.genre} onChange={handleChange}/>
                        <label>Content</label>
                        {/* <textarea
                            //type="text"
                            name="content"
                            value={list.content.map((item) => (
                                 item + "  "
                            ))}
                            onChange={handleChange}
                            className="area"
                        /> */}
                    </div>
                    <div className="productFormRight">
                        <button className="productButton" onClick={handleSubmit}>Update</button>
                    </div>
                </form>
            </div>
        </div>
    );
}
