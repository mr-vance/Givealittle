const tests = require("./landingT");

test("check stars update with reviews", () => {
    expect(tests[1]([2,2],2)).toBe(2)
})

test("adds product categories", () => {
    expect(tests[2]("Cars,Electronics,Books")).toBe('Cars')
})

test("check reviews", () => {
    expect(tests[3]("good,cool,bad")).toBe("good")
})

test("check how many reviews", () => {
    expect(tests[0](["good","cool","bad"])).toBe(3)
})

test("return appropriate summary", () => {
    expect(tests[4](["good", "cool", "bad"])).toBe('3 Reviews')
})

test("gets total cart price", () => {
    expect(tests[5]([{ name: "TV", price: 100 }, { name: "Car", price: 200}])).toBe(300)
})

test("check for valid review", () => {
    expect(tests[6]("Nice")).toBe("Valid review")
})
