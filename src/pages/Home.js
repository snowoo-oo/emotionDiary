import React, { useEffect, useState, useContext } from 'react'
import MyHeader from './../components/MyHeader';
import MyButton from './../components/MyButton';
import { DiaryStateContext } from './../App';
import DiaryList from '../components/DiaryList';

function Home() {
    //data
    const [data, setData] = useState([]);
    const diaryList = useContext(DiaryStateContext)

    //날짜 state
    const [curDate, setCurDate] = useState(new Date());
    const headText = `${curDate.getFullYear()}년 ${curDate.getMonth() + 1}월`

    useEffect(() => {
        if (diaryList.length >= 1) {
            const firstDay = new Date(curDate.getFullYear(), curDate.getMonth(), 1).getTime();
            const lastDay = new Date(curDate.getFullYear(), curDate.getMonth() + 1, 0).getTime();

            setData(diaryList.filter((it) => it.date >= firstDay && it.date <= lastDay));
        }
    }, [diaryList, curDate])

    const increaseMonth = () => {
        setCurDate(new Date(curDate.getFullYear(), curDate.getMonth() + 1, curDate.getDate()));
    }

    const decreaseMonth = () => {
        setCurDate(new Date(curDate.getFullYear(), curDate.getMonth() - 1, curDate.getDate()));
    }

    useEffect(() => {
        console.log(data);
    }, [data])

    return (
        <div>
            <MyHeader
                headText={headText}
                leftChild={<MyButton text={'<'} onClick={decreaseMonth} />}
                rightChild={<MyButton text={'>'} onClick={increaseMonth} />}
            />
            <DiaryList diaryList={diaryList} />
        </div>
    )
}

export default Home