import { obtenerDatos, envia } from "./ajax";

global.fetch = jest.fn();

describe("Ajax helpers", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test("obtenerDatos: realiza una solicitud GET y devuelve los datos", async () => {
    const mockResponse = { data: "test data" };
    fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => mockResponse,
    });

    const result = await obtenerDatos("test-endpoint");
    expect(fetch).toHaveBeenCalledWith("http://localhost:3000/test-endpoint");
    expect(result).toEqual(mockResponse);
  });

  test("obtenerDatos: maneja errores en la solicitud", async () => {
    fetch.mockRejectedValueOnce(new Error("Network error"));

    const result = await obtenerDatos("test-endpoint");
    expect(fetch).toHaveBeenCalledWith("http://localhost:3000/test-endpoint");
    expect(result).toBeUndefined(); // Manejo del error
  });

  test("envia: realiza una solicitud POST con los datos proporcionados", async () => {
    const mockData = { name: "Test User" };
    fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({ success: true }),
      headers: { get: () => "application/json" },
    });

    const result = await envia("test-endpoint", mockData);

    expect(fetch).toHaveBeenCalledWith("http://localhost:3000/test-endpoint", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(mockData),
    });
    expect(result).toEqual({ success: true });
  });

  test("envia: maneja respuestas que no son JSON", async () => {
    fetch.mockResolvedValueOnce({
      ok: true,
      text: async () => "Not JSON",
      headers: { get: () => "text/plain" },
    });

    const result = await envia("test-endpoint", {});
    expect(result).toBeNull();
  });

  test("envia: maneja errores en la solicitud", async () => {
    fetch.mockRejectedValueOnce(new Error("Network error"));

    const result = await envia("test-endpoint", {});
    expect(result).toBeUndefined();
  });
});
