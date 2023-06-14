import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { useLocation } from "react-router-dom";
import axios from "axios";
import PlaceImg from "../PlaceImg";

export default function PlacesPage() {
  const action = window.location.pathname;
  const [places, setPlaces] = useState([]);

  useEffect(() => {
    axios.get("/user-places").then(({ data }) => {
      setPlaces(data);
    });
  }, []);

  return (
    <div className="grid grid-cols-[1fr_3fr_1fr]">
    <div></div>
    <div>
      <div className="text-center mx-8">
        <Link
          className="mt-4 inline-flex bg-primary text-white py-2 px-6 rounded-full"
          to={"/account/places/new"}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 4.5v15m7.5-7.5h-15"
            />
          </svg>
          Dodaj nowe miejsce
        </Link>
      </div>
      <div className="mt-4">
        {places.length > 0 &&
          places.map((place) => (
            <Link
              to={"/account/places/" + place._id}
              className="flex gap-4 bg-gray-100 rounded-2xl overflow-hidden mb-4"
            >
              <div className="flex w-32 h-32 bg-gray-300 shrink-0">
                <PlaceImg place={place}/>
              </div>
              <div className="grow-0 shrink">
                <h2 className="text-xl">{place.title}</h2>
                <p className="text-sm mt-2 border-t border-gray-300">{place.description}</p>
              </div>
            </Link>
          ))}
      </div>
    </div>
    <div></div>
    </div>
  );
}
