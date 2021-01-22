import React, { createRef } from 'react'
import { StyleSheet, View, I18nManager, Animated, TouchableOpacity } from 'react-native'
import { RectButton,  } from 'react-native-gesture-handler';
import { Layout, Text } from '@ui-kitten/components'
import { Ionicons, AntDesign, FontAwesome, Feather } from '@expo/vector-icons';
import Swipeable from 'react-native-gesture-handler/Swipeable';

const CategoryItem = ({ item, onNavigateDetail, onDeleteHandler, editListHandler }) => {
    const scrollRef = createRef()

    // const renderLeftActions = () => {
    //     return (
    //         <>
    //         </>
    //     )
    // }

    const renderRightActions = (progress) => {
        const renderMoreAction = (text, color, x, progress) => {
            const trans = progress.interpolate({
                inputRange: [0, 1],
                outputRange: [x, 0],
            });
            const pressHandler = () => {
                onNavigateDetail(item._id)
            };
            return (
                <Animated.View style={{ flex: 1, transform: [{ translateX: trans }] }}>
                    <TouchableOpacity
                        style={[styles.rightAction, { backgroundColor: color }]}
                        onPress={pressHandler}>
                        <Text style={styles.actionText}>{text}</Text>
                    </TouchableOpacity>
                </Animated.View>
            );
        }

        const renderDelAction = (text, color, x, progress) => {
            const trans = progress.interpolate({
                inputRange: [0, 1],
                outputRange: [x, 0],
            });
            const pressHandler = () => {
                onDeleteHandler(item._id)
            };
            return (
                <Animated.View style={{ flex: 1, transform: [{ translateX: trans }] }}>
                    <RectButton
                        style={[styles.rightAction, { backgroundColor: color }]}
                        onPress={pressHandler}>
                        <Text style={styles.actionText}>{text}</Text>
                    </RectButton>
                </Animated.View>
            );
        }

        return (
            <View style={{ width: 192, flexDirection: I18nManager.isRTL ? 'row-reverse' : 'row' }}>
                {renderMoreAction('More', '#65AEE0', 192, progress)}
                {renderDelAction('Delete', '#EE001D', 128, progress)}
            </View>
        )
    }


    return (
        <Swipeable
            ref={scrollRef}
            friction={2}
            leftThreshold={40}
            // rightThreshold={40}
            // renderLeftActions={renderLeftActions}
            renderRightActions={renderRightActions}
        >
            <TouchableOpacity
                onPress={()=>onNavigateDetail(item._id)}
            >
            <Layout style={[styles.container, styles.shadowContainer]}>
                <View style={{ flexDirection: 'row' }}>
                    <View style={{ flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center' }}>
                        <Feather name="list" size={24} />
                        <View style={{ paddingHorizontal: 12 }}>
                            <Text category="h6">{item.name}</Text>
                        </View>
                    </View>

                </View>
            </Layout>
            </TouchableOpacity>
        </Swipeable>
    )
}

export default CategoryItem

const styles = StyleSheet.create({
    container: {
        marginVertical: 5,
        marginHorizontal:3,
        paddingVertical: 15,
        paddingHorizontal: 10,
        borderRadius: 5,
        flex: 1
    },
    actionText: {
        color: 'white',
        fontSize: 16,
        backgroundColor: 'transparent',
        // padding: 10,
    },
    rightAction: {
        marginVertical: 5,
        paddingVertical: 15,
        paddingHorizontal: 10,
        borderRadius: 5,
        alignItems: 'center',
        flex: 1,
        justifyContent: 'center',
    },
    shadowContainer: {
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.22,
        shadowRadius: 2.22,

        elevation: 3,
    }
})
