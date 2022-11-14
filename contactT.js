function contactdetails(name) {
    let bvalid = false;
    let details = [{
        name: "Brian Makhubele",
        email: "2113525@students.wits.ac.za",
        color: "#FAEBD7"
    },
    {
        name: "Motheo Tsirwe",
        email: "2329751@students.wits.ac.za",
        color: "#D4CFB4"
    },
    {
        name: "Thulasizwe Sabela",
        email: "2140615@students.wits.ac.za",
        color: "#ABB596"
    },
    {
        name: "Aubrey Nalane",
        email: "2167773@students.wits.ac.za",
        color: "#7F9C7E"
    },
    {
        name: "Zukisa Moto",
        email: "2340955@students.wits.ac.za",
        color: "#50836C"
    },
    {
        name: "Tshepiso Mahoko",
        email: "2352695@students.wits.ac.za",
        color: "#FAEBD7"
    },
    {
        name: "Pamela Segana",
        email: "2265335@students.wits.ac.za",
        color: "#9DBCB1"
    },
    {
        name: "Tiisetso Mojalefa",
        email: "2369718@students.wits.ac.za",
        color: "#80cbc4"
    }]

    for (let i = 0; i < details.length; i++) {
        let person = details[i]
        if (name === person.name){
            bvalid = true
        }
    }
    return bvalid
}

module.exports = [contactdetails];