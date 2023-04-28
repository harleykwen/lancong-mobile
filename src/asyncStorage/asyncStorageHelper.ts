import AsyncStorage from '@react-native-async-storage/async-storage'

async function asyncStorageSaveitem(key: string, data: any) {
    await AsyncStorage.setItem(key, JSON.stringify(data))
    return
}

async function asyncStorageGetitem(key: string) {
    const data: any = await AsyncStorage.getItem(key)
    return JSON.parse(data)
}

async function asyncStorageDeleteitem(key: string) {
    await AsyncStorage.removeItem(key)
    return
}

export {
    asyncStorageSaveitem,
    asyncStorageGetitem,
    asyncStorageDeleteitem,
}