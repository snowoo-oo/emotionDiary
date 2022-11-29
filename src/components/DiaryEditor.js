import React, { useState, useRef } from 'react'
import MyHeader from './MyHeader';
import MyButton from './MyButton';
import { useNavigate } from 'react-router-dom';
import EmotionItem from './EmotionItem';

const getStringDate = (date) => {
    return date.toISOString().slice(0, 10);
}

function DiaryEditor() {
    const contentRef = useRef();
    const [content, setContent] = useState("");
    const [emotion, setEmotion] = useState(3);
    const [date, setDate] = useState(getStringDate(new Date()));
    const naviate = useNavigate();

    const handleClickEmotion = (emotion) => {
        setEmotion(emotion);
    }
    const goBack = () => {
        naviate(-1);
    }

    const emotionList = [
        {
            emotion_id: 1,
            emotion_img: process.env.PUBLIC_URL + `/assets/emotion1.png`,
            emotion_descript: '완전 좋음'
        }, {
            emotion_id: 2,
            emotion_img: process.env.PUBLIC_URL + `/assets/emotion2.png`,
            emotion_descript: '좋음'
        }, {
            emotion_id: 3,
            emotion_img: process.env.PUBLIC_URL + `/assets/emotion3.png`,
            emotion_descript: '보통'
        }, {
            emotion_id: 4,
            emotion_img: process.env.PUBLIC_URL + `/assets/emotion4.png`,
            emotion_descript: '나쁨'
        }, {
            emotion_id: 5,
            emotion_img: process.env.PUBLIC_URL + `/assets/emotion5.png`,
            emotion_descript: '완전 나쁨'
        }
    ]

    const handleSubmit = () => {
        if (content.length < 1) {
            contentRef.current.focus();
        }
    }

    return (
        <div className="DiaryEditor">
            <MyHeader
                headText={"새 일기쓰기"}
                leftChild={<MyButton text={"뒤로가기"} onClick={goBack} />}
            />
            <div>
                <section>
                    <h4>오늘은 언제인가요?</h4>
                    <div className='input_box'>
                        <input
                            className='input_date'
                            value={date}
                            type="date"
                            onChange={(e) => setDate(e.target.value)} />
                    </div>
                </section>
                <section>
                    <h4>오늘의 감정</h4>
                    <div className='input_box emotion_list_wrapper'>
                        {emotionList.map((it) => (
                            <EmotionItem
                                key={it.emotion_id}
                                {...it}
                                onClick={handleClickEmotion}
                                isSelected={it.emotion_id === emotion}
                            />
                        ))}
                    </div>
                </section>
                <section>
                    <h4>오늘의 일기</h4>
                    <div className='input_box text_wrapper'>
                        <textarea
                            ref={contentRef}
                            value={content}
                            onChange={(e) => setContent(e.target.value)}
                            placeholder="오늘은 어땟나요?"
                        />
                    </div>
                </section>
                <section>
                    <div className='control_box'>
                        <MyButton text={"취소하기"} onClick={() => naviate(-1)} />
                        <MyButton text={"작성완료"} type={"positive"} onClick={handleSubmit} />
                    </div>
                </section>
            </div>
        </div>
    )
}

export default DiaryEditor