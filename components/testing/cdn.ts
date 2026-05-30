// Hotlinked assets from elevenaviation.com for prototyping.
// Replace with self-hosted /public/testing/ files before shipping.
export const CDN = "https://elevenaviation-anendqhwcsfwcjaf.z03.azurefd.net";

export const ASSETS = {
  logo: `${CDN}/images/logos/logo.svg`,
  darkLogo: `${CDN}/images/logos/DarkLogo.svg`,
  heroVideo: `${CDN}/images/video/clouds.mp4`,
  downArrow: `${CDN}/images/vectors/Arrow%201%20(1).svg`,
  icons: {
    feather: `${CDN}/images/Elevated%20Vectors/Feather.svg`,
    eyeDollar: `${CDN}/images/Elevated%20Vectors/EyeDollar.svg`,
    shieldPlus: `${CDN}/images/Elevated%20Vectors/ShieldPLus.svg`,
  },
  managementIcons: {
    dollar: `${CDN}/images/Management%20Vectors/Dollar.svg`,
    eye: `${CDN}/images/Management%20Vectors/Eye.svg`,
    gear: `${CDN}/images/Management%20Vectors/Gear.svg`,
    thumbsUp: `${CDN}/images/Management%20Vectors/ThumbsUp.svg`,
    peopleTime: `${CDN}/images/Management%20Vectors/PeopleTime.svg`,
  },
  managementHero: {
    management: `${CDN}/images/siteImages/angela-ungurean-4Gpaso7YC50-unsplash.jpg`,
    maintenance: `${CDN}/images/siteImages/patrick-tomasso-j1dj50Td7CQ-unsplash.jpg`,
    hangarage: `${CDN}/images/siteImages/the-adaptive-dvCym_RQWrU-unsplash.jpg`,
    acquisition: `${CDN}/images/siteImages/yuvraj-singh-508Np5P-LM8-unsplash.jpg`,
  },
  portraits: {
    alec: `${CDN}/images/Portraits/DSC09905.jpeg`,
    candice: `${CDN}/images/Portraits/DSC00557.jpg`,
    karl: `${CDN}/images/Portraits/DSC06444.jpg`,
  },
  company: {
    weAre: `${CDN}/images/N224MZ/Downscaled/DSC06287-2.jpg`,
    skier: `${CDN}/images/siteImages/unsplash_Pf6e3o0GL4M.png`,
  },
  fleet: {
    N11CP: `${CDN}/images/N11CP/Downscaled/DSC07413.jpg`,
    N224MZ: `${CDN}/images/N224MZ/Downscaled/DSC06607-2.jpg`,
    N11HM: `${CDN}/images/N11HM/Downscaled/DSC00511.jpg`,
    N523JG: `${CDN}/images/N523JG/Downscaled/DSC06479-2.jpg`,
  } as Record<string, string>,
};
