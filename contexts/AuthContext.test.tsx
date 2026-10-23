import { render, screen, fireEvent, act } from "@testing-library/react";
import { AuthProvider } from "./AuthContext";
import { useAuth } from "@/hooks/useAuth";
import { mutate } from "swr";

function AuthStatus() {
    const { isInitializing, isAuthenticated, startSession, endSession } =
        useAuth();

    return (
        <>
            <p>{isInitializing ? "Initializing" : "Ready"}</p>
            <p>{isAuthenticated ? "Authenticated" : "Not authenticated"}</p>

            <button onClick={() => startSession("new-token")}>
                Start session
            </button>
            <button onClick={() => endSession()}>End session</button>
        </>
    );
}

beforeEach(() => {
    localStorage.clear();
});

jest.mock("swr", () => ({
    mutate: jest.fn(),
}));

test("restores the session from a stored token", async () => {
    localStorage.setItem("token", "test-token");

    render(
        <AuthProvider>
            <AuthStatus />
        </AuthProvider>,
    );

    expect(await screen.findByText("Ready")).toBeInTheDocument();
    expect(screen.getByText("Authenticated")).toBeInTheDocument();
});

test("finishes initialization without a stored token", async () => {
    render(
        <AuthProvider>
            <AuthStatus />
        </AuthProvider>,
    );

    expect(await screen.findByText("Ready")).toBeInTheDocument();
    expect(screen.getByText("Not authenticated")).toBeInTheDocument();
});

test("starts a session and stores the token", async () => {
    render(
        <AuthProvider>
            <AuthStatus />
        </AuthProvider>,
    );

    expect(await screen.findByText("Ready")).toBeInTheDocument();
    expect(screen.getByText("Not authenticated")).toBeInTheDocument();

    fireEvent.click(screen.getByRole("button", { name: "Start session" }));

    expect(screen.getByText("Authenticated")).toBeInTheDocument();
    expect(localStorage.getItem("token")).toBe("new-token");
});

test("ends a session and removes the stored token", async () => {
    localStorage.setItem("token", "test-token");

    render(
        <AuthProvider>
            <AuthStatus />
        </AuthProvider>,
    );

    expect(await screen.findByText("Ready")).toBeInTheDocument();
    expect(screen.getByText("Authenticated")).toBeInTheDocument();

    fireEvent.click(screen.getByRole("button", { name: "End session" }));

    expect(screen.getByText("Not authenticated")).toBeInTheDocument();
    expect(localStorage.getItem("token")).toBe(null);

    expect(mutate).toHaveBeenCalledWith(expect.any(Function), undefined, {
        revalidate: false,
    });
});

test("ends the session when a session-expired event is received", async () => {
    localStorage.setItem("token", "test-token");

    render(
        <AuthProvider>
            <AuthStatus />
        </AuthProvider>,
    );

    expect(await screen.findByText("Ready")).toBeInTheDocument();
    expect(screen.getByText("Authenticated")).toBeInTheDocument();

    act(() => {
        window.dispatchEvent(new Event("auth:session-expired"));
    });

    expect(screen.getByText("Not authenticated")).toBeInTheDocument();
    expect(localStorage.getItem("token")).toBe(null);

    expect(mutate).toHaveBeenCalledWith(expect.any(Function), undefined, {
        revalidate: false,
    });
});
