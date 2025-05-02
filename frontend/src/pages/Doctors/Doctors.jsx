import React, { useEffect, useState } from "react";
import DoctorCard from "../../components/Doctors/DoctorCard";
import Testimonial from "../../components/Testimonial/Testimonial";
import { BASE_URL } from "../../config";
import useFetchData from "../../hooks/useFetchData";
import Loader from "../../components/Loader/Loading";
import Error from "../../components/Error/Error";

const Doctors = () => {
  const [query, setQuery] = useState(""); // search query
  const [debounceQuery, setDebounceQuery] = useState(""); // debounced query

  // Debounce: update query after 700ms of no typing
  useEffect(() => {
    const timeout = setTimeout(() => {
      setDebounceQuery(query.trim());
    }, 700);

    return () => clearTimeout(timeout);
  }, [query]);

  // Fetch data based on debounceQuery
  const {
    data: doctors,
    loading,
    error,
  } = useFetchData(`${BASE_URL}/doctors?query=${debounceQuery}`);

  // Trigger immediate search on button click
  const handleSearch = () => {
    const trimmed = query.trim();
    setQuery(trimmed);
    setDebounceQuery(trimmed); // bypass debounce
  };

  return (
    <>
      <section className="bg-[#fff9ea]">
        <div className="container text-center">
          <h2 className="heading">Find a Doctor</h2>
          <div className="max-w-[570px] mt-[30px] mx-auto bg-[#0066ff2c] rounded-md flex items-center justify-between">
            <input
              type="search"
              className="py-4 pl-4 pr-2 bg-transparent w-full focus:outline-none cursor-pointer placeholder:text-textColor"
              placeholder="Search doctor by name or specialization"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
            <button
              className="btn mt-0 rounded-[0px] rounded-r-md"
              onClick={handleSearch}
            >
              Search
            </button>
          </div>
        </div>
      </section>

      <section>
        {loading && <Loader />}
        {error && <Error />}
        {!loading && !error && (
          <div className="container">
            {doctors.length === 0 ? (
              <p className="text-center text-gray-500 mt-5">
                No doctors found.
              </p>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
                {doctors.map((doctor) => (
                  <DoctorCard key={doctor._id} doctor={doctor} />
                ))}
              </div>
            )}
          </div>
        )}
      </section>

      <section>
        <div className="container">
          <div className="xl:w-[470px] mx-auto">
            <h2 className="heading text-center">What our patients say</h2>
            <p className="text__para text-center">
              World-class care for everyone. Our health system offers
              unmatched, expert health care.
            </p>
          </div>
          <Testimonial />
        </div>
      </section>
    </>
  );
};

export default Doctors;
