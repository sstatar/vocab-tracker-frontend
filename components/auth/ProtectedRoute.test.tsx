import { render, screen } from "@testing-library/react";
import { ProtectedRoute } from "./ProtectedRoute";
import { useAuth } from "@/hooks/useAuth";

jest.mock("@/hooks/useAuth", () => ({
    useAuth: jest.fn(),
}));

const mockReplace = jest.fn();

jest.mock("next/navigation", () => ({
    useRouter: () => ({
        replace: mockReplace,
    }),
}));

const mockedUseAuth = jest.mocked(useAuth);

test("shows protected content when authenticated", () => {
    mockedUseAuth.mockReturnValue({
        isAuthenticated: true,
        isInitializing: false,
        startSession: jest.fn(),
        endSession: jest.fn(),
    });
    render(
        <ProtectedRoute>
            <p>My settings</p>
        </ProtectedRoute>,
    );

    expect(screen.getByText("My settings")).toBeInTheDocument();
});

test("hides protected content without redirecting while initializing", () => {
    mockedUseAuth.mockReturnValue({
        isAuthenticated: false,
        isInitializing: true,
        startSession: jest.fn(),
        endSession: jest.fn(),
    });
    render(
        <ProtectedRoute>
            <p>My settings</p>
        </ProtectedRoute>,
    );

    expect(screen.queryByText("My settings")).not.toBeInTheDocument();
    expect(mockReplace).not.toHaveBeenCalled();
});

test("redirects to login when unauthenticated", () => {
    mockedUseAuth.mockReturnValue({
        isAuthenticated: false,
        isInitializing: false,
        startSession: jest.fn(),
        endSession: jest.fn(),
    });
    render(
        <ProtectedRoute>
            <p>My settings</p>
        </ProtectedRoute>,
    );

    expect(screen.queryByText("My settings")).not.toBeInTheDocument();
    expect(mockReplace).toHaveBeenCalledWith("/login");
});

test("shows protected content after initialization completes", () => {
    mockedUseAuth.mockReturnValue({
        isAuthenticated: false,
        isInitializing: true,
        startSession: jest.fn(),
        endSession: jest.fn(),
    });

    const { rerender } = render(
        <ProtectedRoute>
            <p>My settings</p>
        </ProtectedRoute>,
    );

    expect(screen.queryByText("My settings")).not.toBeInTheDocument();
    expect(mockReplace).not.toHaveBeenCalled();

    mockedUseAuth.mockReturnValue({
        isAuthenticated: true,
        isInitializing: false,
        startSession: jest.fn(),
        endSession: jest.fn(),
    });

    rerender(
        <ProtectedRoute>
            <p>My settings</p>
        </ProtectedRoute>,
    );

    expect(screen.getByText("My settings")).toBeInTheDocument();
    expect(mockReplace).not.toHaveBeenCalled();
});

test("redirects to login after initialization completes without a session", () => {
    mockedUseAuth.mockReturnValue({
        isAuthenticated: false,
        isInitializing: true,
        startSession: jest.fn(),
        endSession: jest.fn(),
    });

    const { rerender } = render(
        <ProtectedRoute>
            <p>My settings</p>
        </ProtectedRoute>,
    );

    expect(screen.queryByText("My settings")).not.toBeInTheDocument();
    expect(mockReplace).not.toHaveBeenCalled();

    mockedUseAuth.mockReturnValue({
        isAuthenticated: false,
        isInitializing: false,
        startSession: jest.fn(),
        endSession: jest.fn(),
    });

    rerender(
        <ProtectedRoute>
            <p>My settings</p>
        </ProtectedRoute>,
    );

    expect(screen.queryByText("My settings")).not.toBeInTheDocument();
    expect(mockReplace).toHaveBeenCalledWith("/login");
});

test("redirects to login after logout", () => {
    mockedUseAuth.mockReturnValue({
        isAuthenticated: true,
        isInitializing: false,
        startSession: jest.fn(),
        endSession: jest.fn(),
    });

    const { rerender } = render(
        <ProtectedRoute>
            <p>My settings</p>
        </ProtectedRoute>,
    );

    expect(screen.getByText("My settings")).toBeInTheDocument();
    expect(mockReplace).not.toHaveBeenCalled();

    mockedUseAuth.mockReturnValue({
        isAuthenticated: false,
        isInitializing: false,
        startSession: jest.fn(),
        endSession: jest.fn(),
    });

    rerender(
        <ProtectedRoute>
            <p>My settings</p>
        </ProtectedRoute>,
    );

    expect(screen.queryByText("My settings")).not.toBeInTheDocument();
    expect(mockReplace).toHaveBeenCalledWith("/login");
});
