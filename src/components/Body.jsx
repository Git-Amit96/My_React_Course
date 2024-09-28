import RestaurentCard from "./Rest_Card";
import { useState, useEffect } from "react";
import Shimmer from "./Shimmer";
import { Link } from "react-router-dom";

// const fetchData = async () => {
//     try {
//         const response = await fetch("https://www.swiggy.com/mapi/homepage/getCards?lat=28.6542&lng=77.2373");
//         const json = await response.json();
//         newData = json.data.success.cards[3].gridWidget.gridElements.infoWithStyle.restaurants;
//         console.log(newData); // Check what data is coming back
//         return newData;  // Return the data once fetched
//     } catch (error) {
//         console.error("Error fetching data:", error);
//     }
// };


const Body = () => {

    const [searchValue, setSearchValue] = useState("");
    const [listRestaurants, setListRestaurants] = useState([]);
    const [filterListRestaurants, setFilterListRestaurants] = useState([]);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        const data = await fetch("https://www.swiggy.com/dapi/restaurants/list/v5?lat=12.9715987&lng=77.5945627");
        const jsonn = await data.json();
        // * Optional Chaining
        setListRestaurants(jsonn.data?.cards?.[4]?.card?.card?.gridElements?.infoWithStyle?.restaurants);
        setFilterListRestaurants(jsonn.data?.cards?.[4]?.card?.card?.gridElements?.infoWithStyle?.restaurants);
    };

    // Conditional Rendering
    // if(listRestaurants.length ===0){
    //     return <Shimmer/>;
    // }

    return listRestaurants.length === 0 ? <Shimmer /> : (
        <div className="Body">
            <div className="Button-Container">
                <button
                    onClick={() => {
                        setFilterListRestaurants(listRestaurants);
                    }}
                >All Restaurants
                </button>
                <button
                    onClick={() => {
                        const FilteredList = listRestaurants.filter((res) => { return res.info.avgRating >= 4.4 });
                        setFilterListRestaurants(FilteredList);
                    }}
                >Top Rated Restaurants
                </button>
                <button
                    onClick={() => {
                        const FilteredList = listRestaurants.filter((res) => { return res.info.costForTwo.slice(1, 4) <= 300 });
                        setFilterListRestaurants(FilteredList);
                    }}
                >Cheapest
                </button>
                <div>
                    <input className="search-container" placeholder="Search Restaurants" type="text" value={searchValue} onChange={(e) => { setSearchValue(e.target.value) }} />
                    <button onClick={() => {
                        const Filter = listRestaurants.filter((res) => res.info.name.toLowerCase().includes(searchValue));
                        setFilterListRestaurants(Filter)

                    }}>Search</button>

                </div>
            </div>
            <div className="Restaurent-container">
                {filterListRestaurants.map((restInfo) => {

                  return ( <Link to={`/restaurants/${restInfo.info.id}`} key={restInfo.info.id}>
                        <RestaurentCard restData={restInfo} />
                    </Link>)
                })}
            </div>
        </div>
    )
}
export default Body;