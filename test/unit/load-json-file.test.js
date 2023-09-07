const assert = require('assert');
const loadJSONFile = require("../../src/libs/load-json-file")

describe('loadJSONFile', () => {
    it('debería cargar un archivo JSON vacio correctamente', async () => {
        const filePath = './test/mocks/validity/empty.json'; // Ruta a un archivo JSON de prueba
        const expectedData = {}; // Contenido esperado del archivo JSON

        try {
            const loadedData = await loadJSONFile(filePath);
            assert.deepStrictEqual(loadedData, expectedData);
        } catch (error) {
            assert.fail(`Error inesperado: ${error.message}`);
        }
    });

    it('debería cargar un archivo JSON correctamente', async () => {
        const filePath = './test/mocks/validity/single.json'; // Ruta a un archivo JSON de prueba
        const expectedData = {
            "name": "Damian",
            "age": 25,
            "country": "Uruguay",
            "interests": ["programming", "anime", "One Piece"]
        };

        try {
            const loadedData = await loadJSONFile(filePath);
            assert.deepStrictEqual(loadedData, expectedData);
        } catch (error) {
            assert.fail(`Error inesperado: ${error.message}`);
        }
    });

    it('debería manejar errores al cargar un archivo inexistente', async () => {
        const nonExistentFilePath = './test/mocks/validity/non-existent.json'; // Ruta a un archivo inexistente

        try {
            await loadJSONFile(nonExistentFilePath);
            assert.fail('Se esperaba un error al cargar un archivo inexistente');
        } catch (error) {
            const errorMessage = error.message;
            const expectedErrorMessagePattern = /Error loading the JSON file\./; // Expresión regular para buscar la cadena deseada

            assert.ok(expectedErrorMessagePattern.test(errorMessage), `El mensaje de error no contiene "Error loading the JSON file."`);
        }
    });

    it('debería manejar errores al cargar un archivo JSON inválido', async () => {
        const invalidJSONFilePath = './test/mocks/validity/invalid.json'; // Ruta a un archivo JSON inválido

        try {
            await loadJSONFile(invalidJSONFilePath);
            assert.fail('Se esperaba un error al cargar un archivo JSON inválido');
        } catch (error) {
            assert.strictEqual(error.message, 'Error loading the JSON file. Unexpected token < in JSON at position 0');
        }
    });

});
