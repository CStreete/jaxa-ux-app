import { NextPage } from "next"
import { Logo } from "@/components/hero-components/logo"
import { Hero } from "@/components/hero-components/hero"

interface Props {}

const Index: NextPage<Props> = ({}) => {
  return (
    <div className="home">
      <header>
        <Logo foodieLogo={"./Loggo_B&W.png"} />
      </header>
      <section>
        <Hero
          heroTitle="Dela, smaka och utvecklas!"
          heroText="Foodie skapades av ett gäng matälskare
          som ville dela med sig av egna recept och 
          kunna njuta av andras fräcka tips!"
          bulletOne="Publicera recept"
          bulletTwo="Få uppskattning"
          bulletThree="Nya smaker "
          ctaText="Kom igång"
        />
        L
      </section>
    </div>
  )
}

export default Index
