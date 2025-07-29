import React from "react";
import { Avatar, AvatarFallback } from "./ui/avatar";
import { getAvatarInitials } from "@/lib/utils";
import { User } from "next-auth";
import { User as PrismaUser } from "@prisma/client";

export const UserAvatar = ({ user }: { user: User | PrismaUser }) => {
  return (
    <div className="flex items-center gap-2">
      <Avatar>
        <AvatarFallback>{getAvatarInitials(user.name!)}</AvatarFallback>
      </Avatar>
      {user.name}
    </div>
  );
};
