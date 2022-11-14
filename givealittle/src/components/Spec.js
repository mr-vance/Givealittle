import React from 'react'
import { useState, useEffect } from 'react'

export default function Spec({Specs, setSpecs, addNewSpec, idx}) {
    const [specName, setSpecName] = useState("");
    const [specDetail, setSpecDetail] = useState("");

    const handleChangeSpecName = (event) => {
        setSpecName(event.target.value);
      }

    const handleChangeSpecDetail = (event) => {
      setSpecDetail(event.target.value);
    }

    useEffect(() => {
        //We update the the spec in the Specs array everytime specName and specDetail changes.
        const tempSpecs = Specs.slice();
        //Updating the spec at index key in tempSpecs array
        tempSpecs[idx].spec = specName;
        tempSpecs[idx].detail = specDetail;
        setSpecs(tempSpecs);

    }, [specName, specDetail])


  return (
    <div>
        <input type="text" value={specName} placeholder="Spec Type" onChange={handleChangeSpecName}></input>
        <input type="text" value={specDetail} placeholder="Detail" onChange={handleChangeSpecDetail}></input>
    </div>
  )
}
