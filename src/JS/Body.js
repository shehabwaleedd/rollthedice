import React, { useState } from "react";

export default function Body() {
    const images = [
        "dice-01.svg",
        "dice-02.svg",
        "dice-03.svg",
        "dice-04.svg",
        "dice-05.svg",
        "dice-06.svg"
    ];

    const [dieOneValue, setDieOneValue] = useState(1);
    const [dieTwoValue, setDieTwoValue] = useState(1);
    const [count, setCount] = useState(0);
    const [balance, setBalance] = useState(100);
    const [stake, setStake] = useState(0);
    const [selectedOption, setSelectedOption] = useState("");
    const [announcement, setAnnouncement] = useState("");

    const generateRandomNumber = () => {
        const array = new Uint8Array(1);
        window.crypto.getRandomValues(array);
        return array[0] % 6 + 1;
    };

    const rollDice = () => {
        const newDieOneValue = generateRandomNumber();
        const newDieTwoValue = generateRandomNumber();
        const newCount = newDieOneValue + newDieTwoValue;
    
        setDieOneValue(newDieOneValue);
        setDieTwoValue(newDieTwoValue);
        setCount(newCount);
    
        const selectedNumber = parseInt(selectedOption);
    
        if (
            (selectedOption === "lower" && newCount < 7) ||
            (selectedOption === "equal" && newCount === 7) ||
            (selectedOption === "higher" && newCount > 7)
        ) {
            // User wins
            let multiplier;
            if (selectedNumber === 7) {
                multiplier = 5.6;
            } else {
                multiplier = 2.2;
            }
            const winnings = (stake * multiplier).toFixed(2);
            setBalance(prevBalance => prevBalance + parseFloat(winnings));
            setAnnouncement(`Congratulations! You won ${winnings} EGP`);
        } else {
            // User loses
            setBalance(prevBalance => prevBalance - stake);
            setAnnouncement("Oops! You lost.");
        }
    };

    const handleOptionChange = event => {
        setSelectedOption(event.target.value);
    };

    const handleStakeChange = event => {
        const newStake = parseInt(event.target.value);
        setStake(newStake);
    };

    const handleRollClick = () => {
        if (stake > balance) {
            alert("Insufficient balance. Please lower your stake.");
        } else if (stake <= 0) {
            alert("Invalid stake amount. Please enter a positive value.");
        } else if (!selectedOption) {
            alert("Please select an option before rolling the dice.");
        } else {
            rollDice();
        }
    };

    return (
        <div className="main">
            <div className="header">

                <a href="home" id="Balance">
                    BALANCE: {balance} EGP
                </a>
                <a href="home" id="Stake">
                    STAKE: {stake} EGP
                </a>
            </div>
            <div className="container">
                <h1 id="announcement">{announcement}</h1>
                <div className="dice-wrapper">
                    <img id="die-1" alt="" src={images[dieOneValue - 1]} />
                    <img id="die-2" alt="" src={images[dieTwoValue - 1]} />
                </div>
                <p id="total">Your roll is {count}</p>
                <div className="odds-bets">
                    <label>
                        <input
                            type="radio"
                            value="7"
                            checked={selectedOption === "7"}
                            onChange={handleOptionChange}
                        />
                        <h1>Equal to 7 (5.6x)</h1>
                    </label>
                    <label>
                        <input type="radio" value="lower" checked={selectedOption === "lower"} onChange={handleOptionChange} />
                        <h1>Lower than 7 (2.2x)</h1>
                    </label>
                    <label>
                        <input type="radio" value="higher" checked={selectedOption === "higher"} onChange={handleOptionChange} />
                        <h1>Higher than 7 (2.2x)</h1>
                    </label>
                </div>
                <div className="formInput">
                    <div className="formText">
                        <input type="number" value={stake} onChange={handleStakeChange} placeholder="Enter your stake" min="0" />
                    </div>
                </div>
                <br />
                <button className="Roll" onClick={handleRollClick}>
                    ROLL THE DICE
                </button>
            </div>
        </div>
    );
}
