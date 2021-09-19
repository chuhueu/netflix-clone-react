import { ArrowBackIosOutlined, ArrowForwardIosOutlined } from '@material-ui/icons';
import React, {useState, useRef} from 'react';
import ListItem from '../listitem/Listitem'
import './list.scss';
const List = ({list}) => {
    const [isMove, setIsMovie] = useState(false);
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
    }
    return (
        <div className="list">
            <span className="listTitle">{list.title}</span>
            <div className="wrapper">
                <ArrowBackIosOutlined className="sliderArrow left" onClick = {() => handleClick("left")} style={{display: !isMove && "none"}}/>
                <div className="container" ref={listRef}>
                   {list.content.map((item, i) => (
                        <ListItem index={i} item={item} />
                   ))}
                </div>
                <ArrowForwardIosOutlined   className="sliderArrow right" onClick = {() => handleClick("right")}/>
            </div>
        </div>
    )
}

export default List;
