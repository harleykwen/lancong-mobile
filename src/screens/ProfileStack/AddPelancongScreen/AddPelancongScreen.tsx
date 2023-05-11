import React, { useCallback, useState } from 'react'
import DateTimePickerModal from 'react-native-modal-datetime-picker'
import { ActionSheetUploadMedia } from '../../../components'
import { format } from 'date-fns'
import { useMutation } from 'react-query'
import { AddPelancongApi } from '../../../apis/pelancong'
import { launchCamera, launchImageLibrary } from 'react-native-image-picker'
import { 
    IC_ARROW_BACK, 
    IC_ARROW_DROP_DOWN, 
    IC_CALENDAR_MONTH, 
} from '../../../assets'
import { 
    Button,
    Flex, 
    Image, 
    Input, 
    Pressable, 
    ScrollView, 
    Select, 
    Stack, 
    Text,
    useDisclose, 
} from 'native-base'

interface IAddPelancongScreen {
    navigation: any
    route: any
}

const AddPelancongScreen = (props: IAddPelancongScreen) => {
    const { navigation, route } = props
    const { callbackSuccess } = route.params
    const actionSheetUploadIdCard = useDisclose()

    const [name, setName] = useState<string>('')
    const [email, setEmail] = useState<string>('')
    const [phone, setPhone] = useState<string>('')
    const [birthdate, setBirthdate] = useState<Date | string>('')
    const [citizenship, setCitizenship] = useState<string>('')
    const [id_number, setId_number] = useState<string>('')
    const [passport_number, setPassport_number] = useState<string>('')
    const [publication_date, setPublication_date] = useState<Date | string>('')
    const [expiration_date, setExpiration_date] = useState<Date | string>('')
    const [idCard, setIdCard] = useState<any>(null)

    const [showDatePickerBirthdate, setShowDatePickerBirthdate] = useState(false)
    const [showDatePickerPublicationDate, setShowDatePickerPublicationDate] = useState(false)
    const [showDatePickerExpirationDate, setShowDatePickerExpirationDate] = useState(false)

    const addPelancong = useMutation(AddPelancongApi, {
        onSuccess: function() {
            navigation?.goBack()
            callbackSuccess && callbackSuccess()
        }
    })

    const launchCameraUploadIdCard = useCallback(() => {
        launchCamera({ mediaType: 'photo', includeBase64: true }, (resultLaunchCamera: any) => {
            actionSheetUploadIdCard.onClose()
            if (resultLaunchCamera?.assets?.length > 0) {
                setIdCard(resultLaunchCamera.assets[0])
            }
        })
    }, [])

    const launchImageLibraryUploadIdCard = useCallback(() => {
        launchImageLibrary({ mediaType: 'photo', includeBase64: true }, (resultlaunchImageLibrary: any) => {
            actionSheetUploadIdCard.onClose()
            if (resultlaunchImageLibrary?.assets?.length > 0) {
                setIdCard(resultlaunchImageLibrary.assets[0])
            }
        })
    }, [])

    return (
        <Flex flex='1' backgroundColor='white'>
            <Stack 
                paddingY='16px'
                paddingX='24px'
                shadow='3' 
                backgroundColor='lancBackgroundLight'
                direction='row'
                alignItems='center'
                space='16px'
            >
                <Pressable onPress={() => navigation?.goBack()}>
                    <Image
                        alt='IC_ARROW_BACK'
                        source={IC_ARROW_BACK}
                        width='24px'
                        height='24px'
                        tintColor='lancOnBackgroundLight'
                    />
                </Pressable>
                <Text fontFamily='Poppins-SemiBold' fontSize='20px'>Tambah Data Pelancong</Text>
            </Stack>
            
            <ScrollView showsVerticalScrollIndicator={false}>
                <Stack space='8px' backgroundColor='gray.100'>
                    <Stack 
                        padding='24px' 
                        space='16px' 
                        backgroundColor='white'
                    >
                        <Text
                            fontFamily='Poppins-SemiBold' 
                            fontSize='15px'
                            color='gray.600'
                        >Informasi Pelancong</Text>
                        <Input 
                            placeholder='nama'
                            value={name}
                            onChangeText={(e: any) => setName(e)}
                        />
                        <Input 
                            placeholder='email'
                            value={email}
                            onChangeText={(e: any) => setEmail(e)}
                        />
                        <Input 
                            placeholder='no. telepon'
                            value={phone}
                            onChangeText={(e: any) => setPhone(e)}
                        />
                        <Pressable onPress={() => setShowDatePickerBirthdate(true)}>
                            <Input 
                                placeholder='tanggal lahir'
                                value={birthdate ? format(new Date(birthdate), 'dd MMMM yyyy') : ''}
                                isReadOnly
                                InputRightElement={
                                    <Image
                                        marginRight='16px'
                                        alt='IC_CALENDAR_MONTH'
                                        source={IC_CALENDAR_MONTH}
                                        width='24px'
                                        height='24px'
                                        tintColor='lancSurfaceLight'
                                    />
                                }
                            />
                        </Pressable>
                    </Stack>
                    <Stack 
                        padding='24px' 
                        space='16px' 
                        backgroundColor='white'
                    >
                        <Text
                            fontFamily='Poppins-SemiBold' 
                            fontSize='15px'
                            color='gray.600'
                        >Informasi Kewarganegaraan</Text>
                        <Select
                            placeholder='kewarganegaraan'
                            selectedValue={citizenship}
                            onValueChange={(e: any) => setCitizenship(e)}
                            dropdownIcon={
                                <Stack
                                    direction='row'
                                    width='full'
                                    position='absolute'
                                    top='0'
                                    bottom='0'
                                    alignItems='center'
                                    justifyContent='space-between'
                                >
                                    <Stack></Stack>
                                    <Image
                                        alt='IC_ARROW_DROPDOWN'
                                        source={IC_ARROW_DROP_DOWN}
                                        width='32px'
                                        height='32px'
                                        marginRight='16px'
                                        tintColor='lancSurfaceLight'
                                    />
                                </Stack>
                            } 
                        >
                            <Select.Item fontFamily='Poppins-Medium' label="Indonesia" value="Indonesia" />
                        </Select>
                        <Input 
                            placeholder='no. KTP'
                            value={id_number}
                            onChangeText={(e: any) => setId_number(e)}
                        />
                    </Stack>
                    <Stack 
                        padding='24px' 
                        space='16px' 
                        backgroundColor='white'
                    >
                        <Text
                            fontFamily='Poppins-SemiBold' 
                            fontSize='15px'
                            color='gray.600'
                        >Informasi Passport</Text>
                        <Input 
                            placeholder='no. passport'
                            value={passport_number}
                            onChangeText={(e: any) => setPassport_number(e)}
                        />
                        <Pressable onPress={() => setShowDatePickerPublicationDate(true)}>
                            <Input 
                                placeholder='tanggal penerbitan'
                                value={publication_date ? format(new Date(publication_date), 'dd MMMM yyyy') : ''}
                                isReadOnly
                                InputRightElement={
                                    <Image
                                        marginRight='16px'
                                        alt='IC_CALENDAR_MONTH'
                                        source={IC_CALENDAR_MONTH}
                                        width='24px'
                                        height='24px'
                                        tintColor='lancSurfaceLight'
                                    />
                                }
                            />
                        </Pressable>
                        <Pressable onPress={() => setShowDatePickerExpirationDate(true)}>
                            <Input 
                                placeholder='tanggal kadaluarsa'
                                value={expiration_date ? format(new Date(expiration_date), 'dd MMMM yyyy') : ''}
                                isReadOnly
                                InputRightElement={
                                    <Image
                                        marginRight='16px'
                                        alt='IC_CALENDAR_MONTH'
                                        source={IC_CALENDAR_MONTH}
                                        width='24px'
                                        height='24px'
                                        tintColor='lancSurfaceLight'
                                    />
                                }
                            />
                        </Pressable>
                    </Stack>
                    <Stack 
                        padding='24px' 
                        space='16px' 
                        backgroundColor='white'
                    >
                        <Text
                            fontFamily='Poppins-SemiBold' 
                            fontSize='15px'
                            color='gray.600'
                        >KTP / ID Card</Text>
                        { 
                            idCard && 
                            <Image 
                                source={{ uri: idCard?.uri }} 
                                alt='preview-id-card'
                                size='xl'
                                resizeMode='cover'
                                marginX='auto'
                            /> 
                        }
                        <Pressable 
                            backgroundColor='gray.200' 
                            padding='8px 4px' 
                            rounded='lg'
                            marginX='auto'
                            onPress={actionSheetUploadIdCard.onOpen}
                            _pressed={{
                                backgroundColor: 'gray.300'
                            }}
                        >
                            <Text fontSize='12px'>{ idCard ? 'Upload Ulang KTP / ID Card' : 'Upload KTP / ID Card' }</Text>
                        </Pressable>
                    </Stack>
                    <Stack 
                        padding='24px' 
                        space='16px' 
                        backgroundColor='white'
                    >
                        <Button 
                            isLoading={addPelancong?.isLoading}
                            onPress={() => {
                                addPelancong?.mutate({
                                    name,
                                    birthdate: typeof(birthdate) !== 'string' ? birthdate?.getTime() : '',
                                    email,
                                    phone,
                                    identity: {
                                        citizenship,
                                        id_number,
                                        id_card: {
                                            content: `data:${idCard?.type};base64,${idCard?.base64}`,
                                            filename: 'dummy-image'
                                        }
                                    },
                                    passport: {
                                        passport_number,
                                        publication_date: typeof(publication_date) !== 'string' ? publication_date?.getTime() : '',
                                        expiration_date: typeof(expiration_date) !== 'string' ? expiration_date?.getTime() : '',
                                    }
                                    
                                })
                            }}
                        >
                            Simpan
                        </Button>
                    </Stack>
                </Stack>
            </ScrollView>

            <DateTimePickerModal
                isVisible={showDatePickerBirthdate}
                mode="date"
                onConfirm={(e: any) => {
                    setBirthdate(e)
                    setShowDatePickerBirthdate(false)
                }}
                onCancel={() => setShowDatePickerBirthdate(false)}
                maximumDate={new Date()}
            />
            <DateTimePickerModal
                isVisible={showDatePickerPublicationDate}
                mode="date"
                onConfirm={(e: any) => {
                    setPublication_date(e)
                    setShowDatePickerPublicationDate(false)
                }}
                onCancel={() => setShowDatePickerPublicationDate(false)}
            />
            <DateTimePickerModal
                isVisible={showDatePickerExpirationDate}
                mode="date"
                onConfirm={(e: any) => {
                    setExpiration_date(e)
                    setShowDatePickerExpirationDate(false)
                }}
                onCancel={() => setShowDatePickerExpirationDate(false)}
            />

            <ActionSheetUploadMedia 
                isOpen={actionSheetUploadIdCard.isOpen} 
                onClose={actionSheetUploadIdCard.onClose} 
                launchCamera={launchCameraUploadIdCard}
                launchImageLibrary={launchImageLibraryUploadIdCard}
            />
        </Flex>
    )
}

export default AddPelancongScreen