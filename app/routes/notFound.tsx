export default function NotFound() {
  return (
    <main className="relative flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-purple-100 via-pink-100 to-yellow-100 p-4 overflow-hidden">
      <div className="text-center z-10">
        <h1 className="text-9xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 animate-pulse">
          404
        </h1>
        <p className="mt-4 text-2xl text-gray-700 font-semibold animate-fadeIn">
          Oops! Page not found.
        </p>
        <p className="mt-2 text-gray-500">Looks like the link you followed does not exist.</p>
        <a
          href="/"
          className="mt-6 inline-block px-6 py-3 bg-purple-500 text-white font-semibold rounded-lg shadow-lg hover:bg-purple-600 transition-colors duration-300"
        >
          Go back to Home
        </a>
      </div>

      <style>
        {`
          @keyframes fadeIn {
            0% { opacity: 0; transform: translateY(10px); }
            100% { opacity: 1; transform: translateY(0); }
          }
          .animate-fadeIn {
            animation: fadeIn 1s ease forwards;
          }

          @keyframes bounceSlow {
            0%, 100% { transform: translateY(0); }
            50% { transform: translateY(-20px); }
          }
          .animate-bounce-slow {
            animation: bounceSlow 6s infinite ease-in-out;
          }
        `}
      </style>
    </main>
  );
}
