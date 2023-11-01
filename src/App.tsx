import React, {useEffect, useState} from 'react';
import {Button, Select, Typography} from 'antd';
import {BigSquare} from "./components/BigSquare/bigSquare";
import {getData} from "./components/Fetch/fetchData";

interface Options {
    label: string;
    value: string;
}

const App = () => {
    const [options, setOptions] = useState<Options[]>([]);
    const [selectedMode, setSelectedMode] = useState<string | null>(null);
    const [disabledButton, setDisabledButton] = useState<boolean>(true);
    const [selectedOption, setSelectedOption] = useState<string | null>(null);
    const [hoveredSquares, setHoveredSquares] = useState<{ row: number; column: number }[]>([]);

    const handleSquareHover = (row: number, column: number) => {//save row and column of changed square into array, or  if on hover again, delete it from array
        const squareIndex = hoveredSquares.findIndex((square) => square.row === row && square.column === column);
        const updatedSquares = squareIndex === -1 ? [...hoveredSquares, {
            row,
            column
        }] : [...hoveredSquares.slice(0, squareIndex), ...hoveredSquares.slice(squareIndex + 1)];
        setHoveredSquares(updatedSquares);
    };

    const handleSelect = (value: string) => {//changes when click select mode, button !disabled
        setSelectedOption(value);
        setDisabledButton(false)
    };
    const handleStart = () => {//changes when click start button, clears array of squares and clears hovered squares
        setSelectedMode(selectedOption);
        setHoveredSquares([]);
        setDisabledButton(true)
    };

    useEffect(() => {//get data from fetchData file
        getData()
            .then((options) => {
                setOptions(options);
            })
            .catch((error) => {
                console.error(error)
            });
    }, []);

    return (
        <div style={{display: 'flex', marginTop: 50, marginLeft: 50}}>
            <div style={{display: 'flex', flexDirection: 'column'}}>
                <div style={{display: 'flex', marginBottom: 50}}>
                    <Select
                        defaultValue="Pick mode"
                        style={{width: 150, marginRight: 10, marginLeft: 10}}
                        options={options}
                        onSelect={(value) => handleSelect(value)}
                    />
                    <Button type="primary" disabled={disabledButton} onClick={handleStart}>
                        Start
                    </Button>
                </div>
                {selectedMode && (
                    <BigSquare
                        fieldCount={selectedMode}
                        smallSquareSize={selectedMode > "50" ? 10 : 30}
                        onSquareHover={handleSquareHover}
                    />
                )}
            </div>
            <div style={{marginLeft: 25, marginTop: "-5px"}}>
                <Typography.Title level={2} style={{marginTop: 0}}>Hover Squares</Typography.Title>
                {hoveredSquares.map((square, index) => (
                    <div key={index} style={{
                        backgroundColor: "#fcf4d7",
                        color: "#806000",
                        height: 60,
                        width: 190,
                        borderRadius: "5%",
                        marginBottom: 10,
                        paddingLeft: 10,
                        display: "flex",
                        alignItems: "center"
                    }}>
                        row {square.row + 1} col {square.column + 1}
                    </div>
                ))}
            </div>
        </div>
    );
}

export default App;
