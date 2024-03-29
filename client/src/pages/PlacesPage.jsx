import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";

export default function PlacesPage() {
  //const { action } = location.useLocation().pathname;
  return (
    <div>
      <div className="text-center">
        <Link
          className="inline-flex bg-primary text-white py-2 px-6 rounded-full"
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
      my places
    </div>
  );
}
