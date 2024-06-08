import React, { useState, useRef } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Modal, Dimensions } from 'react-native';
import RoundBtn from './RoundBtn';
import { Ionicons } from '@expo/vector-icons';
import Animated, { useAnimatedStyle, withTiming } from 'react-native-reanimated';

const Dropdown = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [dropdownPosition, setDropdownPosition] = useState({ top: 0, left: 0 });
    const [pressedItem, setPressedItem] = useState<string | null>(null);
    const buttonRef = useRef<View>(null);

    const toggleDropdown = () => {
        if (!isOpen) {
            buttonRef.current?.measure((fx, fy, width, height, px, py) => {
                setDropdownPosition({ top: py + height + 10, left: px - 170 });
            });
        }
        setIsOpen(!isOpen);
    };

    const handlePressIn = (key: string) => {
        setPressedItem(key);
    };

    const handlePressOut = () => {
        setPressedItem(null);
    };

    const animatedDropdownStyle = useAnimatedStyle(() => ({
        transform: [
            {
                translateY: withTiming(isOpen ? 0 : -10, {
                    duration: 300,
                }),
            },
            {
                translateX: withTiming(isOpen ? 0 : 10, {
                    duration: 300,
                }),
            },
        ],
        opacity: withTiming(isOpen ? 1 : 0, { duration: 300 }),
    }));

    return (
        <View ref={buttonRef} style={styles.container}>
            <RoundBtn icon={'ellipsis-horizontal'} text={'More'} onPress={toggleDropdown} />

            {isOpen && (
                <Modal transparent={true} animationType="none" visible={isOpen} onRequestClose={toggleDropdown}>
                    <TouchableOpacity style={styles.overlay} onPress={toggleDropdown} activeOpacity={1}>
                        <Animated.View style={[styles.dropdown, dropdownPosition, animatedDropdownStyle]}>
                            {[
                                { key: 'statement', title: 'Statement', icon: "menu" },
                                { key: 'converter', title: 'Converter', icon: "refresh" },
                                { key: 'background', title: 'Background', icon: "image" },
                                { key: 'account', title: 'Add new account', icon: "add-circle" },
                            ].map((item, index, array) => {
                                const isFirst = index === 0;
                                const isLast = index === array.length - 1;
                                return (
                                    <TouchableOpacity
                                        key={item.key}
                                        style={[
                                            styles.dropdownItem,
                                            pressedItem === item.key && (isFirst ? styles.firstPressedItem : isLast ? styles.lastPressedItem : styles.pressedItem),
                                            isLast && styles.lastItem
                                        ]}
                                        onPressIn={() => handlePressIn(item.key)}
                                        onPressOut={handlePressOut}
                                    >
                                        <Text style={styles.itemText}>{item.title}</Text>
                                        <View style={styles.image}>
                                            <Ionicons name={item.icon} size={24} color="black" />
                                        </View>
                                    </TouchableOpacity>
                                );
                            })}
                        </Animated.View>
                    </TouchableOpacity>
                </Modal>
            )}
        </View>
    );
};


const styles = StyleSheet.create({
    container: {
        position: 'relative',
    },
    overlay: {
        flex: 1,
        backgroundColor: 'transparent',
    },
    dropdown: {
        position: 'absolute',
        width: 230,
        backgroundColor: 'white',
        borderRadius: 20,
        elevation: 5,
    },
    dropdownItem: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingVertical: 8,
        borderBottomWidth: 1,
        borderBottomColor: 'lightgray',
    },
    lastItem: {
        borderBottomWidth: 0,
    },
    itemText: {
        marginLeft: 10,
        fontSize: 17,
    },
    image: {
        paddingRight: 10,
    },
    pressedItem: {
        backgroundColor: 'gray',
    },
    firstPressedItem: {
        backgroundColor: 'gray',
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
    },
    lastPressedItem: {
        backgroundColor: 'gray',
        borderBottomLeftRadius: 20,
        borderBottomRightRadius: 20,
    },
});

export default Dropdown;
