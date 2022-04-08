import { useLanyard } from 'use-lanyard'
import profilePic from '../public/logo192.png'

import Image from 'next/image'
import Projects from '../components/Projects'
import Presence from '../components/Presence'
import Spotify from '../components/Spotify'
import { Grid } from '@nextui-org/react'

function App() {
  const { data: activity } = useLanyard("536644802595520534");
  var du = {
    username: "api error",
    discriminator: "0000"
  };
  if (activity === undefined) {
    du = "api error#0000"
  } else {
    du = activity.discord_user
  }
  var p;
  if (activity && activity.activities.length > 0) {
    console.log(activity)
    for (let i = 0; i < activity.activities.length; i++) {
      if (activity.activities[i].type !== 2 && activity.activities[i].type !== 4) {
        var img;
        if (activity.activities[i].assets && activity.activities[i].assets.large_image) {
          img = activity.activities[i].assets.large_image
        } else if (activity.activities[i].assets && activity.activities[i].assets.small_image) {
          img = activity.activities[i].assets.small_image
        } else {
          img = null
        }
        var imgUrl;
        if (img) {
          if (img.includes("mp:external/")) {
            imgUrl = img.replace("mp:external/", "https://media.discordapp.net/external/")
          } else {
            imgUrl = `https://cdn.discordapp.com/app-assets/${activity.activities[i].application_id}/${img}.png?size=300`
          }
        } else {
          imgUrl = "https://raw.githubusercontent.com/NYRI4/Discolored/e0a63e07fbfee073483210feb7778245addb0ce2/assets/arcades.svg"
        }
        p = {
          image: imgUrl,
          id: activity.activities[i].application_id,
          name: activity.activities[i].name,
          state: activity.activities[i].state,
          details: activity.activities[i].details,
          large_text: activity.activities[i].assets ? activity.activities[i].assets.large_text: null
        }
        break
      }
    }
  }

  return (
    <>
    <div className="App bg-gray-900">
      <Spotify spotify={activity ? activity.spotify : null} className="hidden "/>
      {/* <p className="absolute top-3 left-3 text-2xl text-white"><i className="bx bxl-discord-alt align-middle"></i> <span class="font-bold">playing</span> {p ? p.name.toLowerCase() : null} </p> */}
      <header className="App-header">
        <Image width="160px" height="160px" src={du.avatar ? `https://cdn.discordapp.com/avatars/536644802595520534/${du.avatar}.webp?size=160` : profilePic} priority className="rounded-full m-auto w-fit relative" alt="profile"/>
        <h1 className="headertext font-bold sm:tagline text-gradient bg-gradient-to-r from-blue-500 to-purple-500 m-0 sm:text-small">
          heyo, i'm thrizzle.
        </h1>
        <Presence presence={p} />
        <div className="links mt-5 flex align-middle">
          <a href="https://github.com/terabyte3" className="text-white transition-all ease-in-out duration-1000 hover:scale-125 mx-3 leading-tight">
            <i className="bx bxl-github my-auto" title='github'></i>
          </a>
          <a href="https://fermi.terabyteis.me" className="text-white transition-all ease-in-out duration-1000 hover:scale-125 mx-3 leading-tight">
            <i className="bx bx-planet h-full" title='planet'></i>
          </a>
          <a href="https://crust.terabyteis.me" className="text-white transition-all ease-in-out duration-1000 hover:scale-125 mx-3 leading-tight">
            <i className="bx bx-square-rounded h-full" title='square'></i>
          </a>
        </div>
        <div className='hidden md:flex w-1/2 items-center'>
          <Grid.Container gap={2} justify="center" wrap='wrap' className='max-w-3/4 p-5'>
            <Projects/>
          </Grid.Container>
        </div>
      </header>
    </div>
    </>
  );
}

function return_app() {
  return (
    // <GeistProvider>
    // <CssBaseline />
    <App />
  // </GeistProvider>
  )
}

export default return_app
