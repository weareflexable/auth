import React, { useState, useRef, useEffect } from "react";
import { useRouter } from "next/router";
import Head from "next/head";
import { toast } from "react-toastify";
import { updatePassword } from "../utils/auth";
import {Flex, Text, Alert, FormHelperText, FormLabel, AlertDescription, AlertTitle, AlertIcon, Box,FormControl, Input, FormErrorMessage, InputGroup, Button, InputRightElement} from '@chakra-ui/react'
import {Formik, Form, Field} from 'formik'

const UpdatePassword = () => {
  const [password, setPassword] = useState("");
  const [retypedPassword, setRetypedPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccessAlert, setShowSuccessAlert] = useState(false)
  const passwordRef = useRef(null)

  const [show, setShow] = React.useState(false)
  const [showConfirm, setShowConfirm] = useState(false)
  const handleClick = () => setShow(!show)

  const router = useRouter();
  // todo: functions
  const handleUpdate = async (e) => {
    e.preventDefault();
    if (!password || !retypedPassword) {
      return toast.error("please fill all the fields");
    }
    // if password is too short
    if (password.toString().length < 7) {
      return toast.error("password must be at leas 7 chars");
    }
    // if passwords do not match
    if (password !== retypedPassword) {
      return toast.error("passwords do not match");
    }

    const { error } = await updatePassword(password);
    if (error) {
      toast.error(error.message);
    } else {
      setPassword("");
      setRetypedPassword("");
      // toast.dark("Password updated successfully");
      // router.push("/login");
    }
  };

  function validatePassword(value){
    let error;
    if( value.length < 8){
      error = 'Password must me 8 characters or more'
    }
    return error
  }

  useEffect(() => {
    passwordRef.current.focus()
  }, [])

  const updatePasswordForm = (
    <Box w='100%'  maxW='500px' mx='4 auto'> 
            <Flex mx='4' mt='5' justifyContent={'flex-start'} mb='5'>
              {/* <h1 className="text-5xl font-figtree text-white">Forgot Password</h1> */}
              <Text color={'text.300'} textStyle='h3'>Update Password</Text>
            </Flex>
    
            <Box borderRadius='4px' p={4} w='100%'>
              <Formik
                initialValues={{ email: ' ', password: '' }}
                onSubmit={(values) => handleUpdate(values) }
              >
            {(props) => (
            <Form style={{width:'100%'}}>
              <Field name='password' validate={validatePassword}>
                {({ field, form }) => (
                   <FormControl bg={'#121212'}  isRequired style={{marginBottom:'1rem'}} isInvalid={form.errors.password && form.touched.password}>
                    <Flex justifyContent={'space-between'}>
                      <FormLabel color={'text.300'}>Password</FormLabel>
                      {!form.errors.password && form.values.password !== ''?<Text color='green.300'>{'✓'}</Text>:null}
                    </Flex>
                    <InputGroup>
                      <Input type={show?'text':'password'} ref={passwordRef} focusBorderColor={ props.touched.password && form.errors.password ? 'red.300':props.touched.password && props.isValid.password?'green.400':'brand.100'} textStyle={'secondary'}  bg={'#121212'} color='text.300' borderWidth='2px' size='lg' borderColor={'#464646'}  variant={'outline'} {...field} placeholder='Password' />
                      <InputRightElement display={'flex'} h='100%' alignItems='center' width='4.5rem'>
                          <Button h='1.75rem' variant='text' colorScheme='brand' size='sm' onClick={handleClick}>
                            {show ? 'Hide' : 'Show'} 
                          </Button>
                      </InputRightElement>
                    </InputGroup>
                   { form.errors.password? <FormErrorMessage>{form.errors.password}</FormErrorMessage>: <FormHelperText color={'text.300'}>
                      Password should be a minimum of 8 characters
                    </FormHelperText>}
                   </FormControl> 
                )} 
              </Field>
              <Field name='confirmPassword' validate={()=>{}}>
                {({ field, form }) => (
                    <FormControl bg={'#121212'} isRequired style={{marginBottom:'.8rem'}} isInvalid={form.touched.confirmPassword && props.values.password !== props.values.confirmPassword}>
                    <Flex justifyContent={'space-between'}>
                      <FormLabel color={'text.300'}>Confirm Password</FormLabel>
                      {form.touched.confirmPassword && props.values.password !== '' && props.values.password === props.values.confirmPassword ?<Text color='green.300'>{'✓'}</Text>:null}
                    </Flex>
                    <InputGroup>
                      <Input type={showConfirm?'text':'password'} disabled={props.values.password === ''} focusBorderColor={form.touched.confirmPassword && props.values.password !== props.values.confirmPassword ? 'red.300':'green.400'} textStyle={'secondary'}  bg={'#121212'} color='text.300' borderWidth='2px' size='lg' borderColor={'#464646'}  variant={'outline'} {...field} placeholder='Confirm password' />
                      <InputRightElement display={'flex'} h='100%' alignItems='center' width='4.5rem'>
                        <Button h='1.75rem' variant='text' colorScheme='brand' size='sm' onClick={()=>setShowConfirm(!showConfirm)}>
                          {showConfirm ? 'Hide' : 'Show'} 
                        </Button>
                      </InputRightElement>
                    </InputGroup>
                    {form.touched.confirmPassword && props.values.password !== props.values.confirmPassword ? <FormErrorMessage >Password and confirm password fields have to be the same</FormErrorMessage>:null}
                   </FormControl> 
                )} 
              </Field>
              <Button
                mt={4}
                isDisabled={props.values.password !== props.values.confirmPassword}
                isLoading={isSubmitting}
                w={'100%'}
                colorScheme='brand'
                size='lg'
                type="submit"
              >
                Update Password
              </Button>
            </Form>
          )}
            </Formik>
    
            </Box>
          </Box>
      )

      const successAlert = (
        <Box w='100%' px='4' maxW='500px'>
        <Alert
          w={'100%'}
          borderRadius='4px'
          status='success'
          variant='subtle'
          bg={'#9ae6b429'}
          flexDirection='column'
          alignItems='center'
          justifyContent='center'
          textAlign='center'
          height='200px'
        >
          <AlertIcon boxSize='40px' mr={0} />
          <AlertTitle mt={4} mb={2} fontSize='lg'>
            <Text color='text.300' textStyle={'h4'}>Password Reset Successful!</Text>
          </AlertTitle> 
          <AlertDescription maxWidth='sm'>
            <Text color={'text.200'} textStyle='secondary'>
              Your password has been successfully changed. Go back to login page and try out your new password
              </Text>
          </AlertDescription>
    </Alert>
    </Box>
      )
  // todo: component
  return (
    <Flex justifyContent={'center'} align='center' bg='#121212' h={'100%'} minH='100vh'>
      <Head>
        <title>Flexable | Update Password</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/logos/logo_colored.png" />
      </Head>

    {showSuccessAlert? successAlert: updatePasswordForm}
    </Flex>
  );
};

export default UpdatePassword;
