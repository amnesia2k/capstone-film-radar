import { db } from "@/services/firebase";
import {
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  setDoc,
} from "firebase/firestore";
import { toast } from "sonner";

export const firestoreDb = () => {
  const addToWatchlist = async (userId, dataId, data) => {
    try {
      if (await checkIfInWatchlist(userId, dataId)) {
        toast.error("Already in your watchlist🤦‍♂️");
        return false;
      }
      await setDoc(doc(db, "users", userId, "watchlist", dataId), data);
      toast.success("Added to watchlist!😊");
    } catch (error) {
      console.error(error, "Error");
      toast.error("An error occurred while adding to watchlist😢");
    }
  };

  const toggleWatchedMovie = async (userId, dataId, isWatched) => {
    try {
      if (!userId || !dataId) {
        throw new Error("Missing userId or dataId");
      }

      // console.log("Toggling watched status:", {
      //   userId,
      //   dataId,
      //   isWatched,
      // });

      const movieRef = doc(db, "users", userId, "watchlist", dataId.toString());

      // 💣 Log before writing
      const payload = { watchedMovie: isWatched };
      // console.log("Setting doc with:", payload);

      await setDoc(movieRef, payload, { merge: true });

      toast[isWatched ? "success" : "warning"](
        isWatched ? "Marked as watched 🎉" : "Marked as unwatched 😴"
      );

      // if (isWatched) {
      //   toast.success("Marked as watched 🎉");
      // } else {
      //   toast.warning("Marked as unwatched 😴");
      // }

      // isWatched
      //   ? toast.success(isWatched && "Marked as watched 🎉")
      //   : toast.warning(isWatched && "Marked as unwatched 😴");
    } catch (error) {
      console.error("🔥 Firestore update error:", error.message, error);
      toast.error("Couldn't update watched status 💀");
    }
  };

  const checkIfInWatchlist = async (userId, dataId) => {
    const docRef = doc(
      db,
      "users",
      userId?.toString(),
      "watchlist",
      dataId?.toString()
    );

    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      return true;
    } else {
      return false;
    }
  };

  const removeFromDb = async (userId, dataId) => {
    try {
      await deleteDoc(
        doc(db, "users", userId?.toString(), "watchlist", dataId?.toString())
      );
      toast.success("Removed from watchlist");
    } catch (error) {
      console.error(error, "error removing movie from database");
      toast.error("An error occurred while removing from watchlist😢");
    }
  };

  const userWatchlist = async (userId) => {
    const snapshot = await getDocs(
      collection(db, "users", userId, "watchlist")
    );
    const data = snapshot.docs.map((doc) => ({
      ...doc.data(),
    }));

    return data;
  };

  return {
    addToWatchlist,
    checkIfInWatchlist,
    removeFromDb,
    userWatchlist,
    toggleWatchedMovie,
  };
};
