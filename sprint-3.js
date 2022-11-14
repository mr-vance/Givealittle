function splitCategories(categoriesString){
    const categoriesArray = categoriesString.split(",");
    return categoriesArray[0];
};

function avgStars(starCount,stars) {
    let total = 0;
    if (starCount.length == 0) {
        return stars;
    } else {
        for (let i = 0; i < starCount.length; i++) {
            total += starCount[i]
        }
        total+=stars
        total/=starCount.length+1

        return total
    }
}

function review(reviews) {
    const reviewList = reviews.split(",")
    return reviewList[0];
}

// Funtion that returns the number of reviews
function reviewNumber(reviews) {
    return reviews.length
}

// Reviews or Review or No Review
function correctReview(reviews) {
    let counter = reviews.length
    if (counter == 0) {
        return "No reviews";
    } else if (counter == 1) {
        return `1 Review`;
    } else {
        return `${counter} Reviews`;
    }
}

function cartPrice(items){
    total = 0
    for (let i = 0; i < items.length; i++) {
        item=items[i]
        total+=item.price
    }
    return total
}

function addReview(review){
    if (review.length > 200){
        return "Review too long"
    }
    else if (review != "") {
        return "Valid review"
    }
    else {
        return "No review"
    }
}


module.exports = [reviewNumber,avgStars,splitCategories, review, correctReview,cartPrice, addReview];
