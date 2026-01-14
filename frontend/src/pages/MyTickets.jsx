import React, { useContext, useEffect } from "react";
import Header from "../components/Header";
import { AppContext } from "../context/AppContext";
import TicketsNotFound from "../components/TicketsNotFound";

const MyTickets = () => {
  const { userData, getUserData } = useContext(AppContext);
  const tickets = userData?.tickets || [];

  useEffect(() => {
    getUserData();
  }, []);

  return (
    <>
      <div className="mt-12 mb-4">
        <Header heading={"My Tickets"} />
      </div>

      {tickets?.length > 0 ? (
        <div>
          <div className="flex w-full justify-center items-center mt-12 mb-36">
            <div
              className={`${
                tickets?.length > 1
                  ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12 w-10/12"
                  : "w-10/12"
              }`}
            >
              {tickets?.map((ticket, i) => {
                return (
                  <div
                    className="p-6 bg-gray-100 rounded-xl w-full text-center"
                    key={i}
                  >
                    <div>
                      <h1 className="text-xl font-bold">{ticket.movieName}</h1>
                    </div>
                    <div className="m-2">
                      <p>{ticket.theatreName}</p>
                    </div>
                    <div className="m-2">
                      <span>Seats : {ticket?.seats?.join(", ")}</span>
                    </div>
                    <div className="m-2">
                      <span>Quantity : {ticket.quantity}</span>
                    </div>
                    <div className="m-2">
                      <span>Status :</span>
                      <span
                        className={`${
                          ticket.status === "Confirmed"
                            ? "text-green-500 font-bold"
                            : "text-black"
                        }`}
                      >
                        {" "}
                        {ticket.status}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      ) : (
        <TicketsNotFound />
      )}
    </>
  );
};

export default MyTickets;
