//function for valid login details
function login(email, password, repass) {
    if (password === repass){
        if (email.length > 6 && password.length > 4){
            return true;
        }
        else if (email.length <= 6 && password.length <= 4) {
            return false
        } 
        else if (password.length <= 4){
            return "Password too short"
        }
        else if (email.length <= 6) {
            return "Email too short"
        }
    } 
    else {
        return "Passwords do not match"
    }
}

//function for valid sign up details
function signup(name,cell, email, password,repass) {
    if (password === repass) {
        if (name.length > 2 && cell.length === 10 && email.length > 6 && password.length > 4) {
            return true;
        }
        else if (email.length <= 6 && password.length <= 4 && cell.length !=10 && name.length <2) {
            return false
        }
        else if (name.length <= 2) {
            return "Name too short"
        }
        else if (cell.length != 10) {
            return "Number invalid"
        }
        else if (password.length <= 4) {
            return "Password too short"
        }
        else if (email.length <= 6) {
            return "Email too short"
        }
    }
    else {
        return "Passwords do not match"
    }
}

//function for valid card details
function carddetails(name, expdate, cvv) {
    if (name.length > 2 && expdate.length === 4 && cvv.length === 3){
        return true
    } if (name.length <= 2 && expdate.length != 4 && cvv.length != 3) {
        return false
    }
    else if (name.length <= 2){
        return "Name too short"
    }
    else if (expdate.length != 4) {
        return "Date invalid"
    }
    else if (cvv.length != 3) {
        return "CVV invalid"
    }
}

//function for calculating total
function totalprice(items) {
    total = 0
    for (var i = 0; i < items.length; i++){
        total += items[i]
    }
    return total
}
module.exports = [login, signup, carddetails, totalprice];
