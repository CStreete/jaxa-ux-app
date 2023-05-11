import Image from "next/image"
import Link from "next/link"

interface HeroProps {
  heroTitle: string
  heroText: string
  bulletOne: string
  bulletTwo: string
  bulletThree: string
  ctaText: string
}

export const Hero = ({
  heroTitle,
  heroText,
  bulletOne,
  bulletTwo,
  bulletThree,
  ctaText,
}: HeroProps) => {
  return (
    <div className="">
      <div className="absolute bottom-0 -z-20"></div>
      <div className="mx-5 pt-10">
        <h1 className="text-center text-3xl font-title font-bold ">
          {heroTitle}
        </h1>
      </div>
      <div className="flex justify-center px-2 pt-4  mx-2">
        <p className="text-center font-normal text-lg w-6/6">{heroText}</p>
      </div>
      <div className="flex pl-3 pt-9">
        <ul className="list-disc pl-10 space-y-3 text-lg w-full">
          <li className="">{bulletOne}</li>
          <li>{bulletTwo}</li>
          <li>{bulletThree}</li>
        </ul>
        <div className="flex w-full justify-end bottom-32  right-0 -z-10">
          <Image
            src={"/Sparris_tallrik.png"}
            width={200}
            height={0}
            alt="picture of vegatables"
          ></Image>
        </div>
      </div>

      <div className="flex justify-center items-end ">
        <Link
          className="font-semibold text-md cursor-pointer bg-crimsonRed text-white px-7 py-4 rounded-full shadow-md shadow-black/25"
          href={"/auth"}
        >
          {ctaText}
        </Link>
      </div>
    </div>
  )
}

/*
const HeroTitle = ({ heroTitle }: Hero) => {
  return (
    <h1 className="text-center pt-6 pb-3 text-3xl font-title font-bold">
      {heroTitle}
    </h1>
  )
}

const HeroText = ({ heroText }: Hero) => {
  return (
    <div className="flex justify-center">
      <p className="text-center font-normal text-xl w-5/6">{heroText}</p>
    </div>
  )
}

const HeroBullets = ({ heroText, heroImage }: Hero) => {
  return (
    <div className="">
      <li className=" list-none flex items-center space-x-3 text-2xl font-semibold pt-10 pl-8 pr-8">
        <img src={`${heroImage}`} alt="recipe book icon" />
        <span>{heroText}</span>
      </li>
    </div>
  )
}

const HeroBackGroundImage = ({ heroImage: heroBackground }: Hero) => {
  return (
    <div className="absolute bottom-0 -z-20">
      <img width={250} src={`${heroBackground}`} alt="picture of vegatables" />
    </div>
  )
}

const HeroImage = ({ heroImage }: Hero) => {
  return (
    <div className="absolute bottom-16 right-0 -z-10">
      <img width={200} src={`${heroImage}`} alt="picture of plate" />
    </div>
  )
}

const HeroButton = ({ heroText }: Hero) => {
  return (
    <div className="flex justify-center h-72 items-end pb-3">
      <button className=" cursor-pointer bg-secondaryWhite px-7 py-4 rounded-3xl shadow-sm  shadow-black">
        {heroText}
      </button>
    </div>
  )
}*/
