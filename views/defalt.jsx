const React = require('react');
// Default Html layout with nav
const Def = (html) => {
    return(
        // Start of html layout
        <html>
            <head>
                <title>Title</title>
            </head>
            <body>
                {/* Start of nav */}
                <nav>
                    {/* Nav container */}
                    <div className="nav-container">
                        {/* Nav logo */}
                        <div className="logo">logo</div>
                        {/* Nav links */}
                        <ul>
                            <li><a href="#">Home</a></li>
                            <li><a href="#">About</a></li>
                            <li><a href="#">Contact</a></li>
                        </ul>
                    </div>
                </nav>
                {/* End of nav */}
                {html.children}
            </body>
        </html>
    )
}

module.exports = Def;