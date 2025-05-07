import Script from 'next/script';
import Link from 'next/link';

function Banned() {
    return (
        <div className="relative min-h-[500px] flex items-center justify-center bg-gray-100">
            <div className="text-center bg-white p-6 rounded shadow-lg">
                <p className="text-lg mb-4 font-inter text-semiblack">This Video or search term is removed</p>
                <Link href="/">
                    <p className=" underline font-inter text-red-500 text-lg">Go back to Home</p>
                </Link>

            </div>
        </div>
    );
}

export default Banned;
