const tests = require("./allfunctions");

login = tests[0]
signup = tests[1]
carddetails = tests[2]
totalprice = tests[3]

//tests for login functions
test("checks for valid login details", () => {
    expect(login("tii@gmail.com", "password","password")).toBe(true)
})
test("checks for valid login details", () => {
    expect(login("tii", "234","234")).toBe(false)
})
test("checks for valid login details", () => {
    expect(login("tii@gmail.com", "pass", "pass")).toBe("Password too short")
})
test("checks for valid login details", () => {
    expect(login("tiiset", "password", "password")).toBe("Email too short")
})
test("checks for valid login details", () => {
    expect(login("tii@gmail.com", "password", "passwordd")).toBe("Passwords do not match")
})

//tests for signup functions
test("checks for valid signup details", () => {
    expect(signup("tii","0855853845","tii@gmail.com", "password","password")).toBe(true)
})
test("checks for valid signup details", () => {
    expect(signup("david","9044405950495059","tiisetso@gmail.com", "2344","2344")).toBe("Number invalid")
})
test("checks for valid signup details", () => {
    expect(signup("tii", "0855853845", "tiiset", "password", "password")).toBe("Email too short")
})
test("checks for valid signup details", () => {
    expect(signup("tii", "0855853845", "tii@gmail.com", "pass", "pass")).toBe("Password too short")
})
test("checks for valid signup details", () => {
    expect(signup("ti", "0855853845", "tii@gmail.com", "password", "password")).toBe("Name too short")
})

//tests for card functions
test("checks for valid card details", () => {
    expect(carddetails("thomas lemar", "1234", "332")).toBe(true)
})
test("checks for valid card details", () => {
    expect(carddetails("david","12", "234")).toBe("Date invalid")
})

