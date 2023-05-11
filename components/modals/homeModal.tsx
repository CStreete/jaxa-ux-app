import { useEffect, useState } from "react"
import { NextPage } from "next"
import { useRouter } from "next/router"

type recepieProps = {
  title?: string
  image?: string
  time?: string
  id?: string
  category?: string

  author?: {
    username: string
    profileImage: string
    id: string
  }
}

const RenderOutRecepiesModals: NextPage<recepieProps> = ({}) => {
  // State för lagra all recipes
  const [data, setData] = useState<recepieProps[]>([])

  // State för lagra filtrerad recipes baserad på category
  const [filteredData, setFilteredData] = useState<recepieProps[]>([])

  // State för lagra the valda category
  const [category, setCategory] = useState<string[]>([])

  const [showMoreCategories, setShowMoreCategories] = useState(false)

  /* Tillfällig lösning för färg på varje knapp om klickad på och vid Rensa val sätt all värg till default HACK*/
  const [button1Active, setButton1Active] = useState(false)
  const [button2Active, setButton2Active] = useState(false)
  const [button3Active, setButton3Active] = useState(false)
  const [button4Active, setButton4Active] = useState(false)
  const [button5Active, setButton5Active] = useState(false)
  const [button6Active, setButton6Active] = useState(false)
  const [button7Active, setButton7Active] = useState(false)
  const [button8Active, setButton8Active] = useState(false)

  const handleButton1Click = () => {
    setButton1Active(!button1Active)
  }

  const handleButton2Click = () => {
    setButton2Active(!button2Active)
  }

  const handleButton3Click = () => {
    setButton3Active(!button3Active)
  }

  const handleButton4Click = () => {
    setButton4Active(!button4Active)
  }

  const handleButton5Click = () => {
    setButton5Active(!button5Active)
  }

  const handleButton6Click = () => {
    setButton6Active(!button6Active)
  }

  const handleButton7Click = () => {
    setButton7Active(!button7Active)
  }

  const handleButton8Click = () => {
    setButton8Active(!button8Active)
  }

  const colorOffButtons = () => {
    setButton1Active(false)
    setButton2Active(false)
    setButton3Active(false)
    setButton4Active(false)
    setButton5Active(false)
    setButton6Active(false)
    setButton7Active(false)
    setButton8Active(false)
  }
  /* Fortsättning på vanlig kod */

  const handleToggle = () => {
    setShowMoreCategories(!showMoreCategories)
  }

  const router = useRouter()

  // Handle click event when a recipe is clicked
  const handleClick = (id: any) => {
    router.push(`/home/${id}`)
  }

  // Function to fetch recipe data from the API
  const recepieData = async () => {
    const res = await fetch("/api/nestedFetch")
    const recepies = await res.json()
    setData(recepies)
    setFilteredData(recepies)
  }

  // Fetch recipe data när component mounts
  useEffect(() => {
    recepieData()
  }, [])

  // Hantera category filter selection
  const handleCategoryFilter = (selectCategory: any) => {
    const updatedCategories = category.includes(selectCategory)
      ? category.filter((category) => category !== selectCategory)
      : [...category, selectCategory]
    setCategory(updatedCategories)

    // Om ingen category är vald, vissa alla recept
    if (updatedCategories.length === 0) {
      setFilteredData(data)

      // filtrerar recepten beroende på i vilken category som är vald
    } else {
      const filteredRecepies = data.filter((recipe) =>
        updatedCategories.includes(recipe.category)
      )
      setFilteredData(filteredRecepies)
    }
  }

  return (
    <div
      className={`bg-anotherpink flex items-center flex-col justify-center space-y-4`}
    >
      <div className="">
        <div className="flex justify-center space-x-4 mx-4 ">
          {/* Button för "Pasta" category */}
          <button
            type="button"
            className={` p-1 px-5 rounded-full mt-5 shadow-lg focus:border-none border-[1px] "border-primaryPink" : "border-black/20"
            
              ${button1Active ? "bg-primaryPink" : "bg-white"}

            `}
            onClick={() => {
              handleCategoryFilter("Pasta")
              handleButton1Click()
            }}
          >
            Pasta
          </button>

          {/* Button för "Vegetariskt" category */}
          <button
            type="button"
            className={`p-1 px-5 rounded-full mt-5 shadow-lg focus:border-none border-[1px] "border-primaryPink" : "border-black/20"
            ${button2Active ? "bg-primaryPink" : "bg-white"}
            `}
            onClick={() => {
              handleCategoryFilter("Vegetariskt")
              handleButton2Click()
            }}
          >
            Vegetariskt
          </button>
          {/* Button för "Fågel" category */}
          <button
            type="button"
            className={` p-1 px-5 rounded-full mt-5 shadow-lg focus:border-none border-[1px] "border-primaryPink" : "border-black/20"
          ${button3Active ? "bg-primaryPink" : "bg-white"}
          }`}
            onClick={() => {
              handleCategoryFilter("Fågel")
              handleButton3Click()
            }}
          >
            Fågel
          </button>

          {/* Button för "Extra" category */}
          <button
            className="w-9 h-9 bg-white mt-5 rounded-full bottom-2 right-2 shadow-lg focus:border-none border-[1px]"
            type="button"
            onClick={handleToggle}
          >
            <span className="text-secondaryBlack text-xl">+</span>
          </button>
        </div>

        {/* Extra */}
        {showMoreCategories && (
          <div
            data-modal
            className=" top-0 w-full h-auto mt-[17rem] bg-anotherpink rounded-3xl  fixed items-center justify-center z-10 focus:border-none border-[3px] shadow-2xl shadow-black"
          >
            <div className="flex justify-end mr-4 mt-4 ">
              <button onClick={handleToggle}>
                <img src="/X.png" alt="Kryss knapp" />
              </button>
            </div>
            <div className="flex justify-center  ">
              <p className="font-sans">Välj dina favoriter!</p>
            </div>

            <div className="ml-4  mb-3 space-x-3 space-y-4">
              <button
                type="button"
                className={` ml-4 p-1 px-5 rounded-full  shadow-lg focus:border-none border-[1px] "border-primaryPink" : "border-black/20"
          ${button1Active ? "bg-primaryPink" : "bg-white"}
              }`}
                onClick={() => {
                  handleCategoryFilter("Pasta")
                  handleButton1Click()
                }}
              >
                Pasta
              </button>

              {/* Button för "Vegetariskt" category */}
              <button
                type="button"
                className={` p-1 px-5 rounded-full  shadow-lg  focus:border-none border-[1px] "border-primaryPink" : "border-black/20"
          ${button2Active ? "bg-primaryPink" : "bg-white"}
                `}
                onClick={() => {
                  handleCategoryFilter("Vegetariskt")
                  handleButton2Click()
                }}
              >
                Vegetariskt
              </button>
              {/* Button för "Fågel" category */}
              <button
                type="button"
                className={`p-1 px-5 rounded-full shadow-lg focus:border-none border-[1px] "border-primaryPink" : "border-black/20"
         ${button3Active ? "bg-primaryPink" : "bg-white"}
              }`}
                onClick={() => {
                  handleCategoryFilter("Fågel")
                  handleButton3Click()
                }}
              >
                Fågel
              </button>
              <button
                className={` p-1 px-5 rounded-full  shadow-lg focus:border-none border-[1px] "border-primaryPink" : "border-black/20"
          ${button4Active ? "bg-primaryPink" : "bg-white"}
              }`}
                onClick={() => {
                  handleCategoryFilter("Fisk och skaldjur")
                  handleButton4Click()
                }}
              >
                Fisk och skaldjur
              </button>
              <button
                className={` p-1 px-5 rounded-full shadow-lg focus:border-none border-[1px] "border-primaryPink" : "border-black/20"
         ${button5Active ? "bg-primaryPink" : "bg-white"}
              }`}
                onClick={() => {
                  handleCategoryFilter("Kött och chark")
                  handleButton5Click()
                }}
              >
                Kött och chark
              </button>
              <button
                className={` p-1 px-5 rounded-full shadow-lg focus:border-none border-[1px] "border-primaryPink" : "border-black/20"
         ${button6Active ? "bg-primaryPink" : "bg-white"}
              }`}
                onClick={() => {
                  handleCategoryFilter("Bakning")
                  handleButton6Click()
                }}
              >
                Bakning
              </button>
              <button
                className={` p-1 px-5 rounded-full shadow-lg focus:border-none border-[1px] "border-primaryPink" : "border-black/20"
         ${button7Active ? "bg-primaryPink" : "bg-white"}
              }`}
                onClick={() => {
                  handleCategoryFilter("Dessert")
                  handleButton7Click()
                }}
              >
                Dessert
              </button>
              <button
                className={` p-1 px-5 rounded-full shadow-lg focus:border-none border-[1px] "border-primaryPink" : "border-black/20"
          ${button8Active ? "bg-primaryPink" : "bg-white"}
              }`}
                onClick={() => {
                  handleCategoryFilter("Dryck")
                  handleButton8Click()
                }}
              >
                Dryck
              </button>
              <div className="flex justify-end pr-[16px]">
                <button
                  className={`bg-white p-1 px-3 rounded-full shadow-2xl focus:border-none border-[1px] "border-primaryPink" : "border-black/20"
                }`}
                  onClick={() => {
                    setCategory([])
                    setFilteredData(data)
                    colorOffButtons()
                  }}
                >
                  <p className="flex">
                    Rensa val
                    <span className="mt-1 ml-1">
                      <img src="/Trash.png" alt="Rensa val" />
                    </span>
                  </p>
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Renderar filtrerad recipes */}
        {filteredData.map((item) => (
          <div className=" mt-5 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 m-4">
            <div
              className="bg-primaryPink rounded-lg"
              onClick={() => handleClick(item.id)}
            >
              {/* Vissar recipe bild */}
              <img
                src={item.image}
                alt="image"
                width={550}
                height={100}
                className="object-cover rounded-lg w-100 h-52"
              />
              {/* Vissar recipe title */}
              <p className="font-title font-medium text-2xl pl-2 pt-2 ">
                {item.title}
              </p>
              <div className=" pl-2 pt-1 flex  items-center">
                <img
                  src="/Profil icon.png"
                  alt="profil icon"
                  className=" h-4 w-4"
                />

                {/* Vissar author namn */}
                <p className="pl-4 font-sans text-1xl font-medium">
                  {item.author?.username}
                </p>
              </div>
              <div className=" pl-2 pt-1 pb-2 flex  items-center">
                <div>
                  <img src="/klocka.png" alt="klocka" />
                </div>

                {/* Vissar recipe till lagningstid */}
                <p className="pl-4 font-sans font-medium text-1xl">
                  {item.time} min
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default RenderOutRecepiesModals
