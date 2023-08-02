import { collection, query, getDocs } from 'firebase/firestore';
import { db } from "../firebase";
import { auth } from "../firebase";

export const getFoodItems = async () => {
    const user = auth.currentUser;
    const foodItemsCollection = collection(db, 'users', user?.email, 'foodItems');
    const foodItemsSnapshot = await getDocs(foodItemsCollection);

    const foodItems = foodItemsSnapshot.docs.map(doc => doc.data());

    return foodItems;
}