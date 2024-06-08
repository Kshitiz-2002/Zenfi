import Dropdown from '@/components/Dropdown';
import RoundBtn from '@/components/RoundBtn';
import Colors from '@/constants/Colors';
import React from 'react';
import { ScrollView, View, Text, StyleSheet, Button } from 'react-native';

const Page = () => {
    const balance = 1420;

    const onAddMoney = () =>{}

    return (
        <ScrollView style={{ backgroundColor: Colors.background }}>
            <View style={styles.account}>
                <View style={styles.row}>
                    <Text style={styles.balance}>{balance}</Text>
                    <Text style={styles.currency}>€</Text>
                </View>
            </View>
            <View style={styles.actionRow}>
            <RoundBtn icon={'add'} text={'Add money'} onPress={onAddMoney} />
            <RoundBtn icon={'refresh'} text={'Exchange'} onPress={onAddMoney} />
            <RoundBtn icon={'list'} text={'Details'} onPress={onAddMoney} />
            <Dropdown />
            </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    account: {
        margin: 80,
        alignItems: 'center'
    },
    row: {
        flexDirection: 'row',
        alignItems: 'flex-end',
        justifyContent: 'center',
        gap: 10,
    },
    balance: {
        fontSize: 50,
        fontWeight: 'bold',
    },
    currency: {
        fontSize: 20,
        fontWeight: '500',
    },
    actionRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 20,
    },
    transactions: {
        marginHorizontal: 20,
        padding: 14,
        backgroundColor: '#fff',
        borderRadius: 16,
        gap: 20,
    },
    circle: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: Colors.lightGray,
        justifyContent: 'center',
        alignItems: 'center',
    },
})

export default Page