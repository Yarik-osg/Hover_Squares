import React, {useEffect, useState} from "react";
import {SmallSquare} from "../SmallSquare/smallSquare";

interface BigSquareProps {
    fieldCount: string;
    smallSquareSize: number;
    onSquareHover: (row: number, column: number) => void;
}
///The file contains a component that displays a large square
// that contains all the small squares that you can hover over
export const BigSquare: React.FC<BigSquareProps> = ({fieldCount, smallSquareSize, onSquareHover}) => {
    const [squareColors, setSquareColors] = useState<string[]>(
        Array.from({length: Number(fieldCount) * Number(fieldCount)}).map(() => 'white')
    );

    const handleSquareHover = (index: number) => {//change color of square on hover
        const updatedColors = [...squareColors];
        updatedColors[index] = updatedColors[index] === 'white' ? 'blue' : 'white';
        setSquareColors(updatedColors);
        onSquareHover(Math.floor(index / Number(fieldCount)), index % Number(fieldCount));//save row and column of changed square
    };

    useEffect(() => setSquareColors(Array.from({length: Number(fieldCount) * Number(fieldCount)}).map(() => 'white')), [fieldCount]);//when change mode, clears squares

    return (
        <div
            style={{
                marginLeft: 10,
                display: 'grid',
                gridTemplateColumns: `repeat(${fieldCount}, ${smallSquareSize}px)`,
                gridTemplateRows: `repeat(${fieldCount}, ${smallSquareSize}px)`,
            }}
        >
            {Array.from({length: Number(fieldCount) * Number(fieldCount)}).map((_, index) => (
                <SmallSquare
                    key={index}
                    size={smallSquareSize}
                    onSquareHover={() => handleSquareHover(index)}
                    isHovered={squareColors[index] === 'blue'}
                />
            ))}
        </div>
    );
};