import { db } from "@/services/firebase";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  setDoc,
} from "firebase/firestore";
import { toast } from "sonner";

export const firestoreDb = () => {
  const addToDb = async (collectionName, data) => {
    const docRef = await addDoc(collection(db, collectionName), data);
    console.log("Document written with ID:", docRef.id);
  };

  const addToWatchlist = async (userId, dataId, data) => {
    try {
      if (await checkIfInWatchlist(userId, dataId)) {
        toast.error("Already in your watchlist🤦‍♂️");
        return false;
      }
      await setDoc(doc(db, "users", userId, "watchlist", dataId), data);
      toast.success("Added to watchlist!😊");
    } catch (error) {
      console.log(error, "Error");
      toast.error("An error occurred while adding to watchlist😢");
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

  return {
    addToDb,
    addToWatchlist,
    checkIfInWatchlist,
    removeFromDb,
  };
};
