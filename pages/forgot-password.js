import React, { useState, useEffect, useRef } from "react";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import { createRecovery } from "../utils/auth";
import {Flex, Text, Alert, AlertDescription, FormLabel, useToast, AlertTitle, AlertIcon, Box,FormControl, Input, FormErrorMessage, InputGroup, Button, InputRightElement} from '@chakra-ui/react'
import {Formik, Form, Field} from 'formik'

const ForgotPassword = () => {
  // todo: states
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccessAlert, setShowSuccessAlert] = useState(false)
  const router = useRouter();

  const toast = useToast()

  const emailRef = useRef(null)

  useEffect(() => {
    emailRef.current.focus()
  }, [])

  // todo: functions
  const handleSignIn = async (values) => {
    const {email} = values

    setIsSubmitting(true);
    const { error } = await createRecovery(email);
    if (error) {
      setIsSubmitting(false);
      toast({
        title: `${error.message}`,
        status: 'error',
        position:'top-right',
        isClosable: true,
      })
    } else {
      setIsSubmitting(false);
      setShowSuccessAlert(true)
    }
  };

  function validateEmail(value) {
    let error
    const emailPattern = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g
    if (!value) {
      error = 'Email is required'
    } else if (!emailPattern.test(value.toLowerCase())) { // regex for email
      error = "Please use the correct email format eg billcage@yahoo.com 😱"
    }
    return error
  }
  
  const recoveryForm = (
      <Box w='100%'  maxW='500px' mx='4 auto'> 
        <Flex mx='4' mt='5' justifyContent={'flex-start'} mb='5'>
          {/* <h1 className="text-5xl font-figtree text-white">Forgot Password</h1> */}
          <Text color={'text.300'} textStyle='h3'>Recover Password</Text>
        </Flex>

        <Box borderRadius='4px' p={4} w='100%'>
          <Formik
            initialValues={{ email: ' ' }}
            onSubmit={(values) => handleSignIn(values) }
          >
        {(props) => (
        <Form style={{width:'100%'}}>
          <Field name='email' validate={validateEmail}>
            {({ field, form }) => (
                <FormControl bg={'#121212'} isRequired style={{marginBottom:'.8rem'}} isInvalid={form.errors.email && form.touched.email}>
                <FormLabel color={'text.300'}>Email</FormLabel>
                <Input type='email' bg={'#121212'} ref={emailRef} textStyle={'secondary'} color='text.300' size='lg' borderColor={'#464646'}  variant={'outline'} {...field} placeholder='Email' />
                <FormErrorMessage>{form.errors.email}</FormErrorMessage>
               </FormControl> 
            )} 
          </Field>
          <Button
            mt={4}
            // colorScheme='teal'
            isLoading={isSubmitting} 
            isDisabled = {props.values.email === ' ' || props.errors.email}
            w={'100%'}
            colorScheme='brand'
            size='lg'
            type="submit"
          >
            Send Recovery Link
          </Button>
        </Form>
      )}
        </Formik>

         <Flex  w={'100%'} justifyContent='space-between'>
            <Flex my='4'>
              <Text color='text.200' mr='1'>Back to </Text>
              <Button variant={'link'} onClick={()=>router.back()}>
                 Sign in
              </Button>
            </Flex>
            {/* <Button variant={'link'} onClick={()=>router.push('/forgot-password')}>Forgot password?</Button> */}
         </Flex>
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
        <Text color='text.300' textStyle={'h4'}>Recovery Link Sent!</Text>
      </AlertTitle> 
      <AlertDescription maxWidth='sm'>
        <Text color={'text.200'} textStyle='secondary'>
          Your password recovery link has been sent to your email. Please follow the link in your email and update your password
          </Text>
      </AlertDescription>
</Alert>
</Box>
  )
  return (
    <Flex justifyContent={'center'} align='center' bg='#121212' h={'100%'} minH='100vh'>
      <Head>
        <title>Password Recovery | Flexable</title>
        <link rel="icon" href="/logos/logo_colored.png" />
      </Head>

      {showSuccessAlert? successAlert: recoveryForm}
      
    </Flex>
  );
};

export default ForgotPassword;



