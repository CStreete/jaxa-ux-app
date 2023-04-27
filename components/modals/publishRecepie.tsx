import NewRecepiePopUpTableOption from "../newRecepieComponents/newRecepiePopUpTableOption"
import IngredienserRecepieFrom from "../newRecepieComponents/ingredienserRecepieFrom"
import AddfieldForm from "../newRecepieComponents/addfieldForm"
import TillvagagongForm from "../newRecepieComponents/tillvagagongForm"
import { SyntheticEvent, useEffect, useState } from "react"
import { FormButton } from "../form-components/form-button"
import useCurrentUser from "@/hooks/useCurrentUser"
import { ImageUpload } from "./imageUpload"
import handleUpload from "@/libs/testUpload"
import KuriosaForm from "../newRecepieComponents/kuriosaForm"
import CategoriForm from "../newRecepieComponents/categoriForm"

type Recepie = {
  title: string
  time: string
  servings: string
  ingredients: [{}]
  intructions: [{}]
  authorId: string
  image: string
  kuriosa: string
  category: string
}

interface Input {
  id: number
  value: string
}

const RecepieModule = ({}) => {
  const { data: currentUser } = useCurrentUser()

  const [image, setImage] = useState<File | null>(null)
  const [url, setURL] = useState("")

  const [recepie, setRecepie] = useState<Recepie>({
    title: "",
    time: "",
    servings: "",
    ingredients: [{ id: 1, value: "" }],
    intructions: [{ id: 1, value: "" }],
    authorId: "",
    image: "",
    kuriosa: "",
    category: "",
  })

  const [inputs, setInputs] = useState<Input[]>([
    { id: 1, value: "" },
    { id: 2, value: "" },
    { id: 3, value: "" },
  ])

  const [instructionInputs, setinstructionInputs] = useState<Input[]>([
    { id: 1, value: "" },
    { id: 2, value: "" },
    { id: 3, value: "" },
  ])

  const handleAddInput = () => {
    const newId = inputs[inputs.length - 1].id + 1
    setInputs([...inputs, { id: newId, value: "" }])
  }

  const handleAddInputInstructions = () => {
    const iID = instructionInputs[instructionInputs.length - 1].id + 1
    setinstructionInputs([...instructionInputs, { id: iID, value: "" }])
  }

  const handleRemoveInput = (id: number) => {
    const updatedInputs = inputs.filter((input) => input.id !== id)
    setInputs(updatedInputs)
  }

  const handleRemoveInstructionInput = (id: number) => {
    const updatedInputs = instructionInputs.filter((input) => input.id !== id)
    setinstructionInputs(updatedInputs)
  }

  const handleInputChange = (id: number, value: string) => {
    const updatedInputs = inputs.map((input) =>
      input.id === id ? { ...input, value } : input
    )
    setInputs(updatedInputs)
  }

  const handleInstructionInputChange = (id: number, value: string) => {
    const updatedInputs = instructionInputs.map((input) =>
      input.id === id ? { ...input, value } : input
    )
    setinstructionInputs(updatedInputs)
  }

  const inputValues = inputs.map((input) => input.value)

  const instructionValues = instructionInputs.map((inputs) => inputs.value)

  const upload = async () => {
    await handleUpload({ imageUpload: image, setUrl: setURL })
  }

  const body = {
    authorId: currentUser?.id,
    title: recepie.title,
    time: recepie.time,
    image: url,
    servings: recepie.servings,
    ingredients: inputValues,
    intructions: instructionValues,
    kuriosa: recepie.kuriosa,
    category: recepie.category,
  }

  const onSubmit = async (e: SyntheticEvent) => {
    e.preventDefault()
    console.log(recepie.image)

    const data = await fetch(
      "http://localhost:3000/api/recepies/createrecepie",
      {
        method: "POST",
        body: JSON.stringify(body),
        headers: { "Content-Type": "application/json" },
      }
    )
    const res = await data.json()
    console.log(res)
  }

  return (
    <>
      <form onSubmit={onSubmit} className="">
        <div className=" pt-8  px-6">
          <div>
            <input
              type="text"
              placeholder="Namn på maträtt"
              value={recepie.title}
              className="border rounded-md w-full h-12 px-2 font-sans shadow-lg"
              onChange={(e) =>
                setRecepie({ ...recepie, title: e.target.value })
              }
            />
          </div>
          <div className="flex items-center justify-center pt-5">
            <label
              htmlFor="dropzone-file"
              className="flex justify-center w-96 h-52 bg-secondarypink rounded-md shadow-lg"
            >
              <div className="flex flex-col items-center justify-center ">
                <img src="image 60.svg" alt="foto link" />
                <p className="text-xl">Lägg till en bild</p>
                <button
                  className="p-2 bg-slate-600 mt-5"
                  type="button"
                  onClick={() => upload()}
                >
                  Upload Image
                </button>
                <br />
              </div>
              <input
                id="dropzone-file"
                type="file"
                className="hidden"
                onChange={(e: any) => {
                  setImage(e.target.files[0])
                }}
              />
            </label>
          </div>
          <h2>{url}</h2>
          <NewRecepiePopUpTableOption
            name="Antal portioner"
            a={"2"}
            b={"4"}
            c={"6"}
            d={"8"}
            value={recepie.servings}
            onChange={(e) =>
              setRecepie({ ...recepie, servings: e.target.value })
            }
          />

          <NewRecepiePopUpTableOption
            name="Tid"
            a={"5"}
            b={"15"}
            c={"45"}
            d={"60"}
            value={recepie.time}
            onChange={(e) => setRecepie({ ...recepie, time: e.target.value })}
          />

          <div className=" pt-12">
            <h2 className="  font-title font-bold text-2xl">Ingredienser</h2>
          </div>

          {inputs.map((inputs) => (
            <IngredienserRecepieFrom
              placeholderProp={"Ingrediens"}
              key={inputs.id}
              siffra={inputs.id}
              value={inputs.value}
              onClick={() =>
                inputs.id < 4 ? null : handleRemoveInput(inputs.id)
              }
              onChange={(e) => handleInputChange(inputs.id, e.target.value)}
            />
          ))}

          <AddfieldForm
            placeholderProp={"Lägg till ingrediens"}
            onClick={handleAddInput}
          />

          <div className=" pt-12">
            <h2 className="  font-title font-bold text-2xl">
              Tillvägagångssätt
            </h2>
          </div>

          {instructionInputs.map((inputs) => (
            <TillvagagongForm
              placeholderProp={"Steg"}
              key={inputs.id}
              siffra={inputs.id}
              value={inputs.value}
              onClick={() =>
                inputs.id < 4 ? null : handleRemoveInstructionInput(inputs.id)
              }
              onChange={(e) =>
                handleInstructionInputChange(inputs.id, e.target.value)
              }
            />
          ))}

          <AddfieldForm
            placeholderProp={"Lägg till steg"}
            onClick={handleAddInputInstructions}
          />

          <div className=" pt-12">
            <h2 className="  font-title font-bold text-2xl">Kuriosa</h2>
          </div>
          <div className="flex w-full items-center pt-4">
            <KuriosaForm
              placeholderProp={"Vad vill du berätta?"}
              value={recepie.kuriosa}
              onChange={(e) =>
                setRecepie({ ...recepie, kuriosa: e.target.value })
              }
            />
          </div>

          <div className=" mt-14 bg-red-200">
            <h2 className="  font-title font-bold text-2xl">Kategori</h2>
            <CategoriForm
              name={"Lägg till tagg"}
              a={"1"}
              b={"2"}
              c={"3"}
              d={"4"}
              e={"5"}
              f={"6"}
              value={recepie.category}
              onChange={(e) =>
                setRecepie({
                  ...recepie,
                  category: e.target.value,
                })
              }
            />
          </div>
          <div className="w-full text-center">
            <FormButton
              value={"Publicera"}
              type={"submit"}
              className="rounded-md mt-10 h-12 border bg-secondaryRed text-white"
            />
          </div>
        </div>
      </form>
    </>
  )
}

export default RecepieModule