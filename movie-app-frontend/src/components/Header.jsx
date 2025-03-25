/*




import { Link } from "react-router-dom";
export default function Header({ setSearchTerm }) {
    const handleSearch = (e) => {
        e.preventDefault();
        const query = e.target.elements.searchInput.value.trim();
        if (query) setSearchTerm(query);
        e.target.elements.searchInput.value = "";
    };
    const handleHomeClick = () => {
        setSearchTerm(""); // Reset search when clicking home
    };
    return (
        <header className="header">
            <nav>
                <Link to="/" onClick={handleHomeClick}>Home</Link>
            </nav>
            <form className="header" onSubmit={handleSearch}>
                <h1>Movie Search</h1>
                <p>Find your favorite movies!</p>
                <input type="text" name="searchInput" placeholder="Search your movie..." />
                <button type="submit">Search</button>
            </form>
        </header>
    );
} */



/* import { Link, useLocation } from "react-router-dom";

export default function Header({ setSearchTerm }) {
    const location = useLocation(); // Get the current route

    const handleSearch = (e) => {
        e.preventDefault();
        const query = e.target.elements.searchInput.value.trim();
        if (query) setSearchTerm(query);
        e.target.elements.searchInput.value = "";
    };

    const handleHomeClick = () => {
        setSearchTerm(""); // Reset search when clicking home
    };

    // Hide the search bar if the current path is for movie details
    const isMovieDetailPage = location.pathname.includes("/movie/");

    return (
        <header className="header">
            <nav>
                <Link to="/" onClick={handleHomeClick}>Home</Link>
            </nav>

            {!isMovieDetailPage && (
                <form className="header" onSubmit={handleSearch}>
                    <h1>Movie Search</h1>
                    <p>Find your favorite movies!</p>
                    <input type="text" name="searchInput" placeholder="Search your movie..." />
                    <button type="submit">Search</button>
                </form>
            )}
        </header>
    );
}
 */




/* import { Link, useLocation } from "react-router-dom";

export default function Header({ setSearchTerm }) {
    const location = useLocation(); // Get the current route

    const handleSearch = (e) => {
        e.preventDefault();
        const query = e.target.elements.searchInput.value.trim();
        if (query) setSearchTerm(query);
        e.target.elements.searchInput.value = "";
    };

    const handleHomeClick = () => {
        setSearchTerm(""); // Reset search when clicking home
    };

    // Hide the search bar if the current path is for movie details
    const isMovieDetailPage = location.pathname.includes("/movie/");

    return (
        <header className="header p-4 bg-gray-200">
            <nav className="flex gap-4 mb-4">
                <Link to="/" onClick={handleHomeClick} className="text-blue-600 hover:underline">
                    Home
                </Link>
                <Link to="/register" className="text-blue-600 hover:underline">
                    Register
                </Link>
            </nav>

            {!isMovieDetailPage && (
                <form className="header" onSubmit={handleSearch}>
                    <h1 className="text-3xl font-bold">Movie Search</h1>
                    <p className="mb-2">Find your favorite movies!</p>
                    <div className="flex gap-2">
                        <input
                            type="text"
                            name="searchInput"
                            placeholder="Search your movie..."
                            className="p-2 border border-gray-400 rounded"
                        />
                        <button type="submit" className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600">
                            Search
                        </button>
                    </div>
                </form>
            )}
        </header>
    );
} */




//TESTTTTTT
/* import { Link, useLocation } from "react-router-dom";

export default function Header({ setSearchTerm, cartCount }) {
    const location = useLocation();

    const handleSearch = (e) => {
        e.preventDefault();
        const query = e.target.elements.searchInput.value.trim();
        if (query) setSearchTerm(query);
        e.target.elements.searchInput.value = "";
    };

    const handleHomeClick = () => {
        setSearchTerm("");
    };

    // Hide search bar on movie details pages
    const isMovieDetailPage = location.pathname.includes("/movie/");

    return (
        <header className="header p-4 bg-gray-200">
            <nav className="flex gap-4 mb-4 items-center">
                <Link to="/" onClick={handleHomeClick} className="text-blue-600 hover:underline">
                    Home
                </Link>
                <Link to="/register" className="text-blue-600 hover:underline">
                    Register
                </Link>
                <Link to="/cart" className="relative inline-block text-blue-600 hover:underline">
                    <img
                        src="https://cdn-icons-png.flaticon.com/512/3225/3225209.png"
                        width="30"
                        alt="Cart"
                    />
                    {cartCount > 0 && (
                        <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
                            {cartCount}
                        </span>
                    )}
                </Link>
            </nav>

            {!isMovieDetailPage && (
                <form onSubmit={handleSearch} className="mb-4">
                    <h1 className="text-3xl font-bold">Movie Search</h1>
                    <p className="mb-2">Find your favorite movies!</p>
                    <div className="flex gap-2">
                        <input
                            type="text"
                            name="searchInput"
                            placeholder="Search your movie..."
                            className="p-2 border border-gray-400 rounded"
                        />
                        <button type="submit" className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600">
                            Search
                        </button>
                    </div>
                </form>
            )}
        </header>
    );
}
 */



import { Link, useLocation } from "react-router-dom";
export default function Header({ setSearchTerm }) {
    const location = useLocation(); // Get the current route
    const handleSearch = (e) => {
        e.preventDefault();
        const query = e.target.elements.searchInput.value.trim();
        if (query) setSearchTerm(query);
        e.target.elements.searchInput.value = "";
    };
    const handleHomeClick = () => {
        setSearchTerm(""); // Reset search when clicking home
    };
    // Hide the search bar if the current path is for movie details or the register page
    const isMovieDetailPage = location.pathname.includes("/movie/");
    const isRegisterPage = location.pathname === "/register";
    return (
        <header className="header">
            <nav>
                <Link to="/" onClick={handleHomeClick}>Home</Link>
                <Link to="/register">Register</Link>
                <Link to="/login">Login</Link>

                <Link to="/cart"><img src="https://cdn-icons-png.flaticon.com/512/3225/3225209.png" width="30" alt="Cart" />

                </Link>



            </nav>

        </header>
    );
}


