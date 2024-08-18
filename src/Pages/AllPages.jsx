import { Link } from "react-router-dom";

function AllPages() {
    const listOfRoutes = [
        {
            id: 1,
            routeName: "Listed Products - IMPORTANT",
            path: "/products",
            pathName: "All products are listed here",
        },

    ];
    return (
        <>
            <ins><h3 className="container my-4 mx-4">This page/s are not staged on UI</h3></ins>
            {listOfRoutes.map(({ id, routeName, path, pathName }) => (
                <div className="my-4 mx-4 card" key={id}>
                    <div className="card-header text-light bg-dark">Route - {id}</div>
                    <div className="card-body">
                        <h5 className="card-title">{routeName}</h5>
                        <p className="card-text">
                            {pathName} - <Link to={path}>{path}</Link>
                        </p>
                    </div>
                </div>
            ))}
        </>
    )
}

export default AllPages
