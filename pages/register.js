import React, { useState, useEffect, useRef, useCallback } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import Image from "next/image";
import Head from "next/head";
import { signUp } from "../utils/auth";
import {Flex, Text, Alert, useToast, FormHelperText, FormLabel, AlertDescription, AlertTitle, AlertIcon, Box,FormControl, Input, FormErrorMessage, InputGroup, Button, InputRightElement} from '@chakra-ui/react'
import {Formik, Form, Field} from 'formik'
import { 
  useGoogleReCaptcha
} from 'react-google-recaptcha-v3';

const Register = () => {
  // todo: states
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [show, setShow] = useState(false)
  const [showConfirm, setShowConfirm] = useState(false)
  const [showSuccessAlert, setShowSuccessAlert] = useState(false)

  const { executeRecaptcha } = useGoogleReCaptcha();

    // Create an event handler so you can call the verification on button click event or form submit
    const handleReCaptchaVerify = useCallback(async () => {
      if (!executeRecaptcha) {
        console.log('Execute recaptcha not yet available');
        return;
      }

    const token = await executeRecaptcha('yourAction');
    // Do whatever you want with the token
  }, [executeRecaptcha]);


   // You can use useEffect to trigger the verification as soon as the component being loaded
   useEffect(() => {
    handleReCaptchaVerify();
  }, [handleReCaptchaVerify]);

  const emailRef = useRef(null)
 

  useEffect(() => {
    if(!showSuccessAlert){
      emailRef.current.focus()
    }
  }, [])

  const toast = useToast()

  const router = useRouter();

  // todo: functions
  const handleSignUp = async (values) => {

    let {email, password} = values

    handleReCaptchaVerify()

    setIsSubmitting(true)
    const { error, session } = await signUp({ email, password });
    if (error) {
      toast({
        title: `${error.message}`,
        status: 'error',
        position:'top-right',
        isClosable: true,
      })
      setIsSubmitting(false)
    } else {
      setShowSuccessAlert(true)
      setIsSubmitting(false)
    }
  };

  function validatePassword(value){
    let error;
    if( value.length < 8){
      error = 'Password must me 8 characters or more'
    }
    return error
  }

  function validateEmail(value) {
    let error
    const emailPattern = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g
    if (!value) {
      error = 'Email is required'
    } else if (!emailPattern.test(value.toLowerCase())) { // regex for email
      error = "Please use the correct email format eg billcage@yahoo.com"
    }
    return error
  }

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
        <Text color='text.300' textStyle={'h4'}>Check your email!</Text>
      </AlertTitle> 
      <AlertDescription maxWidth='sm'>
        <Text color={'text.200'} textStyle='secondary'>
          A confirmation email has been sent to your newly registered email. Please confirm your account by clicking the link in the email
          </Text>
      </AlertDescription>
</Alert>
</Box>
  )


  const signUpForm = (
  
        <Box w='100%'  maxW='500px' mx='4 auto'> 
            <Flex mt='6' justifyContent={'flex-start'} mb='6'>
              {/* <h1 className="text-5xl font-figtree text-white">Forgot Password</h1> */}
              <Text color={'text.300'} textStyle='h3'>Sign Up</Text>
            </Flex>
          
          <Box borderRadius='4px'  w='100%'>
              <Formik
                initialValues={{ email: ' ', password: '' }}
                onSubmit={handleSignUp}
              >
            {(props) => (
            <Form style={{width:'100%'}}>
              <Field name='email' validate={validateEmail}>
                {({ field, form }) => (
                  <FormControl bg={'#121212'} isRequired style={{marginBottom:'.8rem'}} isInvalid={form.errors.email && form.touched.email}>
                      <FormLabel color={'text.300'}>Email</FormLabel>
                    <Input autoComplete='off' ref={emailRef}  type='email' textStyle={'secondary'} color='text.300' size='lg' borderColor={'#464646'}  variant={'outline'} {...field} placeholder='Email' />
                    <FormErrorMessage>{form.errors.email}</FormErrorMessage>
                  </FormControl> 
                )} 
              </Field>
              <Field name='password' validate={validatePassword}>
                {({ field, form }) => (
                   <FormControl bg={'#121212'}  isRequired style={{marginBottom:'1rem'}} isInvalid={form.errors.password && form.touched.password}>
                    <Flex justifyContent={'space-between'}>
                      <FormLabel color={'text.300'}>Password</FormLabel>
                      {!form.errors.password && form.values.password !== ''?<Text color='green.300'>{'✓'}</Text>:null}
                    </Flex>
                    <InputGroup>
                      <Input type={show?'text':'password'}  focusBorderColor={ props.touched.password && form.errors.password ? 'red.300':props.touched.password && props.isValid.password?'green.400':'brand.100'} textStyle={'secondary'}  bg={'#121212'} color='text.300' size='lg' borderColor={'#464646'}  variant={'outline'} {...field} placeholder='Password' />
                      <InputRightElement display={'flex'} h='100%' alignItems='center' width='4.5rem'>
                          <Button h='1.75rem' variant='text' colorScheme='brand' size='sm' onClick={()=>setShow(!show)}>
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
                      <Input type={showConfirm?'text':'password'} disabled={props.values.password === ''} focusBorderColor={form.touched.confirmPassword && props.values.password !== props.values.confirmPassword ? 'red.300':'green.400'} textStyle={'secondary'}  bg={'#121212'} color='text.300' size='lg' borderColor={'#464646'}  variant={'outline'} {...field} placeholder='Confirm password' />
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
                Sign Up
              </Button>
            </Form>
          )}
            </Formik>
    
          </Box>


         <Flex w={'100%'} justifyContent='space-between'>
            <Flex mx='4' my='4'>
              <Text color='text.200' mr='1'>Already have an account? </Text>
              <Button variant={'link'} onClick={()=>router.push('/login')}>
                 Login
              </Button>
            </Flex> 
         </Flex>

        </Box>
  )
  return (
    <>
      <Head>
        <title>Flexable | Signup</title>
        <meta name="description" content="Flexable login" />
        <link rel="icon" href="/logos/logo_colored.png" />
      </Head>
      <div className="flex flex-col lg:flex-row h-screen">
        <div className="flex flex-col bg-[#242525] md:pb-8 lg:w-1/2 items-center justify-start">
          <div className="hidden lg:block">
            <Image
              src="/logos/logo.svg"
              alt="flexable-logo"
              width={200}
              height={200}
            />
          </div>
          <div className="-mt-4 lg:hidden block">
            <Image
              src="/logos/logo.svg"
              alt="flexable-logo"
              width={200}
              height={200}
            />
          </div>
          <div className="flex flex-col lg:mt-32 -mt-2 text-center lg:text-left">
            <h3 className="lg:text-5xl text-4xl text-white font-semibold font-figtree lg:mb-2">
              Sign up &
            </h3>
            <h1 className="lg:text-6xl text-5xl text-[#A6A6A7] font-semibold font-figtree text-center lg:text-left">
              Get access to:
            </h1>
            <div className="flex lg:mt-4 mb-12 lg:mb-0 mt-6 lg:justify-start justify-center ">
              <div className="flex flex-col mr-12 text-[#A6A6A7] font-figtree lg:text-left text-center">
                <div className="flex">
                  <Image
                    src="/checkmark.svg"
                    alt="check-icon"
                    width={15}
                    height={15}
                  />
                  <span className="ml-1.5">Night life</span>
                </div>
                <div className="flex">
                  <Image
                    src="/checkmark.svg"
                    alt="check-icon"
                    width={15}
                    height={15}
                  />
                  <span className="ml-1.5">Restaurants</span>
                </div>
              </div>
              <div className="flex flex-col text-[#A6A6A7] font-figtree">
                <div className="flex">
                  <Image
                    src="/checkmark.svg"
                    alt="check-icon"
                    width={15}
                    height={15}
                  />
                  <span className="ml-1.5">Memberships</span>
                </div>
                <div className="flex">
                  <Image
                    src="/checkmark.svg"
                    alt="check-icon"
                    width={15}
                    height={15}
                  />
                  <span className="ml-1.5">Events & More</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <Flex w={['100%','100%', '100%', '50%']} px='1rem' bg={'#121212'} h='100%' justifyContent='center' align={'center'} direction='column'>
        {showSuccessAlert?successAlert: signUpForm}
        </Flex>
      </div>
    </>
  );
};

export default Register;
