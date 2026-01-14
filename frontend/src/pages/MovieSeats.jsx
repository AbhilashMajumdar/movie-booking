import React, { useContext, useEffect, useState } from "react";
import Header from "../components/Header";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { AppContext } from "../context/AppContext";
import { BASE_URL } from "../constants";

const MovieSeats = () => {
  const { userData } = useContext(AppContext);
  const params = useParams();
  const { movieName, theatreName } = params;

  const [noOfTickets, setNoOfTickets] = useState("");
  const [movieDeatils, setMovieDetails] = useState({});
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [existingBookedSeats, setExistingBookedSeats] = useState([]);
  const [existingTickets, setExistingTickets] = useState([]);
  const navigate = useNavigate();

  const SEATS_PER_ROW = 10;
  const seatsRowLable = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J"];
  //   creating [1,2,3, .... , 55]
  const allSeats = Array?.from(
    { length: movieDeatils?.totalNoOfTickets || 0 },
    (_, i) => i + 1
  );
  //   creating [[0, 10], [11,20], ..., [51, 55]]
  const rows = [];
  for (let i = 0; i < allSeats?.length; i += SEATS_PER_ROW) {
    rows.push(allSeats?.slice(i, i + SEATS_PER_ROW));
  }

  const fetchMovieDetails = async (movieName) => {
    try {
      const url = `${BASE_URL}/get-movie-details/${movieName}`;
      const response = await fetch(url);
      const result = await response.json();
      const { success, movie } = result;
      setMovieDetails(movie);
      if (movie?.bookedSeats) {
        setExistingBookedSeats(movie?.bookedSeats);
        setExistingTickets(userData?.tickets);
      }
    } catch (error) {
      toast.error(error?.messgae || error);
    }
  };

  useEffect(() => {
    fetchMovieDetails(movieName);
  }, []);

  const bookSeats = async () => {
    try {
      const ticket = {
        movieName: movieDeatils?.movieName,
        theatreName: movieDeatils?.theatreName,
        seats: selectedSeats,
        quantity: selectedSeats?.length,
        status: "Confirmed",
      };
      const tickets = [...existingTickets, ticket];
      const bookedSeats = [...existingBookedSeats, ...selectedSeats];

      const payload = {
        id: movieDeatils?._id,
        userId: userData?.id,
        bookedSeats,
        bookedNoOfTickets: bookedSeats?.length,
        tickets,
      };

      const url = `${BASE_URL}/bookseats`;
      const response = await fetch(url, {
        method: "PUT",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(payload),
      });
      const result = await response.json();
      const { success, messgae } = result;
      if (success) {
        toast.success("Ticket booked successfully!");
        setTimeout(() => {
          navigate("/my-tickets");
        }, [2000]);
      } else {
        toast.error(messgae);
      }
    } catch (error) {
      console.log(error?.messgae || error);
    }
  };

  const handleSubmit = () => {
    const noOfSeats = Number(noOfTickets);
    if (noOfSeats === 0) {
      toast.error("Please enter the no of tickets");
    } else if (noOfSeats !== selectedSeats?.length) {
      toast.error(`Please select exactly ${noOfTickets} seats`);
    } else {
      bookSeats();
    }
  };

  const handleSelect = (seatId) => {
    if (selectedSeats?.includes(seatId)) {
      const seats = selectedSeats?.filter((seat) => seat !== seatId);
      setSelectedSeats(seats);
    } else {
      setSelectedSeats((prev) => [...prev, seatId]);
    }
  };

  return (
    <div>
      <div className="flex min-h-full flex-col justify-center items-center px-6 py-12 lg:px-8">
        <div className="w-full md:w-10/12 lg:w-8/12 my-8 p-8 bg-gray-100 rounded-xl">
          {/* heading  */}
          <div className="heading">
            <Header heading={"Select your Seats"} />
          </div>

          {/* subheading  */}
          <div className="text-center my-4">
            <span>
              {movieDeatils?.movieName} - {movieDeatils?.theatreName}
            </span>
          </div>

          {/* no of tickets that user wants to buy */}
          <div className="my-4">
            <div className="mb-6">
              <p className="text-lg font-bold">No of tickets</p>
            </div>

            <div>
              <div className="mt-2">
                <input
                  id="noOfTickets"
                  name="noOfTickets"
                  type="number"
                  value={noOfTickets}
                  onChange={(e) => setNoOfTickets(e.target.value)}
                  required
                  className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                />
              </div>
            </div>
          </div>

          {/* seats  */}
          <div className="my-8 text-center">
            {rows.map((rowSeats, rowIndex) => (
              <div className="flex justify-center" key={rowIndex}>
                <span className="self-center font-bold mr-4">
                  {seatsRowLable[rowIndex]}
                </span>

                {rowSeats.map((seatNum) => {
                  const seatId = `${seatsRowLable[rowIndex]}${
                    seatNum % 10 === 0 ? 10 : seatNum % 10
                  }`;
                  const isSelected = selectedSeats?.includes(seatId);
                  const isBooked = existingBookedSeats?.includes(seatId);

                  return (
                    <button
                      key={seatId}
                      className={`px-2 py-1 ${
                        isSelected
                          ? "bg-green-400"
                          : isBooked
                          ? "bg-red-400 text-white"
                          : "bg-gray-200 hover:bg-indigo-200"
                      } m-2 rounded-md cursor-pointer `}
                      onClick={() => handleSelect(seatId)}
                      disabled={isBooked}
                    >
                      {seatId}
                    </button>
                  );
                })}
              </div>
            ))}
          </div>

          {/* button  */}
          <div className="my-4">
            <button
              type="submit"
              className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 cursor-pointer"
              onClick={handleSubmit}
            >
              Confirm Booking
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieSeats;
