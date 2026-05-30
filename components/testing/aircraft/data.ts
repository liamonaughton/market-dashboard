import { ASSETS, CDN } from "../cdn";

export interface AircraftStats {
  flightHours: string;
  nauticalMiles: string;
  passengers: string;
  luggage: string;
}

export interface KV {
  label: string;
  value: string;
}

export interface AircraftTabContent {
  interior?: { images: string[] };
  performance?: { images: string[]; specs: KV[] };
  layout?: { images: string[]; dimensions?: KV[] };
  amenities?: string[];
}

export interface Aircraft {
  slug: string;
  tail: string;
  name: string;
  hero: string;
  pdf: string;
  description: string;
  stats: AircraftStats;
  gallery?: string[];
  tabs?: AircraftTabContent;
}

const N224MZ_DIR = `${CDN}/images/N224MZ/Downscaled`;
const N224MZ_GALLERY = [
  `${N224MZ_DIR}/DSC06607-2.jpg`,
  `${N224MZ_DIR}/DSC06265-2.jpg`,
  `${N224MZ_DIR}/DSC06296-2.jpg`,
  `${N224MZ_DIR}/DSC06201-2.jpg`,
  `${N224MZ_DIR}/DSC06224-2.jpg`,
  `${N224MZ_DIR}/DSC06287-2.jpg`,
  `${N224MZ_DIR}/DSC06290-2.jpg`,
  `${N224MZ_DIR}/DSC06312-2.jpg`,
  `${N224MZ_DIR}/DSC06549-2.jpg`,
];

export const AIRCRAFT: Aircraft[] = [
  {
    slug: "citation-xl",
    tail: "N11CP",
    name: "Citation XL",
    hero: ASSETS.fleet.N11CP,
    pdf: ASSETS.pdfs.N11CP,
    description:
      "The Citation XL is a nimble, high-performance business jet designed to blend efficiency with modern comfort. Tailored for discerning executives, this aircraft delivers a refined in-flight experience that balances sleek aesthetics with reliable performance.",
    stats: {
      flightHours: "4.3 hrs",
      nauticalMiles: "1,843 nm",
      passengers: "8",
      luggage: "12",
    },
  },
  {
    slug: "gulfstream-g200-n224mz",
    tail: "N224MZ",
    name: "Gulfstream G200",
    hero: ASSETS.fleet.N224MZ,
    pdf: ASSETS.pdfs.N224MZ,
    description:
      "The Gulfstream G200 in this configuration offers a refined blend of performance and comfort, emphasizing efficiency and a sophisticated cabin experience. Designed with precision, it delivers a smooth, high-speed journey while maintaining a distinctly executive ambiance.",
    stats: {
      flightHours: "5.75 hrs",
      nauticalMiles: "2,700 nm",
      passengers: "9",
      luggage: "20",
    },
    gallery: N224MZ_GALLERY,
    tabs: {
      interior: {
        images: [
          `${N224MZ_DIR}/DSC06265-2.jpg`,
          `${N224MZ_DIR}/DSC06296-2.jpg`,
          `${N224MZ_DIR}/DSC06287-2.jpg`,
          `${N224MZ_DIR}/DSC06290-2.jpg`,
        ],
      },
      performance: {
        images: [
          `${N224MZ_DIR}/DSC06549-2.jpg`,
          `${N224MZ_DIR}/DSC06201-2.jpg`,
        ],
        specs: [
          { label: "Max Range", value: "2,700 nm" },
          { label: "Max Speed", value: "470 ktas" },
          { label: "Max Altitude", value: "45,000 ft" },
          { label: "Takeoff Distance", value: "5,700 ft" },
        ],
      },
      layout: {
        images: [
          `${N224MZ_DIR}/DSC06224-2.jpg`,
          `${N224MZ_DIR}/DSC06312-2.jpg`,
        ],
        dimensions: [
          { label: "Cabin Length", value: "24 ft 5 in" },
          { label: "Cabin Width", value: "7 ft 2 in" },
          { label: "Cabin Height", value: "6 ft 3 in" },
          { label: "Cabin Volume", value: "868 cu ft" },
        ],
      },
      amenities: [
        "Wi-Fi connectivity",
        "Refreshment center",
        "Power outlets at every seat",
        "Enclosed lavatory",
        "Baggage compartment accessible in flight",
        "Climate-controlled cabin",
      ],
    },
  },
  {
    slug: "gulfstream-g200",
    tail: "N11HM",
    name: "Gulfstream G200",
    hero: ASSETS.fleet.N11HM,
    pdf: ASSETS.pdfs.N11HM,
    description:
      "The Gulfstream G200 is a super-midsize business jet that delivers transcontinental range, exceptional comfort, and high-speed performance. Originally developed as the IAI Galaxy before being acquired by Gulfstream, the G200 offers a spacious cabin, cutting-edge avionics, and impressive efficiency. Designed for executives and discerning travelers, this aircraft strikes a perfect balance between cost-effectiveness and luxury.",
    stats: {
      flightHours: "5.75 hrs",
      nauticalMiles: "2,700 nm",
      passengers: "10",
      luggage: "20",
    },
  },
  {
    slug: "challenger-604",
    tail: "N523JG",
    name: "Challenger 604",
    hero: ASSETS.fleet.N523JG,
    pdf: ASSETS.pdfs.N523JG,
    description:
      "The Bombardier Challenger 604 is a large-cabin business jet known for its comfort, range, and reliability. With seating for up to 12 passengers, it offers a spacious stand-up cabin, wide seats, and a smooth ride ideal for both business and leisure travel. The Challenger 604 has a range of approximately 4,000 nautical miles, allowing for nonstop transcontinental and international flights. Combining performance with comfort, it remains one of the most popular and versatile jets in its class.",
    stats: {
      flightHours: "7 hrs",
      nauticalMiles: "4,000 nm",
      passengers: "12",
      luggage: "20",
    },
  },
];

export function getAircraftBySlug(slug: string): Aircraft | undefined {
  return AIRCRAFT.find((a) => a.slug === slug);
}

export const TAIL_TO_SLUG: Record<string, string> = AIRCRAFT.reduce(
  (acc, a) => {
    acc[a.tail] = a.slug;
    return acc;
  },
  {} as Record<string, string>
);
