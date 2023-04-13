import Axios from "axios";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";

function useFetcher() {
  const { data: session } = useSession();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [data, setData] = useState<any>(null);
  const [dataLength, setDataLength] = useState(0);

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
    if (deleteBoat.statusText == "OK") {
      let filteredData = data.filter((d: any) => d._id !== boat._id);
      setData(filteredData);
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
    fetchWithAuthSync,
    updateBoat,
    deleteBoat,
    dataLength,
    loading,
    error,
    data,
  };
}

export default useFetcher;
