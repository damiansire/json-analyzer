const lib = require("json-scan");
const assert = require("assert");

describe("json-scan", () => {
    describe("sum", () => {
        it("Suma de positivo con positivo es positivo", () => {
            const resultado = lib.sum(5, 3);
            assert.strictEqual(resultado, 8);
        });

        it("Suma de positivo con negativo es correcta", () => {
            const resultado = lib.sum(5, -3);
            assert.strictEqual(resultado, 2);
        });

        it("Suma de cero con positivo es el mismo positivo", () => {
            const resultado = lib.sum(0, 7);
            assert.strictEqual(resultado, 7);
        });

        it("Suma de cero con cero es cero", () => {
            const resultado = lib.sum(0, 0);
            assert.strictEqual(resultado, 0);
        });
    });
});
