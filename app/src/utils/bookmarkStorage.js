import AsyncStorage from "@react-native-async-storage/async-storage";

const BOOKMARKS_KEY = "@top_headlines_bookmarks";

export const getBookmarks = async () => {
  try {
    const data = await AsyncStorage.getItem(BOOKMARKS_KEY);

    return data ? JSON.parse(data) : [];
  } catch (error) {
    console.log("Get Bookmarks Error:", error);
    return [];
  }
};

export const isBookmarked = async (slug) => {
  try {
    const bookmarks = await getBookmarks();

    return bookmarks.some((item) => item.slug === slug);
  } catch (error) {
    console.log("Check Bookmark Error:", error);
    return false;
  }
};

export const addBookmark = async (article) => {
  try {
    const bookmarks = await getBookmarks();

    const alreadyExists = bookmarks.some((item) => item.slug === article.slug);

    if (alreadyExists) {
      return bookmarks;
    }

    const updatedBookmarks = [article, ...bookmarks];

    await AsyncStorage.setItem(BOOKMARKS_KEY, JSON.stringify(updatedBookmarks));

    return updatedBookmarks;
  } catch (error) {
    console.log("Add Bookmark Error:", error);
    return [];
  }
};

export const removeBookmark = async (slug) => {
  try {
    const bookmarks = await getBookmarks();

    const updatedBookmarks = bookmarks.filter((item) => item.slug !== slug);

    await AsyncStorage.setItem(BOOKMARKS_KEY, JSON.stringify(updatedBookmarks));

    return updatedBookmarks;
  } catch (error) {
    console.log("Remove Bookmark Error:", error);
    return [];
  }
};

export const toggleBookmark = async (article) => {
  const bookmarked = await isBookmarked(article.slug);

  if (bookmarked) {
    return {
      bookmarked: false,
      bookmarks: await removeBookmark(article.slug),
    };
  }

  return {
    bookmarked: true,
    bookmarks: await addBookmark(article),
  };
};

export const clearBookmarks = async () => {
  try {
    await AsyncStorage.removeItem(BOOKMARKS_KEY);
  } catch (error) {
    console.log("Clear Bookmarks Error:", error);
  }
};
