"use client";
import { signOutUser } from "@/actions/auth.actions";
import React from "react";

export const LogoutButton = () => {
  return (
    <div
      onClick={() => {
        signOutUser();
      }}
    >
      LogoutButton
    </div>
  );
};
