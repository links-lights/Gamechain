import { Box, Paper, Typography, Grid, Link, Avatar} from "@mui/material"
import Ben from "../images/Ben.jpeg"
import Emil from "../images/Emil.png"
import Kevin from "../images/Kevin.jpeg"
import Freddy from "../images/Freddy.jpg"
import LinkedInIcon from "../images/linkedin.png"

const AboutUs = () => {
  const us = [{
    name:"Emil",
    imageSrc: Emil,
    about: "Body Here",
    linkedIn: "LinkedInUrl"
  },
  {
  name:"Freddy",
  imageSrc: Freddy,
  about: "Body Here",
  linkedIn: "LinkedInUrl"
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
    about: "Body Here",
    linkedIn: "LinkedInUrl"
  },

]
  return (
    <>
    <Typography variant="h4" textAlign="center" p={3}>
      About us
    </Typography>
    <Box gridTemplateColumns="repeat(1, 1fr)" p={10} sx={{
      minHeight:"45vw",
      border:"1px solid black",
    }}>
      {us.map((self , idx)=>{
        const { name, imageSrc, about, linkedIn } = self
        return (
      <Box className={name} gridColumn="span 1" p={6}
      sx={{
        border: "1px solid black"
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
            <Typography variant="body1" p={1}>
              {about}
            </Typography>
          </Grid>

        </Grid>
      </Box>
        )
      })}
    </Box>
    </>
  )
}

export default AboutUs
