import { useRouter } from 'expo-router';
import { View } from 'react-native';
import { Pressable, TextInput, Text } from 'react-native-gesture-handler';
import { Platform, StyleSheet } from 'react-native';

import React, { useState } from "react";

function App() {
    const [
        selectedValue,
        setSelectedValue,
    ] = useState("option1");

    const handleRadioChange = (
        value
    ) => {
        setSelectedValue(value);
    };

    const styles = {
        container: {
            display: "flex",
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
        },
        heading: {
            color: "green",
            textAlign: "center",
        },
        radioGroup: {
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent:
                "space-around",
            marginTop: "20px",
            borderRadius: "8px",
            backgroundColor: "white",
            padding: "30px",
            boxShadow:
                "0px 2px 3.84px rgba(0, 0, 0, 0.25)",
        },
        radioButton: {
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
        },
        radioLabel: {
            marginLeft: "8px",
            fontSize: "17px",
            color: "#333",
        },
    };

    return (
        <div>
            <h1 style={styles.heading}>
                What is the capitol of California?
            </h1>
            <div
                style={styles.container}
            >
                <div
                    style={
                        styles.radioGroup
                    }
                >
                    <div
                        style={
                            styles.radioButton
                        }
                    >
                        <input
                            type="radio"
                            id="option1"
                            value="option1"
                            checked={
                                selectedValue ===
                                "option1"
                            }
                            onChange={() =>
                                handleRadioChange(
                                    "option1"
                                )
                            }
                        />
                        <label
                            htmlFor="option1"
                            style={
                                styles.radioLabel
                            }
                        >
                            San Jose
                        </label>
                    </div>

                    <div
                        style={
                            styles.radioButton
                        }
                    >
                        <input
                            type="radio"
                            id="option2"
                            value="option2"
                            checked={
                                selectedValue ===
                                "option2"
                            }
                            onChange={() =>
                                handleRadioChange(
                                    "option2"
                                )
                            }
                        />
                        <label
                            htmlFor="option2"
                            style={
                                styles.radioLabel
                            }
                        >
                            San Diego
                        </label>
                    </div>

                    <div
                        style={
                            styles.radioButton
                        }
                    >
                        <input
                            type="radio"
                            id="option3"
                            value="option3"
                            checked={
                                selectedValue ===
                                "option3"
                            }
                            onChange={() =>
                                handleRadioChange(
                                    "option3"
                                )
                            }
                        />
                        <label
                            htmlFor="option3"
                            style={
                                styles.radioLabel
                            }
                        >
                            San Francisco
                        </label>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default App;