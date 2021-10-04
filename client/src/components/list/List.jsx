import { ArrowBackIosOutlined, ArrowForwardIosOutlined } from '@material-ui/icons';
import React, {useState, useRef, useEffect} from 'react';
import axios from 'axios';
import ListItem from '../listitem/Listitem'
import MyList from '../../pages/myList/MyList';
import './list.scss';
const List = ({list}) => {
    const [isMove, setIsMovie] = useState(false);
    const [myList, setMyList] = useState([]);
    const [slideNumber, setSlideNumber] = useState(0);
    const [clickLimit, setClickLimit] = useState(window.innerWidth / 230);
    //useRef hook là một hàm trả về một đối tượng ref có thể thay đổi có thuộc tính. .current được khởi tạo cho đối số được truyền vào (initialValue). Đối tượng trả về sẽ tồn tại trong toàn bộ thời gian tồn tại của thành phần.
    const listRef = useRef();
    const handleClick = (direction) => {
        setIsMovie(true);
        let distance = listRef.current.getBoundingClientRect().x - 50;
        if(direction === "left" && slideNumber > 0){
            setSlideNumber(slideNumber - 1);
            listRef.current.style.transform = `translateX(${230 + distance}px)`;
        }
        if(direction === "right" && slideNumber < 10 - clickLimit){
            setSlideNumber(slideNumber + 1);
            listRef.current.style.transform = `translateX(${-230 + distance}px)`;
        }
    };
    //up My List to LocalStorage
    const saveToLocalStorage = (items) => {
        localStorage.setItem('my-list', JSON.stringify(items));
    };

    const addMyList = (movie) => {
        const newMyList = [...myList, movie];
        setMyList(newMyList);
        console.log(newMyList);
        saveToLocalStorage(newMyList);
    };

    const removeMyList = (movie) => {
        const newMyList = myList.filter(
            (list) => list._id !== movie._id
        );
        setMyList(newMyList);
        saveToLocalStorage(newMyList);
    };

    //Upload myList to database
    /*const addMyList1 = async (movie) => {
        const newMyList = [...myList, movie];
        setMyList(newMyList);
         try {
            await axios.put("/lists/6155428e1e9f5b4580bb95fd" , {
                headers: {
                    token:
                    "Bearer "+JSON.parse(localStorage.getItem("user")).accessToken,
                  },
                content: newMyList.map((item) => item._id)
            })
         } catch (error) {
             console.log(error);
         }
    }
    const removeMyList1 = async (movie) => {
        const newMyList = myList.filter(
            (list) => list._id !== movie._id
        );
        setMyList(newMyList);
        try {
            await axios.put("/lists/6155428e1e9f5b4580bb95fd" , {
                headers: {
                    token:
                    "Bearer "+JSON.parse(localStorage.getItem("user")).accessToken,
                  },
                content: newMyList
            })
        } catch (error) {
            console.log(error);
        }
    }*/
    return (
        <div className="list">
            <span className="listTitle">{list.title}</span>
            <div className="wrapper">
                <ArrowBackIosOutlined className="sliderArrow left" onClick = {() => handleClick("left")} style={{display: !isMove && "none"}}/>
                <div className="container" ref={listRef} key={list._id}>
                   {list.content.map((item, i) => (
                        <ListItem
                            index={i}
                            item={item}
                            addMyListClick = {addMyList}
                            removeMyListClick = {removeMyList}
                        />
                   ))}
                </div>
                <ArrowForwardIosOutlined   className="sliderArrow right" onClick = {() => handleClick("right")}/>
            </div>
        </div>
    )
}

export default List;
