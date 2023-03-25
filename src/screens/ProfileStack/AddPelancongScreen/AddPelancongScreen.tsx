import React, { useState } from 'react'
import DateTimePickerModal from 'react-native-modal-datetime-picker'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import { Header } from '../../../components'
import { 
    Button,
    Flex, 
    Icon, 
    Input, 
    Pressable, 
    ScrollView, 
    Select, 
    Stack, 
    Text, 
} from 'native-base'
import { format } from 'date-fns'
import { useMutation } from 'react-query'
import { AddPelancongApi } from '../../../apis/pelancong.api'

interface IAddPelancongScreen {
    navigation: any
    route: any
}

const AddPelancongScreen = (props: IAddPelancongScreen) => {
    const { navigation, route } = props
    const { callbackSuccess } = route.params

    const [name, setName] = useState<string>('')
    const [email, setEmail] = useState<string>('')
    const [phone, setPhone] = useState<string>('')
    const [birthdate, setBirthdate] = useState<Date | string>('')
    const [citizenship, setCitizenship] = useState<string>('')
    const [id_number, setId_number] = useState<string>('')
    const [passport_number, setPassport_number] = useState<string>('')
    const [publication_date, setPublication_date] = useState<Date | string>('')
    const [expiration_date, setExpiration_date] = useState<Date | string>('')

    const [showDatePickerBirthdate, setShowDatePickerBirthdate] = useState(false)
    const [showDatePickerPublicationDate, setShowDatePickerPublicationDate] = useState(false)
    const [showDatePickerExpirationDate, setShowDatePickerExpirationDate] = useState(false)

    const addPelancong = useMutation(AddPelancongApi, {
        onSuccess: function() {
            navigation?.goBack()
            callbackSuccess && callbackSuccess()
        }
    })

    return (
        <Flex flex='1' backgroundColor='white'>
            <Header
                title='Tambah Data Pelancong'
                onPressBack={() => navigation.goBack()}
            />
            
            <ScrollView>
                <Stack space='8px' backgroundColor='gray.100'>
                    <Stack 
                        padding='16px' 
                        space='16px' 
                        backgroundColor='white'
                    >
                        <Text
                            fontFamily='Poppins-SemiBold' 
                            fontSize='15px'
                            color='gray.600'
                        >Informasi Pelancong</Text>
                        <Input 
                            height='50px'
                            backgroundColor='white'
                            paddingX='16px'
                            paddingY='8px'
                            flexDirection='row'
                            alignItems='center'
                            placeholder='nama'
                            placeholderTextColor='gray.400'
                            fontFamily='Poppins-Regular'
                            fontSize='15px'
                            color='gray.600'
                            fontStyle={name ? 'normal' : 'italic'}
                            value={name}
                            onChangeText={(e: any) => setName(e)}
                        />
                        <Input 
                            height='50px'
                            backgroundColor='white'
                            paddingX='16px'
                            paddingY='8px'
                            flexDirection='row'
                            alignItems='center'
                            placeholder='email'
                            placeholderTextColor='gray.400'
                            fontFamily='Poppins-Regular'
                            fontSize='15px'
                            color='gray.600'
                            fontStyle={email ? 'normal' : 'italic'}
                            value={email}
                            onChangeText={(e: any) => setEmail(e)}
                        />
                        <Input 
                            height='50px'
                            backgroundColor='white'
                            paddingX='16px'
                            paddingY='8px'
                            flexDirection='row'
                            alignItems='center'
                            placeholder='no. telepon'
                            placeholderTextColor='gray.400'
                            fontFamily='Poppins-Regular'
                            fontSize='15px'
                            color='gray.600'
                            keyboardType='numeric'
                            fontStyle={phone ? 'normal' : 'italic'}
                            value={phone}
                            onChangeText={(e: any) => setPhone(e)}
                        />
                        <Pressable
                            height='50px'
                            backgroundColor='white'
                            paddingX='16px'
                            paddingY='8px'
                            flexDirection='row'
                            alignItems='center'
                            justifyContent='space-between'
                            borderWidth='1px'
                            borderRadius='4px'
                            borderColor='gray.300'
                            onPress={() => setShowDatePickerBirthdate(true)}
                        >
                            <Text
                                fontFamily='Poppins-Regular' 
                                fontSize='15px'
                                color={birthdate ? 'gray.600' : 'gray.400'}
                                fontStyle={birthdate ? 'normal' : 'italic'}
                            >{birthdate ? format(new Date(birthdate), 'dd MMMM yyyy') : 'tanggal lahir'}</Text>
                            <Icon as={MaterialIcons} name='calendar-today' color='gray.400' size='lg' />
                        </Pressable>
                    </Stack>
                    <Stack 
                        padding='16px' 
                        space='16px' 
                        backgroundColor='white'
                    >
                        <Text
                            fontFamily='Poppins-SemiBold' 
                            fontSize='15px'
                            color='gray.600'
                        >Informasi Kewarganegaraan</Text>
                        <Select
                            dropdownIcon={<></>} 
                            height='50px'
                            backgroundColor='white'
                            paddingX='16px'
                            paddingY='8px'
                            flexDirection='row'
                            alignItems='center'
                            placeholder='kewarganegaraan'
                            placeholderTextColor='gray.400'
                            fontFamily='Poppins-Regular'
                            fontSize='15px'
                            color='gray.600'
                            fontStyle={citizenship ? 'normal' : 'italic'}
                            width='full'
                            selectedValue={citizenship}
                            onValueChange={(e: any) => setCitizenship(e)}
                        >
                            <Select.Item fontFamily='Poppins-Medium' label="Indonesia" value="Indonesia" />
                        </Select>
                        <Input 
                            height='50px'
                            backgroundColor='white'
                            paddingX='16px'
                            paddingY='8px'
                            flexDirection='row'
                            alignItems='center'
                            placeholder='no. KTP'
                            placeholderTextColor='gray.400'
                            fontFamily='Poppins-Regular'
                            fontSize='15px'
                            color='gray.600'
                            keyboardType='numeric'
                            fontStyle={id_number ? 'normal' : 'italic'}
                            value={id_number}
                            onChangeText={(e: any) => setId_number(e)}
                        />
                    </Stack>
                    <Stack 
                        padding='16px' 
                        space='16px' 
                        backgroundColor='white'
                    >
                        <Text
                            fontFamily='Poppins-SemiBold' 
                            fontSize='15px'
                            color='gray.600'
                        >Informasi Passport</Text>
                        <Input 
                            height='50px'
                            backgroundColor='white'
                            paddingX='16px'
                            paddingY='8px'
                            flexDirection='row'
                            alignItems='center'
                            placeholder='no. passport'
                            placeholderTextColor='gray.400'
                            fontFamily='Poppins-Regular'
                            fontSize='15px'
                            color='gray.600'
                            keyboardType='numeric'
                            fontStyle={passport_number ? 'normal' : 'italic'}
                            value={passport_number}
                            onChangeText={(e: any) => setPassport_number(e)}
                        />
                        <Pressable
                            height='50px'
                            backgroundColor='white'
                            paddingX='16px'
                            paddingY='8px'
                            flexDirection='row'
                            alignItems='center'
                            justifyContent='space-between'
                            borderWidth='1px'
                            borderRadius='4px'
                            borderColor='gray.300'
                            onPress={() => setShowDatePickerPublicationDate(true)}
                        >
                            <Text
                                fontFamily='Poppins-Regular' 
                                fontSize='15px'
                                color={publication_date ? 'gray.600' : 'gray.400'}
                                fontStyle={publication_date ? 'normal' : 'italic'}
                            >{publication_date ? format(new Date(publication_date), 'dd MMMM yyyy') : 'tanggal penerbitan'}</Text>
                            <Icon as={MaterialIcons} name='calendar-today' color='gray.400' size='lg' />
                        </Pressable>
                        <Pressable
                            height='50px'
                            backgroundColor='white'
                            paddingX='16px'
                            paddingY='8px'
                            flexDirection='row'
                            alignItems='center'
                            justifyContent='space-between'
                            borderWidth='1px'
                            borderRadius='4px'
                            borderColor='gray.300'
                            onPress={() => setShowDatePickerExpirationDate(true)}
                        >
                            <Text
                                fontFamily='Poppins-Regular' 
                                fontSize='15px'
                                color={expiration_date ? 'gray.600' : 'gray.400'}
                                fontStyle={expiration_date ? 'normal' : 'italic'}
                            >{expiration_date ? format(new Date(expiration_date), 'dd MMMM yyyy') : 'tanggal kadaluarsa'}</Text>
                            <Icon as={MaterialIcons} name='calendar-today' color='gray.400' size='lg' />
                        </Pressable>
                    </Stack>
                    <Stack 
                        padding='16px' 
                        space='16px' 
                        backgroundColor='white'
                    >
                        <Button 
                            height='50px'
                            borderRadius='8px'
                            backgroundColor='xprimary.50'
                            width='full'
                            isLoading={addPelancong?.isLoading}
                            _pressed={{
                                backgroundColor: 'xprimary.40'
                            }}
                            onPress={() => {
                                addPelancong?.mutate({
                                    name,
                                    birthdate: typeof(birthdate) !== 'string' ? birthdate?.getTime() : '',
                                    email,
                                    phone,
                                    identity: {
                                        citizenship,
                                        id_number
                                    },
                                    passport: {
                                        passport_number,
                                        publication_date: typeof(publication_date) !== 'string' ? publication_date?.getTime() : '',
                                        expiration_date: typeof(expiration_date) !== 'string' ? expiration_date?.getTime() : '',
                                    }
                                })
                            }}
                        >
                            <Text
                                fontFamily='Poppins-SemiBold' 
                                fontSize='15px'
                                color='white'
                            >Simpan</Text>
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
        </Flex>
    )
}

export default AddPelancongScreen