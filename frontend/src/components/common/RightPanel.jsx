import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";

import useFollow from "../../hooks/useFollow";
import ThemeToggleButton from "../common/ThemeToggleButton";

import RightPanelSkeleton from "../skeletons/RightPanelSkeleton";
import LoadingSpinner from "./LoadingSpinner";

const RightPanel = () => {
  const [loadingUserId, setLoadingUserId] = useState(null);

  const { data: suggestedUsers, isLoading } = useQuery({
    queryKey: ["suggestedUsers"],
    queryFn: async () => {
      try {
        const res = await fetch("/api/users/suggested");
        const data = await res.json();
        if (!res.ok) {
          throw new Error(data.error || "Something went wrong!");
        }
        return data;
      } catch (error) {
        throw new Error(error.message);
      }
    },
  });

  const { follow, isPending } = useFollow();

  if (suggestedUsers?.length === 0) return <div className="md:w-64 w-0"></div>;

  const handleFollowClick = (e, userId) => {
    // Prevent the default behavior of the link (navigating to the user's profile)
    e.preventDefault();
  
    // Set the loadingUserId state to the current user's ID to show the loading spinner on their button
    setLoadingUserId(userId);
  
    // Call the follow function with the user ID and provide success and error callbacks
    follow(userId, {
      onSuccess: () => setLoadingUserId(null), // Reset loadingUserId on success
      onError: () => setLoadingUserId(null),   // Reset loadingUserId on error
    });
  };
  

  return (
    <div className="hidden lg:block my-4 mx-2">
      <div className="p-4 rounded-md sticky top-2 h-[calc(100vh-2rem)] overflow-hidden flex flex-col">
        <div className="flex flex-col flex-1 gap-4 overflow-hidden">
          <p className="font-bold ">Explore Uncovered Voices</p>
          <div className="flex flex-col gap-4 overflow-y-auto pr-2 flex-1">
            {isLoading && (
              <>
                <RightPanelSkeleton />
                <RightPanelSkeleton />
                <RightPanelSkeleton />
                <RightPanelSkeleton />
              </>
            )}
            {!isLoading &&
              suggestedUsers?.map((user) => (
                <Link
                  to={`/profile/${user.username}`}
                  className="flex items-center justify-between gap-4"
                  key={user._id}
                >
                  <div className="flex gap-2 items-center">
                    <div className="avatar w-8 h-8 rounded-full overflow-hidden">
                      <img src={user.profileImg || "/avatar-placeholder.png"} className="w-full h-full object-cover" />
                    </div>
                    <div className="flex flex-col">
                      <span className="font-semibold tracking-tight truncate w-28">
                        {user.fullName}
                      </span>
                      <span className="text-sm text-slate-500">@{user.username}</span>
                    </div>
                  </div>
                  <div>
                    <button
                      className="btn bg-button-color text-color hover:bg-base-100 hover:opacity-90 rounded-full btn-sm"
                      onClick={(e) => handleFollowClick(e, user._id)}
                    >
                      {loadingUserId === user._id ? <LoadingSpinner size="sm" /> : "+ Associate"}
                    </button>
                  </div>
                </Link>
              ))}
          </div>
        </div>
        <div className="mt-8 flex justify-center items-end">
          <ThemeToggleButton />
        </div>
      </div>
    </div>
  );
};

export default RightPanel;
