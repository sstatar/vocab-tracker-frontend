export async function handleResponse(response: Response, fallbackMessage = "Request failed") {
    if (response.status === 401) {
        if (typeof window !== "undefined") {
            window.dispatchEvent(new Event("auth:session-expired"));
        }
        throw new Error("Session expired. Please login again.");
    }

    if (!response.ok) {
        // Proxies and server failures may return an HTML or empty error body.
        const data: unknown = await response.json().catch(() => null);
        let message = fallbackMessage;
        if (data && typeof data === "object") {
            if ("message" in data && typeof data.message === "string") {
                message = data.message;
            } else if ("error" in data && typeof data.error === "string") {
                message = data.error;
            }
        }
        throw new Error(message);
    }

    // A 204 response has no body to parse.
    if (response.status === 204) return true;
    return response.json();
}
