import { useState } from "react";
import Perks from "../Perks";
import axios from "axios";
export default function NewPlacePage() {
  const [title, setTitle] = useState("");
  const [address, setAddress] = useState("");
  const [addedPhotos, setAddedPhotos] = useState([]);
  const [photoLink, setPhotoLink] = useState("");
  const [description, setDescription] = useState("");
  const [perks, setPerks] = useState([]);
  const [extraInfo, setExtraInfo] = useState("");
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [maxGuests, setMaxGuests] = useState(1);

  function inputHeader(text) {
    return <h2 className="text-2xl mt-4">{text}</h2>;
  }

  function inputDescription(text) {
    return <p className="text-gray-500 text-sm">{text}</p>;
  }

  function preInput(header, description) {
    return (
      <>
        {inputHeader(header)}
        {inputDescription(description)}
      </>
    );
  }

  async function addPhotoByLink(e) {
    e.preventDefault();
    const { data: filename } = await axios.post("/upload-by-link", {
      link: photoLink,
    });
    setAddedPhotos((prev) => {
      return [...prev, filename];
    });
    setPhotoLink("");
  }

  function uploadPhoto(ev) {
    const files = ev.target.files;
    const data = new FormData();
    for (let i = 0; i < files.length; i++) {
      data.append("photos", files[i]);
    }

    axios
      .post("/upload", data, {
        headers: { "Content-type": "multipart/form-data" },
      })
      .then((res) => {
        const { data: filenames } = res;
        setAddedPhotos((prev) => {
          return [...prev, ...filenames];
        });
      });
  }

  return (
    <div>
      <form>
        {preInput(
          "Tytuł",
          "Tytuł Twojego miejsca powinien być krótki i chwytliwy"
        )}
        <input
          type="text"
          value={title}
          onChange={(ev) => setTitle(ev.target.value)}
          placeholder="title"
        />
        {preInput("Adres", "Adres Twojego miejsca")}
        <input
          type="text"
          value={address}
          onChange={(ev) => setAddress(ev.target.value)}
          placeholder="address"
        />
        {preInput("Zdjęcia", "Im więcej tym lepiej")}
        <div className="flex gap-2">
          <input
            value={photoLink}
            onChange={(ev) => setPhotoLink(ev.target.value)}
            type="text"
            placeholder={"Dodaj używając linka ....jpg"}
          />
          <button
            onClick={addPhotoByLink}
            className="bg-gray-200 px-4 rounded-2xl"
          >
            Dodaj&nbsp;zdjęcie
          </button>
        </div>
        <div className="mt-2 grid gap-2 grid-cols-3 md:grid-col-4 lg:grid-cols6">
          {addedPhotos.length > 0 &&
            addedPhotos.map((link) => (
              <div className="h-32 flex">
                <img
                  className="rounded-2xl w-full object-cover"
                  src={"http://localhost:4000/uploads/" + link}
                  alt=""
                />
              </div>
            ))}

          <label className="h-32 cursor-pointer flex items-center gap-1 justify-center border bg-transparent rounded-2xl p-2 text-2xl text-gray-600">
            <input
              type="file"
              multiple
              className="hidden"
              onChange={uploadPhoto}
            />
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-8 h-8"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 16.5V9.75m0 0l3 3m-3-3l-3 3M6.75 19.5a4.5 4.5 0 01-1.41-8.775 5.25 5.25 0 0110.233-2.33 3 3 0 013.758 3.848A3.752 3.752 0 0118 19.5H6.75z"
              />
            </svg>
            Wrzuć pliki
          </label>
        </div>
        {preInput("Opis", "Opis miejsca")}
        <textarea
          value={description}
          onChange={(ev) => setDescription(ev.target.value)}
        ></textarea>
        {preInput(
          "Udogodnienia",
          " Wybierz wszystkie udogodnienia dostępne w Twoim miejscu"
        )}
        <div className="grid mt-2 gap-2 grid-cols-2 md:grid-cols-4 lg:grid-cols-6">
          <Perks selected={perks} onChange={setPerks} />
        </div>
        {preInput(
          "Dodatkowe informacje",
          "Zasady obowiązujące w Twoim miejscu, itp..."
        )}
        <textarea
          value={extraInfo}
          onChange={(ev) => setExtraInfo(ev.target.value)}
        />
        {preInput(
          "Zameldowanie/wymeldowanie",
          "Dodaj godziny zameldownia oraz wymeldowania"
        )}
        <div className="grid gap-2 sm:grid-cols-3">
          <div>
            <h3 className="mt-2 -mb-1">Godzina zameldowania</h3>
            <input
              type="text"
              value={checkIn}
              onChange={(ev) => setCheckIn(ev.target.value)}
              placeholder="14:00"
            />
          </div>
          <div>
            <h3 className="mt-2 -mb-1">Godzina wymeldowania</h3>
            <input
              type="text"
              value={checkOut}
              onChange={(ev) => setCheckOut(ev.target.value)}
              placeholder="11:00"
            />
          </div>
          <div>
            <h3 className="mt-2 -mb-1">Maksymalna liczba gości</h3>
            <input
              type="number"
              value={maxGuests}
              onChange={(ev) => setMaxGuests(ev.target.value)}
            />
          </div>
        </div>
        <button className="primary my-4">Zapisz</button>
      </form>
    </div>
  );
}
