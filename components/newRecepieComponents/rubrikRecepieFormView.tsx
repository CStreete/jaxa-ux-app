interface Props {
  onExploreClick: () => void
  onPublishClick: () => void
  exploreDisabled: boolean
  publishDisabled: boolean
}

const RubrikRecepieFormView = (props: Props) => {
  return (
    <div className="">
      {/* bild / exit */}
      <div className="h-[75px] pl-5 pt-8 ">
        <img src="Logo Foodie Black 1 (1).svg" alt="Foodie.logo" />
      </div>
      {/* rubrik */}
      <div className="flex justify-center h-10 space-x-10 text-[30px] mt-14 mb-2">
        <div className="font-title">
          <button
            className="no-underline hover:underline"
            onClick={props.onExploreClick}
            disabled={props.exploreDisabled}
          >
            Utforska
          </button>
        </div>
        <div className="text-[35px]">
          <p>|</p>
        </div>
        <div className="font-title">
          <button
            className="no-underline hover:underline"
            onClick={props.onPublishClick}
            disabled={props.publishDisabled}
          >
            Publicera
          </button>
        </div>
      </div>
    </div>
  )
}

export default RubrikRecepieFormView
