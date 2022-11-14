import React from 'react'
import { MdDelete, MdEdit, MdExpandMore, MdExpandLess, MdModeComment, MdOutlineComment, MdOutlineUnfoldMore, MdUnfoldLess } from 'react-icons/md';
import { CgProfile } from 'react-icons/cg'
import { useState, useEffect } from "react"
import { collection, getDocs, addDoc, deleteDoc, doc } from "firebase/firestore";
import { db } from '../firebase-config';
import { BsStarFill } from "react-icons/bs";


/**
 * Shows data about a product in sellers inventory. 
 *  
 * Picture, Name, Price, In Stock items
 * 
 */

function ProductInsightsCard(product) {

    const [collapse, setCollapse] = useState(true);
    const [collapseReviews, setCollapseReviews] = useState(true);
    const [collapseAll, setCollapseAll] = useState(false);
    const [randNum, setRandNum] = useState(0);

    const deleteProduct = async () => {
        await deleteDoc(
            doc(db, "Inventory", product.productId),
            alert(product.name + " Deleted"),
            setRandNum(randNum + 1)
        )
        
      }
      

      useEffect(() => {       //loads data from database
        const getItems = async () => {
            const data = await getDocs(collection(db, "Inventory"));
            product.setItems(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
        }
        getItems()
    }, [randNum]);

    const handleCollapse = () => {
        if (collapse) {
            setCollapse(false);
        }else{
            setCollapse(true);
        }
    }


    useEffect(() => {
        if (collapse && collapseReviews){
            setCollapseAll(false);
        }else if (!collapse && !collapseReviews){
            setCollapseAll(true)
        }
    }, [collapse, collapseReviews])


    const handleCollapseReviews = () => {
        if (collapseReviews) {
            setCollapseReviews(false);
        }else{
            setCollapseReviews(true);
        }
    }


    // The following function count the average rating of each item (using stars)
    function avgStars(stars) {
        let starCount = "" + stars;
        let wholeSum = 0;
        let check = 0;

        for (let i = 0; i < starCount.length; i++) {
            if (starCount[i] == "*") {
                check++;
            }
            else {
                wholeSum = wholeSum + parseInt(starCount[i]);
            }
        }
        let average = wholeSum / (starCount.length - check);

        if (starCount.length == 0) {
            return "5.0 ";
        }
        else {
            return average.toFixed(1) + " ";
        }

    }

    // Function to put reviews in a list
    function review(reviews) {
        const reviewList = reviews.toString().split("*");
        return reviewList
    }

    function reviewNumberIn(reviews) {
        let counter = 0;
        let review = "" + reviews;
        for (let i = 0; i < review.length; i++) {
            if (review[i] == '*') {
                counter++;
            }
        }
        if (counter == 0) {
            return " "
        }
        else {
            return counter.toString() + " "
        }
    }

    const handleCollapseAll = () => {
        if (collapseAll) {
            setCollapse(true);
            setCollapseReviews(true)
            setCollapseAll(false);
        }else {
            setCollapse(false);
            setCollapseReviews(false)
            setCollapseAll(true);
        }
    }

    return (

    <li className='card'>

        
        <img className='card-image' alt='' src={product.image}></img>

        <div>
            {collapse ? 
            <button className="collapse-button" onClick={handleCollapse}>
                <MdExpandLess className='expand-less' style={{height: "30px", width: "30px"}} onClick={handleCollapse}/>
                <h5 className='more-info' onClick={handleCollapse}>more info</h5>
            </button>
            : <button className="collapse-button" onClick={handleCollapse} style={{backgroundColor: "#e7e7e7", marginLeft: "20px"}}>
                <MdExpandMore className='expand-more' style={{height: "30px", width: "30px"}} onClick={handleCollapse}/>
                <h5 className='more-info' onClick={handleCollapse}>less info</h5>
            </button>
        }

        {collapseReviews ? 
            <button className='reviews-button' onClick={handleCollapseReviews}>
            <MdModeComment className='expand-more' style={{height: "20px", width: "20px"}} onClick={handleCollapseReviews}/>
            <h5 className='more-info' onClick={handleCollapseReviews}>{product.review != "" ? reviewNumberIn(product.review) : 0} reviews</h5>
            </button>
        : 
        <button className='reviews-button' onClick={handleCollapseReviews} style={{backgroundColor: "#e7e7e7", marginLeft: "20px"}}>
            <MdOutlineComment className='expand-more' style={{height: "20px", width: "20px"}} onClick={handleCollapseReviews}/>
            <h5 className='more-info' onClick={handleCollapseReviews}>{product.review != "" ? reviewNumberIn(product.review) : 0} reviews</h5>
        </button>
        }

        {collapseAll ? 
            <button className='collapse-all-button' onClick={handleCollapseAll} style={{backgroundColor: "#e7e7e7", marginLeft: "20px"}}>
            <MdOutlineUnfoldMore className='expand-more' style={{height: "20px", width: "20px"}} onClick={handleCollapseAll}/>
            <h5 className='more-info' onClick={handleCollapseAll}>collapse all</h5>
            </button>
            :
            <button className='collapse-all-button' onClick={handleCollapseAll}>
            <MdUnfoldLess className='expand-more' style={{height: "20px", width: "20px"}} onClick={handleCollapseAll}/>
            <h5 className='more-info' onClick={handleCollapseAll}>expand all</h5>
            </button>
        }
        
        </div>

        

        <h5 className='name'>{product.name}</h5>
        <div className='numbers-container'>
            <h6 className='product-categories'>{product.categories.substring(4)}</h6>
            <h6>Price:
                <h5 className='price'> R{product.price}</h5>
            </h6>
            <h6>
                {product.quantity == "0" ? 
                <h5 className='stock' style={{marginLeft: "0", color: "#C25450"}}>Out of Stock</h5>
                : 
                <h6>In Stock:
                  <h5 className='stock'>{product.quantity}</h5>
                </h6>

                }
            </h6>
            <div className='rating-container'>
                <BsStarFill className="initemsstar" style={{height: "25px", width: "25px"}}/>
                <h5 className='stock'>{avgStars(product.stars)}</h5>
            </div>
            
            
            {/*<h5 className='sold'>Sold: 00</h5>*/}
        </div>

        
            
            <button className='delete-button' onClick={deleteProduct}>
                <MdDelete style={{width: "25px", height: "25px"}}/>
            </button>

            {/*<button className='edit-button'>
                <MdEdit style={{width: "25px", height: "25px"}}/>
            </button>*/}

                {!collapse ?
                    <div className='info-container'>
                        <h5 className='table-title'>Description</h5>
                        <h6 className='description'>{product.description}</h6>

                {product.specs != undefined ?
                    <h4 className='table-title'>Product Specifications</h4>
                    : <h4></h4>
                    }
                    
                    
                {product.specs != undefined ? 
                        
                product.specs.map((spec, index) => {
                    return (
                        <div className='spec-container' style={{marginBottom: "0"}} key={index}>
                            <h6 className='spec-name' style={{marginBottom: "0"}}>{spec.spec}</h6>
                            <h6 className="spec-detail" style={{marginBottom: "0"}}>{spec.detail}</h6>
                        </div>
                    )
                })

                : <h1></h1>}
            </div>
                : <h1></h1>
            }
           
            
            {!collapseReviews ?
                <div className='info-container'>
                    {product.review != "" ? 
                    <div>
                        <h5 className='table-title'>Reviews</h5>
                        {review(product.review).map((comment, index) => {
                            
                            return (
                                <div key={index}>
                                    {comment != "" ?
                                        <div>
                                            <CgProfile className='comment-profile' style={{width: "25px", height: "25px"}}/>
                                            <h3 className='comment'>{comment}</h3>
                                        </div>
                                        
                                        : null
                                    }
                                    
                                </div>
                            )
                            
                        })}
                    </div>
                        : <h3 className='table-title'>No Reviews</h3>
                    }
                </div>
                : null
            }
        
        
        
    </li>
    )
  
  
}

export default ProductInsightsCard