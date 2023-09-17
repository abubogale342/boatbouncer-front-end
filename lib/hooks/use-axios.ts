import Axios from "axios";
import { setActiveId } from "features/bookmark/bookmarkSlice";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

function useFetcher() {
  const { data: session } = useSession();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [data, setData] = useState<any>(null);
  const [dataLength, setDataLength] = useState(0);
  const dispatch = useDispatch();

  Axios.defaults.baseURL = process.env.NEXT_PUBLIC_API_URL;

  useEffect(() => {
    if (session?.token) {
      Axios.defaults.headers.common = {
        Authorization: `Bearer ${session?.token}`,
      };
    }
  }, [session?.token]);

  function updateBoat(path: string, body?: any) {
    setError(null);
    setLoading(true);
    setData(null);

    if (body) {
      Axios.put(path, body)
        .then((res) => {
          setLoading(false);
          setError(null);
          setData(res);
        })
        .catch((error) => {
          setLoading(false);
          setError(error);
          // setData(null)
        });
    }
  }

  async function deleteBoat(path: string, boat: any) {
    let deleteBoat = await Axios.delete(path);
    if (deleteBoat.status == 200) {
      let filteredData = data.filter((d: any) => d._id !== boat._id);
      setData(filteredData);
      setDataLength(filteredData.length);
    }
  }

  async function cancelBooking(path: string, book: any) {
    let deleteBooking = await Axios.put(path);
    if (deleteBooking.status == 200) {
      let filteredData = data.filter((d: any) => d._id !== book._id);
      const filteredIndex = data.findIndex((d: any) => d._id === book._id);
      setData(filteredData);
      if (filteredData.length === 1) {
        dispatch(setActiveId(filteredData[0]._id));
      } else if (filteredData.length === 0) {
        dispatch(setActiveId(null));
      } else {
        if (filteredIndex === filteredData.length) {
          dispatch(setActiveId(filteredData[filteredIndex - 1]._id));
        } else {
          dispatch(setActiveId(filteredData[filteredIndex]._id));
        }
      }
    }
  }

  function fetchWithAuth(path: string, body?: any) {
    setError(null);
    setLoading(true);
    setData(null);

    if (body) {
      Axios.post(path, body)
        .then((res) => {
          setLoading(false);
          setError(null);
          setData(res);
        })
        .catch((err) => {
          setError(err);
          setLoading(false);
          setData(null);
        });
    } else {
      Axios.get(path)
        .then((res) => {
          setLoading(false);
          setError(null);
          setData(res?.data?.data);
          setDataLength(res?.data?.total ?? 0);
        })
        .catch((err) => {
          setError(err);
          setLoading(false);
          setData(null);
        });
    }
  }

  function fetchCategories(path: string) {
    setError(null);
    setLoading(true);
    setData(null);

    Axios.get(path)
      .then((res) => {
        setLoading(false);
        setError(null);
        setData(res?.data);
      })
      .catch((err) => {
        setError(err);
        setLoading(false);
        setData(null);
      });
  }

  function attachPaymentCard(path: string) {
    return Axios.post(path);
  }

  function getPaymentCards(path: string) {
    return Axios.get(path);
  }

  function updateOffer(path: string, body: any) {
    return Axios.put(path, body);
  }

  function updateUser(path: string, body: any) {
    return Axios.put(path, body);
  }

  function acceptOffer(path: string) {
    return Axios.put(path);
  }

  function fetchWithAuthSync(path: string, body?: any) {
    if (body) {
      return Axios.post(path, body);
    } else {
      return Axios.get(path);
    }
  }

  return {
    Axios,
    fetchWithAuth,
    fetchCategories,
    fetchWithAuthSync,
    attachPaymentCard,
    getPaymentCards,
    cancelBooking,
    updateOffer,
    acceptOffer,
    updateBoat,
    deleteBoat,
    updateUser,
    dataLength,
    setData,
    loading,
    error,
    data,
  };
}

export default useFetcher;
