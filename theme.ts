
import "@fontsource/figtree/variable.css";

import { extendTheme, type ThemeConfig } from "@chakra-ui/react"
import { mode } from '@chakra-ui/theme-tools'

const config: ThemeConfig ={
    initialColorMode: 'dark',
    useSystemColorMode: true
}

 const theme = extendTheme({
    ...config,
    shadows:{
      outline:'brand.200',

    },
    components:{
      Input:{
        defaultProps:{
          focusBorderColor:'brand.100'
        }
      },
      Select:{
         defaultProps:{
          focusBorderColor:'brand.100'
        }
      },
      Button:{
        baseStyle:{
          
        },
        variants:{
          outline:{
            color:'brand.300',
            fontWeight: 600,
            borderColor:'#333333',
            backgroundColor:'transparent',
            borderRadius: '50px',
          },
          ghost:{
            fontWeight:600,
            color:'text.200',
            backgroundColor:'#464646',
            borderRadius: '50px'
          },
          link:{
            fontWeight:600,
            color: 'brand.200'
          },
          solid:{
            bg:'brand.300',
            borderRadius: '50px',
            color:'white',
            // _active:{
            //   bg:'brand.100',
            //   color:'black'
            // },
          },
          accentSolid:{
            bg:'accent.300',
            borderRadius: '50px',
            color:'white',
            _active:{
              bg:'accent.100',
              color:'black'
            },
          }
        }
      }
    },
    colors:{
      brand:{
        100:'#DAB1FB',
        200:'#C380F9',
        300:'#AB4DF7',
        400:'#8C0BF4',
        500:'#56099A',
        disabled: '#653989'
      },
      accent:{
        100:'#FFE1B8',
        200:'#FFC680',
        300:'#FFAF4D',
        400:'#FF8F05',
        500:'#B25900'
      },
      state:{
        success: '#17FFA6',
        danger: '#F16161',
        warning: '',
        valid: ''
      },
      text:{
        100:'rgba(255, 255, 255, 0.3)',
        200:'rgba(255, 255, 255, 0.6)',
        300:'rgba(255, 255, 255, 0.96)'
      }
    },
  layerStyles:{
    base: {
      bg: '#121212',
      // borderColor: 'gray.500',
    },
    secondLayer: {
      bg: '#2b2b2b',
    },
    thirdLayer:{
      bg: 'blackAlpha.500',
      
    },
    selected: {
      bg: 'teal.700',
      color: 'teal.700',
      borderColor: 'orange.500',
    },
    primaryBtn:{
      color: 'text.300',
      bg: 'brand.300',
    },
    highPop:{
      color: 'rgba(255, 255, 255, 0.96)',
    },
    mediumPop:{
      color: 'rgba(255, 255, 255, 0.6)'
    },
    lowPop:{
      color: 'rgba(255, 255, 255, 0.3)'
    }
    },
  styles:{
    global:(props: Record<string, any>)=>({
      'html, body': {
        color: 'gray.600',
        lineHeight: 'tall',
        height:'100vh'
      },
      'body': {
        fontFamily: 'body',
        color: mode('whiteApha.800', 'whiteAlpha.900')(props),
        bg: mode('white', 'gray.800')(props),
        lineHeight: 'base',
        paddingTop: "env(safe-area-inset-top, 1em)",
        paddingRight: "env(safe-area-inset-right, 1em)",
        paddingBottom: "env(safe-area-inset-bottom, 1em)",
        paddingLeft: "env(safe-area-inset-left, 1em)"
      },
      '*::placeholder': {
        color: mode('gray.400', 'whiteAlpha.400')(props),
      },
      '*, *::before, &::after': {
        borderColor: mode('gray.200', 'whiteAlpha.300')(props),
        wordWrap: 'break-word',
      },
  })
  },
  fonts: {
    heading: `'Figtree', san-serif`,
    body: `'Figtree', sans-serif`,
  },
  textStyles:{
    h1: {
      fontSize:['32px','42px'],
      fontWeight: '700',
      lineHeight: '110%',
      letterSpacing: '0.1px', 
      color:'#f8f8f8'
    },

    h2:{
      fontWeight: '650',
      fontFamily: 'body',
      fontSize: '1em',
      letterSpacing: '-0.1px'
    },

    h3:{
      fontWeight: '650',
      fontFamily: 'body',
      fontSize: '1.7em',
      letterSpacing: '-0.1px',
      lineHeight:1.1,
      color: 'whiteAlpha.800'
    },

    h4:{
      color: '#ffffff' ,
      fontFamily:'body',
      marginBottom:'0',
      lineHeight:1,
      fontSize:'1.4rem',
      fontWeight: '650'
    },
    h5:{
      fontSize:'1rem',
      fontWeight: '650',
      lineHeight: 1.1,
      fontFamily:'body'
    },
    links:{
      fontWeight: '650',
      lineHeight: '110%', 
      cursor:'pointer'
    },
    caption:{
      color: 'gray.200' ,
      fontWeight: 700,
      lineHeight: 1,
      letterSpacing: 0,
      fontSize: ['12px','12px','13px']
    },
    ticketPrice:{
      fontFamily:'heading',
      fontWeight: 700, 
      fontSize: ['1.5em','1.6em','2.2em'],
      letterSpacing: '-0.8px',
      fontVariantNumeric:'oldstyle-nums',
      margin: 0,
      lineHeight: 1
    },
    currency:{
      fontFamily: 'heading',
      fontSize: '2em'
    },
    body:{
      fontFamily: 'body',
      fontWeight:'450',
      fontSize:'1.2rem',
      lineHeight: 1.3,
      letterSpacing: '-.2px'
    },
    secondary:{
      fontFamily: 'body',
      fontWeight:'450',
      fontSize: '1rem',
      lineHeight: '1.3em',
      letterSpacing: '-.02px'
    },
    buttonLabel:{
      fontWeight:'650',
      fontSize:['.9rem','1rem'],
      letterSpacing:'-.2',
      lineHeight:'1'
    }
    
  }
})


export default theme