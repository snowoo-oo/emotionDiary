import React from 'react'
import { useSearchParams, useNavigate } from 'react-router-dom';

function Edit() {
    const navigate = useNavigate();
    const [searchParams, setSearchParams] = useSearchParams();
    const id = searchParams.get('id');
    const mode = searchParams.get('mode');

    console.log(`id : ${id} -- mode : ${mode}`)
    return (
        <div>
            Edit
            <button onClick={() => setSearchParams({ who: 'abcde' })}>change</button>
            <button onClick={() => navigate('/home')}>home</button>
            <button onClick={() => navigate(-1)}>뒤로가기</button>
        </div>
    )
}

export default Edit