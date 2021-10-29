import { Box, Paper, Typography, Grid, Link, Avatar, Divider} from "@mui/material"
import Ben from "../images/Ben.jpeg"
import Emil from "../images/Emil.png"
import Kevin from "../images/Kevin.jpeg"
import Freddy from "../images/Freddy.jpg"
import LinkedInIcon from "../images/linkedin.png"

const AboutUs = () => {
  const us = [{
    name:"Emil",
    imageSrc: Emil,
    about: "Hello my Name is Emil. I love web3! I'm a crypto investor and distributed systems builder. I enjoy working endlessly learning new blockchain tech and have great taste in music, according to myself.",
    linkedIn: "https://www.linkedin.com/in/emilishere/"
  },
  {
  name:"Freddy",
  imageSrc: Freddy,
  about: "Hey ya'll, I'm an upcoming full stack software engineer with a growing interest in decentralized technology. As a recent graduate of Fullstack Academy, I've developed the skillset to design/create scalable software and am loving everything I have learned. On my off time I enjoy long walks to clear the mind, kettlebell workouts to keep fit, and strategy games like Chess and Civilization.",
  linkedIn: "https://www.linkedin.com/in/freddyjgomez/"
  },
  {
    name:"Ben",
    imageSrc: Ben ,
    about: "My name is Ben Ye, and I am a software engineer. Software development is a vast field and one that is creative, demanding and extremely rewarding. Choosing a career as a Software Developer give me the opportunity to learn about the business as well as technology, which allows me to continue to upgrade in my daily life. In my free time, I also can enjoy outdoor activities like playing tennis and hiking with my family and friends.",
    linkedIn: "https://www.linkedin.com/in/zhibin-ben-ye/"
  },
  {
    name:"Kevin",
    imageSrc: Kevin,
    about: "Hey everyone my name is Kevin Browne and i am a full stack developer! Previously in supply chain, I found myself way more interested in using tech to help develop the systems I used do my job. That led me to learning more about Python to eventually joining Full Stack Academy to start my path in becoming a software engineer. I am also involved in the sneaker reseller community, a space where there are many talented developers who make automated checkout software for resellers to use. In my free time, I enjoy watching sports and working out. I am also an avid sneaker head with over 75 pairs of kicks and counting!",
    linkedIn: "https://www.linkedin.com/in/kjbrowne28/"
  },

]
  return (
    <>
    <Box gridTemplateColumns="repeat(1, 1fr)" p={10} sx={{
      minHeight:"45vw",
    }}>
      <Typography variant="h2" textAlign="center" p={3} fontWeight="bold" color="">
        Meet the Team
      </Typography>
      <Divider />
      {us.map((self , idx)=>{
        const { name, imageSrc, about, linkedIn } = self
        return (
        <>
      <Box className={name} gridColumn="span 1" p={6}
      sx={{

        }}>
        <Grid container p={2} spacing={3}>

          <Grid item xs={6}  className={`${name}Picture`}
          container alignItems="center" flexDirection="column" justifyContent="center">
            <Avatar alt={name} src={imageSrc} sx={{height:"200px", width:"200px"}} />
              {/* <img alt={name} src={imageSrc} height="200px" width="auto" /> */}
            <Typography variant="h5">
             {name}
            </Typography>
            <Typography>
              <a href={linkedIn}><img alt="LinkedinIcon" src={LinkedInIcon} height="20px" /></a>
            </Typography>
          </Grid>
          <Grid xs={6} container alignItems="center" flexDirection="column" justifyContent="center">
            <Typography variant="body1" p={3}
            sx={{
              border: "8px solid grey",
              borderRadius:"20px"
              }}>
              {`"${about}"`}
            </Typography>
          </Grid>

        </Grid>
        </Box>
      <Divider />
      </>
        )
      })}
    </Box>
    </>
  )
}

export default AboutUs
