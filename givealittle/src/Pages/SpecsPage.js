import Spec from "../components/Spec";
import { useState} from 'react'
import React from 'react'
import { MdOutlinePostAdd } from 'react-icons/md';
import '../components/SellersPage.css'



function SpecsPage({Specs, setSpecs}) {

    const [specName, setSpecName] = useState("");
    const [specDetail, setSpecDetail] = useState("");


    const [newSpec, setNewSpec] = useState({
        id: 0,
        spec: "",
        detail: ""
    });

    const addNewSpec = () => {

        const tempSpec = {
            id: newSpec.id + 1,
            spec: "",
            detail: ""
        }

        setNewSpec(tempSpec)
        setSpecs(Specs => [...Specs, newSpec])
    }

  return (
    <div>
        {Specs.map((spec, index) => {
            return (
                <div>
                    <Spec Specs={Specs} setSpecs={setSpecs} addNewSpec={addNewSpec} idx={index} key={index}/>
                </div>
                
            )
        })}
        <button className="button-add-spec" onClick={addNewSpec} ><MdOutlinePostAdd style={{width: "25px", height: "25px"}}/> Add Spec</button>
    </div>
  )
}

export default SpecsPage