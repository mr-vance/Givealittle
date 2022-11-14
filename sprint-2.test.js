const tests = require("./sprint-2");

test("check valid name and email", () => {
    expect(tests[0](["tiisetso"])).toBe(false)
})
