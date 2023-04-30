import i18n from 'i18next'
import * as RNLocalize from 'react-native-localize'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { initReactI18next } from 'react-i18next'

import en from './en'
import id from './id'
import { ASYNC_STORAGE_NAME } from '../asyncStorage/asyncStorageName'

const LANGUAGES = {
    en,
    id,
}

const LANG_CODES = Object.keys(LANGUAGES)

const LANGUAGE_DETECTOR: any = {
    type: 'languageDetector',
    async: true,
    detect: (callback: any) => {
        AsyncStorage.getItem(ASYNC_STORAGE_NAME.APP_LANGUAGE, (err, language) => {
            // if error fetching stored data or no language was stored
            // display errors when in DEV mode as console statements
            if (err || !language) {
                if (err) {
                    console.log('Error fetching Languages from asyncstorage ', err)
                } else {
                    console.log('No language is set, choosing English as fallback')
                }
                const findBestAvailableLanguage: any = RNLocalize.findBestAvailableLanguage(LANG_CODES)

                callback(findBestAvailableLanguage.languageTag || 'id')
                return
            }
            callback(language)
        })
    },
    init: () => { },
    cacheUserLanguage: (language: any) => {
        AsyncStorage.setItem(ASYNC_STORAGE_NAME.APP_LANGUAGE, language)
    }
}

i18n
    // detect language
    .use(LANGUAGE_DETECTOR)
    // pass the i18n instance to react-i18next.
    .use(initReactI18next)
    // set options
    .init({
        compatibilityJSON: 'v3',
        resources: LANGUAGES,
        react: {
            useSuspense: false
        },
        interpolation: {
            escapeValue: false
        },
        defaultNS: 'common'
    })