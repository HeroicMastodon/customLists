import { isNullOrEmpty, isNullOrWhitespace } from "@/util/stringUtils";

describe("String Utils", () => {
	const testObj = {
		notNullOrEmpty: "a string!",
		emptyString: "",
		nullish: null,
		undefinedish: undefined,
		whitespace: "    ",
		tabs: "		",
		newline: "\n"
	};
	it("Should tell if null or empty", () => {
		expect(isNullOrEmpty(testObj.notNullOrEmpty)).toBeFalsy();
		expect(isNullOrEmpty(testObj.whitespace)).toBeFalsy();
		expect(isNullOrEmpty(testObj.tabs)).toBeFalsy();
		expect(isNullOrEmpty(testObj.newline)).toBeFalsy();
		expect(isNullOrEmpty(testObj.emptyString)).toBeTruthy();
		expect(isNullOrEmpty(testObj.nullish)).toBeTruthy();
		expect(isNullOrEmpty(testObj.undefinedish)).toBeTruthy();
	});
	it("Should tell if null or whitespace", () => {
		expect(isNullOrWhitespace(testObj.notNullOrEmpty)).toBeFalsy();
		expect(isNullOrWhitespace(testObj.emptyString)).toBeTruthy();
		expect(isNullOrWhitespace(testObj.nullish)).toBeTruthy();
		expect(isNullOrWhitespace(testObj.undefinedish)).toBeTruthy();
		expect(isNullOrWhitespace(testObj.whitespace)).toBeTruthy();
		expect(isNullOrWhitespace(testObj.whitespace)).toBeTruthy();
		expect(isNullOrWhitespace(testObj.tabs)).toBeTruthy();
		expect(isNullOrWhitespace(testObj.newline)).toBeTruthy();
	});
});