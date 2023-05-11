import SearchResultModal from "@/components/modals/searchResultModal"
import SingleRecepieModule from "@/components/modals/singleRecepieModule"
import RubrikRecepieFormView from "@/components/newRecepieComponents/rubrikRecepieFormView"

import Link from "next/link"
import { useRouter } from "next/router"
import React, { useEffect, useState } from "react"

type recpieData = {
  title: string
  servings: string
  time: string
  ingredients: [string]
  intructions: [string]
  kuriosa: string
  image: string
  id: any
  author: {
    username: string
    profileImage: string
  }
}

const RecepieView = ({}) => {
  const [data, setData] = useState<recpieData>()
  const [action, setAction] = useState("Ingredienser")

  const router = useRouter()
  const id = router.query.recepieID

  const recepieData = async () => {
    const res = await fetch(`/api/recepies/${id}`)
    const recepies = await res.json()
    setData(recepies)
  }

  const handleIngredienserClick = () => {
    setAction("Ingredienser")
  }
  const handleDoLikeThisClick = () => {
    setAction("DoLikeThis")
  }

  const { q } = router.query //tina**
  const [encodedSearchQuery, setEncodedSearchQuery] = useState<string>(
    q ? q.toString() : ""
  )

  const handleClick = (id: any) => {
    console.log("detta händer när jag klickar tillbaka", encodedSearchQuery)
    if (encodedSearchQuery) {
      router.push(`/home?q=${encodedSearchQuery}`)
    } else {
      router.push("/home/")
    }
  }

  useEffect(() => {
    recepieData()
  }, [])

  return (
    <div className="" key={data?.id}>
      <div className="bg-anotherpink flex items-center flex-col justify-center space-y-4 ">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="bg-primaryPink relative pb-[22px] rounded-md">
            <button
              type="button"
              className="absolute top-2 left-2"
              onClick={handleClick}
            >
              {" "}
              <img src="/Vector.png" alt="tillbakaknapp" />{" "}
            </Link>

            <img
              src={data?.image}
              alt="image"
              width={550}
              height={100}
              className="object-cover rounded-lg w-100 h-52"
            />

            <div className="flex items-center justify-between pt-2 ">
              <p className="font-title font-medium text-2xl pl-2 ">
                {data?.title}
              </p>
              <div className="flex items-center pr-3">
                <div>
                  <img src="/klocka.png" alt="klocka" />
                </div>
                <p className="pl-2 font-sans font-medium text-1xl ">
                  {" "}
                  {data?.time} min
                </p>
              </div>
            </div>

            <div className="flex items-center justify-between pt-[13px] ">
              <div className=" pl-2 flex  items-center">
                <div className="h-4 w-4 bg-crimsonRed rounded-full"></div>
                <p className="pl-2 font-sans text-1xl font-medium">
                  {data?.author?.username}
                </p>
              </div>

              <div className="flex items-center pr-3">
                <div>
                  <img src="/bestikikon 1.png" alt="bestick" />
                </div>
                <p className="pl-4 font-sans font-medium text-1xl">
                  {""}
                  {data?.servings} port
                </p>
              </div>
            </div>
          </div>

          <SingleRecepieModule
            col="bg-crimsonRed"
            displayExpl={action === "Ingredienser" ? "absolute" : "hidden"}
            displayPub={action === "DoLikeThis" ? "absolute" : "hidden"}
            onExploreClick={handleIngredienserClick}
            onPublishClick={handleDoLikeThisClick}
            exploreDisabled={action === "Ingredienser"}
            publishDisabled={action === "DoLikeThis"}
            amount={data?.ingredients.length}
          />
          <div>
            {action === "Ingredienser" ? (
              <div>
                {data?.ingredients.map((item) => (
                  <ul className="pl-6 flex items-center pb-5" key={data.id}>
                    <div className="h-4 w-4 rounded-full border-[1px] border-black bg-white"></div>
                    <li className="pl-4">{item}</li>
                  </ul>
                ))}

                <div className="flex items-center pt-6 ">
                  <p className="font-title font-medium text-2xl pl-6 ">
                    {data?.kuriosa && (
                      <>
                        <div className="flex">
                          <img src="/icons8-chef-hat-100 1.png" alt="" />
                          <h2 className="pl-4 font-title">
                            {" "}
                            {data?.author?.username}s kuriosa
                          </h2>
                        </div>
                        <div className="mt-4 font-sans bg-white">
                          <p>{data?.kuriosa}</p>
                        </div>
                      </>
                    )}
                  </p>
                </div>
              </div>
            ) : (
              <div>
                {data?.intructions.map((item, index) => (
                  <>
                    <ul className="pl-4 flex items-left pb-5 relative">
                      <div className="mt-1 flex justify-center h-6 w-6 rounded-full border-[1px] border-black bg-white absolute">
                        <span>{index + 1}</span>
                      </div>
                      <li className="pl-9">{item}</li>
                    </ul>
                  </>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
export default RecepieView
