import React from 'react'
import "../components/SellersTabs.css"

function SellersTabs({allTabs, setAllTabs, getData, setGetData}) {

//funtion for when a tab is clicked
const handleClick = (tabName) => {
    const tempArr = [...allTabs];
    let currentTab = tempArr.find(tab => tab.tabName == tabName);

    if (!currentTab.active){
        currentTab.active = true;
    }
    for (let i in tempArr){
        let loopTab = tempArr[i];
        if (loopTab.tabName != tabName){
            loopTab.active = false;
        }
    }
    setAllTabs(tempArr);
    setGetData(true);
}


  return (
    <div className='tabs-container'>
        {
            allTabs.map((tab, index) => {
                return (
                    <div key={index}>
                        {tab.tabName == "Add Product" ? 
                        <button className='tab' style={{backgroundColor: tab.active ? "#75b58c" : "#e5dacb", width: tab.active ? "400px" : "250px"}}
                            onClick={() => handleClick(tab.tabName)}
                        >{tab.tabName}</button>
                        :
                        <button className="tab" style={{backgroundColor: tab.active ? "#75b58c" : "#e5dacb", width: tab.active ? "400px" : "250px"}}
                        onClick={() => handleClick(tab.tabName)}
                        >{tab.tabName}</button>
                    }
                    </div>
                    
                )
            })
        }
    </div>
  )
}

export default SellersTabs