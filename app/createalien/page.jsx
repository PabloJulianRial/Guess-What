"use client"

import html2canvas from "html2canvas"
import { useState } from "react"
import { saveAs } from "file-saver"

export default function CreateAlien(){

const alien = {
    "skinColour": ["purple", "blue", "green"],
    "skinTexture": ["normal", "scaly", "furry"],
    "eyes": [1, 2, 3, 4, 5],
    "horns": [0, 2, 4],
    "eyeColour": ["yellow", "orange", "red"],
    "isFriendly": ["friendly", "unfriendly-a"],
    "hasAntenna": [false, true],
    "planet": ["lava", "desert", "ice"],
  }

  const [skinColourIndex, setSkinColourIndex] = useState(0)
  const [skinTextureIndex, setSkinTextureIndex] = useState(0)
  const [eyesIndex, setEyesIndex] = useState(0)
  const [eyeColourIndex, setEyeColourIndex] = useState(0)
  const [planetIndex, setPlanetIndex] = useState(0)
  const [isFriendlyIndex, setIsFriendlyIndex] = useState(0)
  const [hornsIndex, setHornsIndex] = useState(0)
  const [antennaIndex, setAntennaIndex] = useState(0)
  const [name, setName] = useState("Insert Alien Name")

  function scramble() {
    setSkinColourIndex(Math.floor(Math.random() * alien.skinColour.length))
    setSkinTextureIndex(Math.floor(Math.random() * alien.skinTexture.length))
    setEyesIndex(Math.floor(Math.random() * alien.eyes.length))
    setEyeColourIndex(Math.floor(Math.random() * alien.eyeColour.length))
    setPlanetIndex(Math.floor(Math.random() * alien.planet.length))
    setIsFriendlyIndex(Math.floor(Math.random() * alien.isFriendly.length))
    setHornsIndex(Math.floor(Math.random() * alien.horns.length))
    setAntennaIndex(Math.floor(Math.random() * alien.hasAntenna.length))
  }



  function attributeSetter(attribute, increment) {
    if (attribute === "planet") {
        setPlanetIndex(planetIndex + increment)
    } else if (attribute === "skinTexture") {
        setSkinTextureIndex(skinTextureIndex + increment)
    } else if (attribute === "skinColour") {
        setSkinColourIndex(skinColourIndex + increment)
    } else if (attribute === "eyes") {
        setEyesIndex(eyesIndex + increment)
    } else if (attribute === "eyeColour") {
        setEyeColourIndex(eyeColourIndex + increment)
    } else if (attribute === "horns") {
        setHornsIndex(hornsIndex + increment)
    } else if (attribute === "antenna") {
        setAntennaIndex(increment)
    }
  }

  function attributeRandomizer(attribute){
    if (attribute === "planet") {
        setPlanetIndex(Math.floor(Math.random() * alien.planet.length))
    } else if (attribute === "skinTexture") {
        setSkinTextureIndex(Math.floor(Math.random() * alien.skinTexture.length))
    } else if (attribute === "skinColour") {
        setSkinColourIndex(Math.floor(Math.random() * alien.skinColour.length))
    } else if (attribute === "eyes") {
        setEyesIndex(Math.floor(Math.random() * alien.eyes.length))
    } else if (attribute === "eyeColour") {
        setEyeColourIndex(Math.floor(Math.random() * alien.eyeColour.length))
    } else if (attribute === "planet") {
        setPlanetIndex(Math.floor(Math.random() * alien.planet.length))
    } else if (attribute === "isFriendly") {
        setIsFriendlyIndex(Math.floor(Math.random() * alien.isFriendly.length))
    } else if (attribute === "antenna") {
        setAntennaIndex(Math.floor(Math.random() * alien.hasAntenna.length))
    } else if (attribute === "horns") {
        setHornsIndex(Math.floor(Math.random() * alien.horns.length))
    }
  }

//   Works in Firefox - Chrome throws error "Not allowed to navigate top frame to data URL"
    function downloadAlien() {
        // Canvas becomes the entirety of what we want to grab hold of
        
        const alienCard = document.getElementById("capture")
        const alienNameHolder = document.getElementById("alien-name-holder")
        const alienName = document.getElementById("alien-name")
        
        // But we still need to lose the border-radius
        alienCard.classList.add("capture-border", "black")
        alienNameHolder.classList.add("capture-border")
        alienName.classList.add("test")
        
        var canvas = document.getElementById("capture")
        html2canvas(document.getElementById("capture")).then(function(canvas) {
            var myAlien = canvas.toDataURL("image/png")
            // window.open(myAlien, "_blank") Use this as an option to open in new window instead of starting the download
            saveAs(myAlien, `${name} the alien.png`)
        })
        
        // And then we should re-instate the border radius for the displayed version
        alienCard.classList.remove("capture-border")
        alienNameHolder.classList.remove("capture-border")
        alienName.classList.remove("test")

    }
    
    // Still needs styling
    // Also wants attributes to loop around when cycling through the array


    return (
        <main>
            <div className="modal">
                <div className="text-box">
                    <h1>Create your own alien!</h1>
                        <div className="aliencard border winner-card" id="capture"> {/* This div is the one to download */}
                        <img
          className="alien-planet" id="alien-planet"
          src={`assets/alien-layers/planet-${alien.planet[planetIndex]}.png`}
        />
        <img
          className="alien-body" id="alien-body"
          src={`assets/alien-layers/body-${alien.skinColour[skinColourIndex]}-${alien.skinTexture[skinTextureIndex]}.png`}
        />
        <img
          className="alien-eyes" id="alien-eyes"
          src={`assets/alien-layers/eyes-${alien.eyeColour[eyeColourIndex]}-${alien.eyes[eyesIndex]}.png`}
        />
        <img className="alien-mouth" id="alien-mouth" src={`assets/alien-layers/mouth-${alien.isFriendly[isFriendlyIndex]}.png`} />
        
        { alien.horns[hornsIndex] ? <img className="alien-horns" id="alien-horns" src={`assets/alien-layers/horns-${alien.horns[hornsIndex]}.png`} /> : null}
        { alien.hasAntenna[antennaIndex] ? <img className="alien-antenna" id="alien-antenna" src={`assets/alien-layers/antenna.png`}/> : null }
        <div className="alien-name-holder" id="alien-name-holder">
        <div className="alien-name" id="alien-name">{name}</div>
        </div>
    </div>

                <div className="statsContainer">
                    <form>
                        <label htmlFor="name">Name: </label>
                        <input id="name" value={name} onChange={(e) => {setName(e.target.value), e.preventDefault}} type="text"/>
                    </form>
                    <button className="question-submit-btn" onClick={()=>{downloadAlien()}}>Download my alien!</button>

                    <button className="question-submit-btn" onClick={()=>{scramble()}}>Scramble!</button>
                    <h3>planet</h3>
                    <button className="question-submit-btn" disabled={planetIndex === 0} onClick={()=>{attributeSetter("planet", -1)}}>{"<<"}</button>
                    <button className="question-submit-btn" onClick={()=>{attributeRandomizer("planet")}}>Random</button>
                    <button className="question-submit-btn" disabled={planetIndex === alien.planet.length-1} onClick={()=>{attributeSetter("planet", +1)}}>{">>"}</button>

                    <h3>Skin Texture</h3>
                    <button className="question-submit-btn" disabled={skinTextureIndex === 0} onClick={()=>{attributeSetter("skinTexture", -1)}}>{"<<"}</button>
                    <button className="question-submit-btn" onClick={()=>{attributeRandomizer("skinTexture")}}>Random</button>
                    <button className="question-submit-btn" disabled={skinTextureIndex === alien.skinTexture.length-1} onClick={()=>{attributeSetter("skinTexture", +1)}}>{">>"}</button>

                    <h3>Skin Colour</h3>
                    <button className="question-submit-btn" disabled={skinColourIndex === 0} onClick={()=>{attributeSetter("skinColour", -1)}}>{"<<"}</button>
                    <button className="question-submit-btn" onClick={()=>{attributeRandomizer("skinColour")}}>Random</button>
                    <button className="question-submit-btn" disabled={skinColourIndex === alien.skinColour.length-1} onClick={()=>{attributeSetter("skinColour", +1)}}>{">>"}</button>

                    <h3>Eyes</h3>
                    <button className="question-submit-btn" disabled={eyesIndex === 0} onClick={()=>{attributeSetter("eyes", -1)}}>{"<<"}</button>
                    <button className="question-submit-btn" onClick={()=>{attributeRandomizer("eyes")}}>Random</button>
                    <button className="question-submit-btn" disabled={eyesIndex === alien.eyes.length-1} onClick={()=>{attributeSetter("eyes", +1)}}>{">>"}</button>

                    <h3>Eye Colour</h3>
                    <button className="question-submit-btn" disabled={eyeColourIndex === 0} onClick={()=>{attributeSetter("eyeColour", -1)}}>{"<<"}</button>
                    <button className="question-submit-btn" onClick={()=>{attributeRandomizer("eyeColour")}}>Random</button>
                    <button className="question-submit-btn" disabled={eyeColourIndex === alien.eyeColour.length-1} onClick={()=>{attributeSetter("eyeColour", +1)}}>{">>"}</button>

                    <h3>Temperament</h3>
                    <button className="question-submit-btn" onClick={()=>{setIsFriendlyIndex(0)}}>Friendly</button>
                    <button className="question-submit-btn" onClick={()=>{attributeRandomizer("isFriendly")}}>Random</button>
                    <button className="question-submit-btn" onClick={()=>{setIsFriendlyIndex(1)}}>Unfriendly</button>

                    <h3>Horns</h3>
                    <button className="question-submit-btn" disabled={hornsIndex === 0} onClick={()=>{attributeSetter("horns", -1)}}>{"<<"}</button>
                    <button className="question-submit-btn" onClick={()=>{attributeRandomizer("horns")}}>Random</button>
                    <button className="question-submit-btn" disabled={hornsIndex === alien.horns.length-1} onClick={()=>{attributeSetter("horns", +1)}}>{">>"}</button>

                    <h3>Antenna</h3>
                    <button className="question-submit-btn" onClick={()=>{setAntennaIndex(0)}}>No Antenna</button>
                    <button className="question-submit-btn" onClick={()=>{attributeRandomizer("antenna")}}>Random</button>
                    <button className="question-submit-btn" onClick={()=>{setAntennaIndex(1)}}>Antenna</button>
                </div>
                </div>
            </div>
        </main>
    )
}