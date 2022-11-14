import { arrayRemove } from 'firebase/firestore';
import React, { useContext, useState, useEffect } from 'react';
import './Insights.css';
import { VictoryArea, VictoryBar, VictoryChart, VictoryAxis, VictoryTheme, VictoryPie } from 'victory';


export default function Insights(props){
    const [show,setShow] = useState(true);
    const [newPage, setNewPage] = useState();

    function allCustomers(){
        setShow(false);
        var arr = Object.keys(props.custDict).map(
            (key) => { return [key, props.custDict[key]] });

        arr.sort(
            (first, second) => { return second[1] - first[1] }
        );
        setNewPage(
            <div className = "wholpdiv">
                <button className="btnclose" onClick={() => setShow(true)}>Close</button>
                <div className="allprodsdiv">
                    <div className="allprodheaddiv">
                        <h3 className="ltet">Buyer</h3>
                        <h3 className="rtet">Items bought</h3>
                    </div>
                    {arr.map((product) =>
                        <div className="allprodsin">
                            <h5 className="ltet">{product[0]}</h5>
                            <h5 className="rtet">{product[1]}</h5>
                        </div>
                    )}
                </div>
            </div>)
    }

    function allProducts() {
        setShow(false);
        var arr = Object.keys(props.prodDict).map(
            (key) => { return [key, props.prodDict[key]] });

        arr.sort(
            (first, second) => { return second[1] - first[1] }
        );
        setNewPage(
        <div className = "wholpdiv">
            <button className = "btnclose" onClick={() => setShow(true)}>Close</button>
            <div className = "allprodsdiv">
                <div className = "allprodheaddiv">
                    <h3 className = "ltet">Item</h3>
                    <h3 className = "rtet">Units Sold</h3>
                </div>
                {arr.map((product) =>
                    <div className="allprodsin">
                    <h5 className = "ltet">{product[0]}</h5>
                    <h5 className = "rtet">{product[1]}</h5>
                    </div>
                )}
            </div>
        </div>)
    }

    function saleHistory() {
        setShow(false);
        if (props.totalSale === 0) {
            setNewPage(
                <div className="wholpdiv">
                    <button className="btnclose" onClick={() => setShow(true)}>Close</button>
                </div>
            )
        }
        else {
            setNewPage(
                <div className="wholpdiv">
                    <button className="btnclose" onClick={() => setShow(true)}>Close</button>
                    <h3 className="histhead">Monthly Sale History</h3>
                    <div className="vichicdiv">
                        <VictoryChart>
                            <VictoryArea
                                style={{
                                    data: { fill: "none", fillOpacity: 0.7, stroke: "#B38B59", strokeWidth: 3 },
                                    labels: { fontSize: 6 }
                                }}
                                data={props.histData}

                            />
                        </VictoryChart>
                    </div>
                    <div className="histsumdiv">
                        <h2>This is visualization of your monthly sale history</h2>
                        <h5>You have been selling on Givealittle for <mark style={{ color: "#B38B59", backgroundColor: "#FFFFFF" }}>{props.histData.length}</mark> months now</h5>
                        <h5>Your monthly revenue is <mark style={{ color: "#B38B59", backgroundColor: "#FFFFFF" }}>R{props.monAve}</mark></h5>
                    </div>

                </div>
            )
        }
    }
        
    return(
        ( show ? 
        <div className="mainin">
            <h1 className="totalsaleh1">Total Sales</h1>
            <div className="maininbig">
                <div className="mainindivbig">
                    <div className="vicdiv">
                        <VictoryPie
                            colorScale={"green"}
                                data={props.pData}
                            height={400}
                            style={{ labels: { fontSize: 8, display: "none" } }}
                            events={[{
                                target: "data",
                                eventHandlers: {
                                    onMouseOver: () => {
                                        return [
                                            {
                                                target: "data",
                                                mutation: ({ style }) => {
                                                    return style.fill === "#B38B59" ? null : { style: { fill: "#B38B59" } };
                                                }
                                            }, {
                                                target: "labels",
                                                mutation: ({ style }) => {
                                                    return (style.display === "inline" ? null : { style: { display: "inline" } }
                                                    );
                                                }
                                            }, {
                                                target: "labels",
                                                mutation: ({ style }) => {
                                                    return (style.fontSize === 15 ? null : { style: { fontSize: 15 } }
                                                    );
                                                }

                                            }
                                        ];
                                    },
                                    onMouseOut: () => {
                                        return [{
                                            target: "data",
                                            mutation: () => {
                                                return null;
                                            }
                                        },
                                        {
                                            target: "labels",
                                            mutation: () => {
                                                return null;
                                            }
                                        }
                                        ];
                                    }

                                }
                            }]}
                        />
                    </div>
                    <div className="vich1">
                        <h5>Your total revenue is</h5>
                        <h1 className="totalh1">R{props.totalSale}</h1>
                    </div>
                </div>
            </div>
            <div className="sumindiv">
                <div className="topbuyerdiv" onClick={allCustomers}>
                    <h6>Top Customers🤩</h6>
                    <h3 className="topbuyerh4">{props.topCustomer}</h3>
                </div>

                    <div className="topitemdiv" onClick={allProducts}>
                    <h6>Top Products🚀</h6>
                    <h3 className="topitemh3">{props.topProduct}</h3>
                </div>

                    <div className="historydiv" onClick={saleHistory}>
                    <h6>Sales History📈</h6>
                    <h3 className="historyh3">➡</h3>
                </div>
            </div>
        </div>
        : newPage)
    )
}