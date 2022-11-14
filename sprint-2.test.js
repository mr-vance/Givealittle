const tests = require("./contactT");

test("check valid name and email", () => {
    expect(tests[0](["tiisetso"])).toBe(false)
})
