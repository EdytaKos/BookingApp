import { useEffect, useState } from "react";
import Perks from "../Perks";
import PhotosUploader from "../PhotosUploader";
import axios from "axios";
import { Navigate, useParams } from "react-router-dom";

export default function NewPlacePage() {
  const { id } = useParams();
  const [title, setTitle] = useState("");
  const [address, setAddress] = useState("");
  const [addedPhotos, setAddedPhotos] = useState([]);
  const [description, setDescription] = useState("");
  const [perks, setPerks] = useState([]);
  const [extraInfo, setExtraInfo] = useState("");
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [maxGuests, setMaxGuests] = useState(1);
  const [redirect, setRedirect] = useState("");

  useEffect(() => {
    if (!id) {
      return;
    }
    axios.get("places/" + id).then((res) => {
      const { data } = res;
      setTitle(data.title);
      setAddress(data.address);
      setAddedPhotos(data.photos);
      setDescription(data.description);
      setPerks(data.perks);
      setExtraInfo(data.extraInfo);
      setCheckIn(data.checkIn);
      setCheckOut(data.checkOut);
      setMaxGuests(data.maxGuests);
    });
  }, [id]);

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

  async function savePlace(ev) {
    ev.preventDefault();
    const placeData = {
      id,
      title,
      address,
      addedPhotos,
      description,
      perks,
      extraInfo,
      checkIn,
      checkOut,
      maxGuests,
    };
    if (id) {
      //update
      await axios.put("/places/" + id, { ...placeData });
      setRedirect("/account/places");
    } else {
      //new place
      await axios.post("/places", placeData);
      setRedirect("/account/places");
    }
  }

  if (redirect) {
    return <Navigate to={redirect} />;
  }

  return (
    <div className="text-textsec">
      <form onSubmit={savePlace}>
        {preInput(
          "Tytuł",
          "Tytuł Twojego miejsca powinien być krótki i chwytliwy"
        )}
        <input
          className="flex gap-2 border border-textsec rounded-full py-2 px-4 bg-inputBg"
          type="text"
          value={title}
          onChange={(ev) => setTitle(ev.target.value)}
          placeholder="title"
        />
        {preInput("Adres", "Adres Twojego miejsca")}
        <input
          className="flex gap-2 border border-textsec rounded-full py-2 px-4 bg-inputBg"
          type="text"
          value={address}
          onChange={(ev) => setAddress(ev.target.value)}
          placeholder="address"
        />
        {preInput("Zdjęcia", "Im więcej tym lepiej")}
        <PhotosUploader addedPhotos={addedPhotos} onChange={setAddedPhotos} />
        {preInput("Opis", "Opis miejsca")}
        <textarea
          className="flex gap-2 border border-textsec px-4 bg-inputBg"
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
          className="flex gap-2 border border-textsec px-4 bg-inputBg"
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
              className="flex gap-2 border border-textsec rounded-full py-2 px-4 bg-inputBg"
              type="text"
              value={checkIn}
              onChange={(ev) => setCheckIn(ev.target.value)}
              placeholder="14:00"
            />
          </div>
          <div>
            <h3 className="mt-2 -mb-1">Godzina wymeldowania</h3>
            <input
              className="flex gap-2 border border-textsec rounded-full py-2 px-4 bg-inputBg"
              type="text"
              value={checkOut}
              onChange={(ev) => setCheckOut(ev.target.value)}
              placeholder="11:00"
            />
          </div>
          <div>
            <h3 className="mt-2 -mb-1">Maksymalna liczba gości</h3>
            <input
              className="flex gap-2 border border-textsec rounded-full py-2 px-4 bg-inputBg"
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
