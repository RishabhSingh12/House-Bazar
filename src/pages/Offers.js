import React, { useEffect, useState } from "react";
import Layout from "./../components/Layouts/Layout";
import "../styles/offers.css";
import { IoReloadCircle } from "react-icons/io5";

import { db } from "./../firebase.config";
import { toast } from "react-toastify";
import {
  collection,
  getDocs,
  query,
  where,
  orderBy,
  limit,
  startAfter,
} from "firebase/firestore";
import Spinner from "../components/Spinner";
import ListingItem from "../components/ListingItem";

const Offers = () => {
  const [listing, setListing] = useState("");
  const [loading, setLoading] = useState(true);
  const [lastFetchListing, setLastFetchListing] = useState(null);

  //fetch listing
  useEffect(() => {
    const fetchListing = async () => {
      try {
        //refrence
        const listingsRef = collection(db, "listings");
        //query
        const q = query(
          listingsRef,
          where("offer", "==", true),
          orderBy("timestamp", "desc"),
          limit(1)
        );
        //execute query
        const querySnap = await getDocs(q);
        const lastVisible = querySnap.docs[querySnap.docs.length - 1];
        setLastFetchListing(lastVisible);
        const listings = [];
        querySnap.forEach((doc) => {
          return listings.push({
            id: doc.id,
            data: doc.data(),
          });
        });
        setListing(listings);
        setLoading(false);
      } catch (error) {
        console.log(error);
        toast.error("Unable to fetch data");
      }
    };
    //func call
    fetchListing();
  }, []);

  //load more pagination
  const fetchLoadMoreListing = async () => {
    try {
      //refrence
      const listingsRef = collection(db, "listings");
      //query
      const q = query(
        listingsRef,
        where("offer", "==", true),
        orderBy("timestamp", "desc"),
        startAfter(lastFetchListing),
        limit(10)
      );
      //execute query
      const querySnap = await getDocs(q);
      const lastVisible = querySnap.docs[querySnap.docs.length - 1];
      setLastFetchListing(lastVisible);
      const listings = [];
      querySnap.forEach((doc) => {
        return listings.push({
          id: doc.id,
          data: doc.data(),
        });
      });
      setListing((prevState) => [...prevState, ...listings]);
      setLoading(false);
    } catch (error) {
      console.log(error);
      toast.error("Unble to fetch data");
    }
  };

  return (
    <Layout title="best offers on houses">
      <div className="offers pt-3 container-fluid">
        <h1>
          {" "}
          <img
            src="/assets/offer.png"
            alt="offers"
            className="offer-img"
          />{" "}
          Best Offers
        </h1>
        {loading ? (
          <Spinner />
        ) : listing && listing.length > 0 ? (
          <>
            <div>
              {listing.map((list) => (
                <ListingItem listing={list.data} id={list.id} key={list.id} />
              ))}
            </div>
          </>
        ) : (
          <p>There Are No Current Offers </p>
        )}
        <div className="d-flex align-items-center justify-content-center pb-4 mt-4">
          {lastFetchListing && (
            <button className="load-btn" onClick={fetchLoadMoreListing}>
              <IoReloadCircle /> load more
            </button>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default Offers;
