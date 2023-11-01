import React from "react";

interface SquareProps {
    size: number;
    onSquareHover: () => void;
    isHovered: boolean;
}
//The file contains a component that displays small squares that you can hover over
export const SmallSquare: React.FC<SquareProps> = ({size, onSquareHover, isHovered}) => {
    return (
        <div
            style={{
                width: `${size}px`,
                height: `${size}px`,
                backgroundColor: isHovered ? '#1aa3ff' : 'white',
                border: '1px solid black',
            }}
            onMouseEnter={onSquareHover}
        />
    );
};
