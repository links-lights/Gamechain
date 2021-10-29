import { Box, Paper, Typography, Grid, Link} from "@mui/material"
import Ben from "../images/Ben.jpeg"
const AboutUs = () => {
  const us = [{
    name:"Emil",
    imageSrc: "",
    about: "Body Here",
    linkedIn: "LinkedInUrl"
  },
  {
  name:"Freddy",
  imageSrc: "",
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
    imageSrc: "",
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
        <Grid container p={2}>
          <Grid item xs={2} />
          <Grid item xs={3} className={`${name}Picture`}
          container alignItems="center" flexDirection="column" justifyContent="center">
              <img alt={name} src={imageSrc} />
            <Typography variant="h6">
             {name}
            </Typography>
            <Typography>
              <Link src={linkedIn}>linkedIn</Link>
            </Typography>
          </Grid>
          <Grid xs={5}>
            <Typography variant="body1" p={1}>
              {about}
            </Typography>
          </Grid>
          <Grid item xs={2} />
        </Grid>
      </Box>
        )
      })}
    </Box>
    </>
  )
}

export default AboutUs
