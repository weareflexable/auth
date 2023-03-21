import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import Image from "next/image";
import Head from "next/head";
import { signIn, signInWithProvider } from "../utils/auth";
import { getPlatformPaseto, setPlatformPaseto } from "../src/storage";
import { getPaseto } from "../src/api/platform";
import supabase from "../utils/supabaseClient";
import { Button, Input, HStack, Divider, Box, useToast, InputRightElement, InputGroup, Flex, Text, FormControl, FormLabel, FormErrorMessage, propNames} from "@chakra-ui/react";
import {Form, Formik, Field} from 'formik'

const Login = () => {
  // todo: states
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();
  const emailRef = useRef(null)
  const { redirect_to } = router.query;
  const toast = useToast()

  useEffect(() => {
    emailRef.current.focus()
  }, [])

  // todo: functions
  const handleSignIn = async (values) => {
    console.log(values)
    const {email, password} = values
    // e.preventDefault();
    localStorage.setItem("redirect_to", redirect_to);
    if(router.query.payment){
      localStorage.setItem("payment",router.query.payment)
    }
    
   
    setIsSubmitting(true); 
    const { error, session } = await signIn({ email, password });
    if (error) {
      setIsSubmitting(false);
      toast({
        title: `${error}`,
        variant: 'error',
        position:'top-right',
        isClosable: true,
      })
    }
    if (session) {
      setIsSubmitting(false);
      // getPaseto(supabase.auth.session().access_token).then(setPlatformPaseto);
      // const paseto = getPlatformPaseto();
      toast({
        title: `Login successful!`,
        variant: 'success',
        position:'top-right',
        isClosable: true,
      })
      router.push(`/dashboard`);
    }
  };

  const handleProviderLogin = async (provider) => {
    localStorage.setItem("redirect_to", redirect_to);
    if(router.query.payment){
      localStorage.setItem("payment",router.query.payment)
    }

    // this redirects whenever it's succesful
    setIsSubmitting(true);
    const { error, user } = await signInWithProvider(provider);

    setIsSubmitting(false);
  };
  // };

  function handleRegister() {
    localStorage.setItem("redirect_to", redirect_to);
    if(router.query.payment){
      localStorage.setItem("payment",router.query.payment)
    }
    router.push("/register");
  }

  const [show, setShow] = React.useState(false)
  const handleClick = () => setShow(!show)

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
  function validatePassword(value) {
    let error
    if (!value) {
      error = 'Password is required'
    } else if (value.length < 7) {
      error = "Please provide a minimum of 8 characters for your password"
    }
    return error
  }

  return (
    <>
      <Head>
        <title>Flexable | Login</title>
        <meta name="description" content="Flexable login" />
        <link rel="icon" href="/logos/logo_colored.png" />
      </Head>
      <div className=" flex flex-col lg:flex-row h-screen">
        <div className="flex flex-col md:pb-8 bg-[#242525] lg:w-1/2 items-center justify-start">
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
              Sign In &
            </h3>
            <h1 className="lg:text-6xl text-5xl text-[#A6A6A7] font-semibold font-figtree text-center lg:text-left">
              Get access to:
            </h1>
            <div className="flex lg:mt-4 mb-12 lg:mb-0 mt-6">
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
                  <span className="ml-1.5">Events & more</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col flex-grow bg-black lg:w-1/2 text-center lg:text-left items-center justify-center ">
          <h1 className="text-3xl font-figtree text-white font-semibold lg:mt-0 mb-8 mt-8">
            Login
          </h1>
          <Flex maxW='450px' w='100%' px='1rem' direction='column'>

          
          <Button
            variant={'outline'}
            colorScheme='brand'
            width='100%'
            mb='4'
            size='lg'
            onClick={() => handleProviderLogin("apple")}
          >
            Continue with Apple
          </Button>
          <Button
            variant={'outline'}
            colorScheme='brand'
            width='100%'
            mb='4'
            size='lg'
            onClick={() => handleProviderLogin("google")}
          >
            Continue with Google
          </Button>
          </Flex>

          <HStack direction='row' h='70px' p={4}>
            <Text color={'text.200'} textStyle={'buttonLabel'}>OR</Text>
            {/* <Divider color={'red'} /> */}
          </HStack>

          {/* <form onSubmit={handleSignIn}> */}
          <Box maxW='450px' px='1rem' w='100%'>
          <Formik
            initialValues={{ email: '', password: '' }}
            onSubmit={(values) => handleSignIn(values) }
          >
        {(props) => (
        <Form style={{width:'100%'}}>
          <Field name='email' validate={validateEmail}>
            {({ field, form }) => (
                <FormControl bg={'#121212'} isRequired style={{marginBottom:'.8rem'}} isInvalid={form.errors.email && form.touched.email}>
                <Input autoComplete='off' ref={emailRef}  type='email' textStyle={'secondary'} color='text.300' borderWidth='2px' size='lg' borderColor={'#464646'}  variant={'outline'} {...field} placeholder='Email' />
                <FormErrorMessage>{form.errors.email}</FormErrorMessage>
               </FormControl> 
            )} 
          </Field>
          <Field name='password' validate={validatePassword}>
            {({ field, form }) => (
                <FormControl bg={'#121212'} isRequired isInvalid={form.errors.password && form.touched.password}>
                  <Flex justifyContent={'space-between'}>
                      <FormLabel color={'text.300'}>Password</FormLabel>
                      {!form.errors.password && form.values.password !== ''?<Text color='green.300'>{'✓'}</Text>:null}
                    </Flex>
                  <InputGroup  size='md'>
                   <Input  bg={'#121212'} textStyle={'secondary'} size='lg' type={show ? 'text' : 'password'} color='text.300' borderWidth='2px' borderColor={'#464646'}  variant={'outline'} {...field} placeholder='password' />
                   <InputRightElement display={'flex'} h='100%' alignItems='center' width='4.5rem'>
                      <Button h='1.75rem' variant='text' colorScheme='brand' size='sm' onClick={handleClick}>
                        {show ? 'Hide' : 'Show'} 
                      </Button>
                  </InputRightElement>
                  </InputGroup>
                <FormErrorMessage>{form.errors.password}</FormErrorMessage>
               </FormControl> 
            )}
          </Field>
          <Button
            mt={4}
            // colorScheme='teal'
            isDisabled = {props.errors.email || props.errors.password || props.values.email === '' || props.values.password === ''}
            isLoading={isSubmitting}
            w={'100%'}
            colorScheme='brand'
            size='lg'
            type="submit"
          >
            Login
          </Button>
        </Form>
      )}
        </Formik>

         <Flex w={'100%'} justifyContent='space-between'>
            <Flex my='4'>
              <Text color='text.200' mr='1'>No account? </Text>
              <Button variant={'link'} onClick={handleRegister}>
                 Sign up
              </Button>
            </Flex>
            <Button variant={'link'} onClick={()=>router.push('/forgot-password')}>Forgot password?</Button>
         </Flex>
        </Box>
        </div>
      </div>
    </>
  );
};

export default Login;
