const tests = require("./specsT");

test("check valid name and email", () => {
    expect(tests[0]({ name: "TV", price: 100 }, 'price', 34)).toBe("Spec already added")
})

test("check valid name and email", () => {
    expect(tests[1]({ name: "TV", price: 100 }, 'quantity', 34)).toBe("This spec does not exist")
})

test("check valid name and email", () => {
    expect(tests[2]({ name: "TV", price: 100 }, 'quantity', 34)).toBe("This spec does not exist")
})
