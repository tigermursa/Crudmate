"use client";
import React from "react";
import { getAllUsers } from "@/lib/getAllUsers";
import { useQuery } from "@tanstack/react-query";

const Hello = () => {
  const query = useQuery({ queryKey: ["test"], queryFn: getAllUsers });
  console.log(query);
  return <div>hello</div>;
};

export default Hello;
