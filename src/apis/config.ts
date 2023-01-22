import axios from "axios";
import AsyncStorage from '@react-native-async-storage/async-storage';

const xhr = axios.create({
    baseURL:
        'https://api-dev.lancong.co.id' +
        '/v1'
})

async function saveAuthToken(token: string) {
    try {
        await AsyncStorage.setItem('@auth_token', token)
    } catch (error) {
        throw 'Error save auth token'
    }
}

async function getAuthToken() {
    try {
        const token = await AsyncStorage.getItem('@auth_token')
        return token
    } catch (error) {
        throw 'Error get auth token'
    }
}

async function removeAuthToken() {
    try {
        await AsyncStorage.removeItem('@auth_token')
    } catch (error) {
        throw 'Error remove auth token'
    }
}

async function saveUserData(data: string) {
    try {
        await AsyncStorage.setItem('@user_data', JSON.stringify(data))
    } catch (error) {
        throw 'Error save user data'
    }
}

async function getUserData() {
    try {
        const user: any = await AsyncStorage.getItem('@user_data')
        return JSON.parse(user)
    } catch (error) {
        throw 'Error get user data'
    }
}

async function removeUserData() {
    try {
        await AsyncStorage.removeItem('@user_data')
    } catch (error) {
        throw 'Error remove user data'
    }
}

export { xhr, saveAuthToken, getAuthToken, removeAuthToken, saveUserData, getUserData, removeUserData }