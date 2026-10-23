import { handleResponse } from "./api";

test("returns JSON data for a successful response", async () => {

    const data = { name: "Guitar", dailyGoal: 20 };

    const response = {
        status: 200,
        ok: true,
        json: jest.fn().mockResolvedValue(data),
    } as unknown as Response;

    const result = await handleResponse(response);

    expect(result).toEqual(data);
});

test("returns true without parsing JSON for a 204 response", async () => {
    const response = {
        status: 204,
        ok: true,
        json: jest.fn(),
    } as unknown as Response;

    const result = await handleResponse(response);
    expect(result).toBe(true);
    expect(response.json).not.toHaveBeenCalled();
});

test("throws the backend message for a failed response", async () => {
    const response = {
        status: 400,
        ok: false,
        json: jest.fn().mockResolvedValue({
            message: "Invalid vocabulary",
        }),
    } as unknown as Response;

    await expect(
        handleResponse(response, "Fallback message"),
    ).rejects.toThrow("Invalid vocabulary");
});

test("throws the backend error when message is absent", async () => {
    const response = {
        status: 400,
        ok: false,
        json: jest.fn().mockResolvedValue({
            error: "Permission denied",
        }),
    } as unknown as Response;

    await expect(
        handleResponse(response, "Fallback message"),
    ).rejects.toThrow("Permission denied");
});

test("uses the fallback message when the error body has no message", async () => {
    const response = {
        status: 500,
        ok: false,
        json: jest.fn().mockResolvedValue({}),
    } as unknown as Response;

    await expect(
        handleResponse(response, "Fallback message"),
    ).rejects.toThrow("Fallback message");
});

test("uses the default message when no fallback is provided", async () => {
    const response = {
        status: 500,
        ok: false,
        json: jest.fn().mockResolvedValue({}),
    } as unknown as Response;

    await expect(handleResponse(response)).rejects.toThrow("Request failed");
});

test("uses the fallback message when the error body is not valid JSON", async () => {
    const response = {
        status: 500,
        ok: false,
        json: jest.fn().mockRejectedValue(
            new SyntaxError("Unexpected token"),
        ),
    } as unknown as Response;

    await expect(handleResponse(response, "Fallback message")).rejects.toThrow("Fallback message");
});

test("dispatches a session-expired event and throws for a 401 response", async () => {
    const onSessionExpired = jest.fn();

    window.addEventListener("auth:session-expired", onSessionExpired);

    const response = {
        status: 401,
        ok: false,
    } as unknown as Response;
    try {
        await expect(handleResponse(response)).rejects.toThrow("Session expired. Please login again.");
        expect(onSessionExpired).toHaveBeenCalledTimes(1);
    } finally {
        window.removeEventListener("auth:session-expired", onSessionExpired);
    }


});