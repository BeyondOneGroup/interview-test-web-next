"use client";

import Image from "next/image";
import React, { useState, useEffect } from "react";
import axios from "axios";

export default function Home() {
  const [data, setData] = useState<{ name: string; url: string }[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const apiUrl = "https://pokeapi.co/api/v2/pokemon/?offset=0&limit=50";

    axios
      .get<unknown, any>(apiUrl)
      .then((response) => {
        setData(response.data.results);
        setLoading(false);
      })
      .catch((error) => {
        setError(error);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <h1>Pokemons</h1>
      <ul>
        {data.map((post) => (
          <li key={post.name}>
            <p>{post.name}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
