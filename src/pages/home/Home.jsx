import React, { useState, useEffect } from 'react';
import './home.scss';
import Navbar from '../../components/navbar/Navbar';
import Featured from '../../components/featured/Featured';
import List from '../../components/list/List';
import Footer from '../../components/footer/Footer';
import axios from "axios";
const Home = ({ type }) => {
    const [lists, setLists] = useState([]);
    const [genre, setGenre] = useState(null);
    const user = JSON.parse(localStorage.getItem("user"));

    // let date1 = new Date(user.createdAt);
    // let date2 = new Date(new Date().toISOString());

    // function getDifferenceInDays(date1, date2) {
    //     const diffInMs = Math.abs(date2 - date1);
    //     return diffInMs / (1000 * 60 * 60 * 24);
    // }
    // let check = getDifferenceInDays(date2, date1);
    // useEffect(() => {
    //     if (check > 5) {
    //         alert("Tài khoản của bạn đã quá 5 ngày dùng thử! Vui lòng thanh toán để sử dụng");
    //     } else {
    //         alert("Tài khoản bạn có 5 ngày dùng thử miễn phí dịch vụ");
    //     }
    // }, [check])

    useEffect(() => {
        const getRandomLists = async () => {
            try {
                const res = await axios.get(`lists${type ? "?type=" + type : ""}${genre ? "&genre=" + genre : ""}`);
                setLists(res.data);
                // console.log(res.data);
            } catch (error) {
                console.log(error);
            }
        }
        getRandomLists();
    }, [type, genre])

    return (
        <div className="home">
            <Navbar />
            <Featured type={type} setGenre={setGenre} />
            {lists.map((list) => (
                <List list={list} key={list._id} />
            ))}
            <Footer />
        </div>
    )
}

export default Home
