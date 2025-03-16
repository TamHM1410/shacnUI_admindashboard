export function AuthLayout({ children }) {
    return (
        <div className="flex items-center justify-center min-h-screen p-4 bg-gray-50 dark:bg-gray-900">
            <div className="w-full max-w-md space-y-4">{children}</div>
        </div>
    );
}