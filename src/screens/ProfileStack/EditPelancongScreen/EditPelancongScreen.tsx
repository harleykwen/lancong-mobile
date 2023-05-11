import React, { useCallback, useState } from 'react'
import DateTimePickerModal from 'react-native-modal-datetime-picker'
import { format } from 'date-fns'
import { useMutation } from 'react-query'
import { updatePelancongApi } from '../../../apis/pelancong'
import { ROUTE_NAME } from '../../../router'
import { ActionSheetUploadMedia } from '../../../components'
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
    StatusBar, 
    Text,
    useDisclose, 
} from 'native-base'

interface IEditPelancongScreen {
    navigation?: any
    route?: any
}

const EditPelancongScreen: React.FC<IEditPelancongScreen> = (props: IEditPelancongScreen) => {
    const { navigation, route } = props
    const { data } = route?.params
    const actionSheetUploadIdCard = useDisclose()

    const [name, setName] = useState<string>(data?.name??'')
    const [email, setEmail] = useState<string>(data?.email??'')
    const [phone, setPhone] = useState<string>(data?.phone??'')
    const [birthdate, setBirthdate] = useState<Date | string>(data?.birthdate ? new Date(Number(data?.birthdate)) : '')
    const [citizenship, setCitizenship] = useState<string>(data?.identity?.citizenship??'')
    const [id_number, setId_number] = useState<string>(data?.identity?.id_number??'')
    const [passport_number, setPassport_number] = useState<string>(data?.passport?.passport_number??'')
    const [publication_date, setPublication_date] = useState<Date | string>(data?.passport?.publication_date ? new Date(Number(data?.passport?.publication_date)) : '')
    const [expiration_date, setExpiration_date] = useState<Date | string>(data?.passport?.expiration_date ? new Date(Number(data?.passport?.expiration_date)) : '')
    const [idCard, setIdCard] = useState<any>(data?.identity?.id_card??null)
    const [newIdCard, setNewIdCard] = useState<any>(null)

    const [showDatePickerBirthdate, setShowDatePickerBirthdate] = useState(false)
    const [showDatePickerPublicationDate, setShowDatePickerPublicationDate] = useState(false)
    const [showDatePickerExpirationDate, setShowDatePickerExpirationDate] = useState(false)

    const updatePelancong = useMutation(updatePelancongApi, {
        onSuccess: () => {
            navigation?.replace(ROUTE_NAME?.PROFILE_NAVIGATOR_PELANCONG_DATA)
        }
    })

    const launchCameraUploadIdCard = useCallback(() => {
        launchCamera({ mediaType: 'photo', includeBase64: true }, (resultLaunchCamera: any) => {
            actionSheetUploadIdCard.onClose()
            if (resultLaunchCamera?.assets?.length > 0) {
                setNewIdCard(resultLaunchCamera.assets[0])
                setIdCard(null)
            }
        })
    }, [])

    const launchImageLibraryUploadIdCard = useCallback(() => {
        launchImageLibrary({ mediaType: 'photo', includeBase64: true }, (resultlaunchImageLibrary: any) => {
            actionSheetUploadIdCard.onClose()
            if (resultlaunchImageLibrary?.assets?.length > 0) {
                setNewIdCard(resultlaunchImageLibrary.assets[0])
                setIdCard(null)
            }
        })
    }, [])

    return (
        <Flex flex='1' backgroundColor='white'>
            <StatusBar backgroundColor='white' barStyle='dark-content' />
            <Stack 
                direction='row' 
                paddingX='16px'
                paddingY='8px' 
                shadow='3' 
                backgroundColor='white'
                space='8px'
                alignItems='center'
            >
                <Pressable 
                    onPress={() => {
                        navigation?.goBack()
                    }}
                >
                    <Image
                        alt='IC_ARROW_BACK'
                        source={IC_ARROW_BACK}
                        width='24px'
                        height='24px'
                        tintColor='lancOnBackgroundLight'
                    />
                </Pressable>
                <Stack>
                    <Text fontSize='16px' fontFamily='Poppins-SemiBold'>Edit Pelancong</Text>
                </Stack>
            </Stack>
            <ScrollView showsVerticalScrollIndicator={false} marginTop='8px'>
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
                            idCard?.url && 
                            !newIdCard &&
                            <Image 
                                source={{ uri: idCard.url }} 
                                alt='preview-id-card'
                                size='xl'
                                resizeMode='cover'
                                marginX='auto'
                            /> 
                        }
                        { 
                            newIdCard && 
                            <Image 
                                source={{ uri: newIdCard?.uri }} 
                                alt='preview-id-card'
                                size='xl'
                                resizeMode='cover'
                                marginX='auto'
                            /> 
                        }
                        { 
                            !idCard?.url && 
                            !newIdCard &&
                            <Text color='gray.300' marginX='auto'>Belum upload KTP / ID Card</Text>
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
                            <Text fontSize='12px'>
                                { 
                                    idCard?.url || newIdCard
                                        ? 'Ganti KTP / ID Card' 
                                        : 'Upload KTP / ID Card' 
                                }
                            </Text>
                        </Pressable>
                        {
                            idCard || newIdCard
                                ?   <Pressable 
                                        backgroundColor='red.200' 
                                        padding='8px 4px' 
                                        rounded='lg'
                                        marginX='auto'
                                        onPress={() => {
                                            setIdCard(null)
                                            setNewIdCard(null)
                                        }}
                                        _pressed={{
                                            backgroundColor: 'red.300'
                                        }}
                                    >
                                        <Text fontSize='12px' color='red.600'>
                                            Hapus Foto KTP / ID Card
                                        </Text>
                                    </Pressable>
                                :   null
                        }
                    </Stack>
                    <Stack 
                        padding='24px' 
                        space='16px' 
                        backgroundColor='white'
                    >
                        <Button
                            isLoading={updatePelancong?.isLoading}
                            onPress={() => {
                                let filename: any
                                let content: any

                                if (idCard && !newIdCard) {
                                    filename = idCard?.identity?.id_card?.name
                                    content = idCard?.identity?.id_card?.url
                                } else if (!idCard && newIdCard) {
                                    content = `data:${newIdCard?.type};base64,${newIdCard?.base64}`,
                                    filename = 'dummy-image'
                                } else {
                                    filename = null
                                    content = null
                                }

                                updatePelancong?.mutate({
                                    id: data?.id,
                                    name,
                                    birthdate: typeof(birthdate) !== 'string' ? birthdate?.getTime() : '',
                                    email,
                                    phone,
                                    identity: {
                                        citizenship,
                                        id_number,
                                        id_card: {
                                            filename,
                                            content,
                                        },
                                    },
                                    passport: {
                                        passport_number,
                                        publication_date: typeof(publication_date) !== 'string' ? publication_date?.getTime() : '',
                                        expiration_date: typeof(expiration_date) !== 'string' ? expiration_date?.getTime() : '',
                                    },
                                })
                            }}
                        >
                            Update
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

export default EditPelancongScreen