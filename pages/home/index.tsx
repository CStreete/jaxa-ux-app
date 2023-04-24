import { Layout } from "@/components/layout"
import RenderOutRecepiesModals from "@/components/modals/homeModal"
import Utforska from "@/components/modals/utforska"
import RecepieModule from "@/components/modals/publishRecepie"
import RubrikRecepieFormView from "@/components/newRecepieComponents/rubrikRecepieFormView"
import useCurrentUser from "@/hooks/useCurrentUser"
import { NextPage } from "next"
import { useSession } from "next-auth/react"
import { useEffect, useState } from "react"

interface Props {}

const Index: NextPage<Props> = ({}) => {
  const [action, setAction] = useState("explore")
  const [background, setBackground] = useState("bg-white")
  const { data: session, status } = useSession()

  const handleExploreClick = () => {
    setAction("explore")
    setBackground("bg-anotherpink")
  }
  const handlePublishClick = () => {
    setAction("publish")
    setBackground("bg-primaryPink")
  }

  return (
    <>
      <Layout bg={background}>
        <div>Inloggad som {session?.user?.email}</div>
        <RubrikRecepieFormView
          onExploreClick={handleExploreClick}
          onPublishClick={handlePublishClick}
          exploreDisabled={action === "explore"}
          publishDisabled={action === "publish"}
        />
        {action == "explore" ? <Utforska /> : <RecepieModule />}
      </Layout>
    </>
  )
}

export default Index
