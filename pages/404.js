import Link from 'next/link';

export default function Custom404() {
  return (
    <div className="flex items-center justify-center h-screen ">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-gray-800 mb-4">404</h1>
        <p className="text-xl text-gray-600 mb-6">
          Oops! The page you are looking for does not exist.
        </p>
        <Link href="/">
          <div className="px-6 py-3 rounded-md  bg-orange-700 text-white font-semibold font-inter">
            Go back home
          </div>
        </Link>
      </div>
    </div>
  );
}
