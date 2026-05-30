// Hotlinked assets from elevenaviation.com for prototyping.
// Replace with self-hosted /public/testing/ files before shipping.
export const CDN = "https://elevenaviation-anendqhwcsfwcjaf.z03.azurefd.net";

export const ASSETS = {
  logo: `${CDN}/images/logos/logo.svg`,
  heroVideo: `${CDN}/images/video/clouds.mp4`,
  downArrow: `${CDN}/images/vectors/Arrow%201%20(1).svg`,
  icons: {
    feather: `${CDN}/images/Elevated%20Vectors/Feather.svg`,
    eyeDollar: `${CDN}/images/Elevated%20Vectors/EyeDollar.svg`,
    shieldPlus: `${CDN}/images/Elevated%20Vectors/ShieldPLus.svg`,
  },
  fleet: {
    N11CP: `${CDN}/images/N11CP/Downscaled/DSC07413.jpg`,
    N224MZ: `${CDN}/images/N224MZ/Downscaled/DSC06607-2.jpg`,
    N11HM: `${CDN}/images/N11HM/Downscaled/DSC00511.jpg`,
    N523JG: `${CDN}/images/N523JG/Downscaled/DSC06479-2.jpg`,
  } as Record<string, string>,
};
