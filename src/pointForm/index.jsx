import { InputNumber } from 'antd';
import React from "react";
import { generateRandomPoints } from '../Logic/CMeans';

const PointForm = ({ name, action }) => {

    const [x, setX] = React.useState(0);
    const [y, setY] = React.useState(0);

    const onClick = () => {
        const punto = [{ x, y }];
        action(punto);

        setX(0);
        setY(0);
    }

    const onRandom = () => {
        const punto = generateRandomPoints(1);
        action(punto);
    }

    return (
        <div className='point-form'>
            <h2>{name}</h2>
            <div className='point-inputs'>
                <span>X: <InputNumber defaultValue={0} value={x} onChange={(value) => setX(value || 0)} /></span>
                <span>Y: <InputNumber defaultValue={0} value={y} onChange={(value) => setY(value || 0)} /></span>
            </div>
            <div className='point-buttons'>
                <button onClick={onClick} className='button-13'>Add {name}</button>
                <button onClick={onRandom} className='button-13'>Add random {name}</button>
            </div>
        </div>
    );
}

export { PointForm };
