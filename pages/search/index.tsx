import Meta from "@/components/layout/meta";
import SearchResults from "@/components/searchResults";
import Footer from "@/components/shared/footer";
import Header from "@/components/shared/header";
import { getSession } from "next-auth/react";
import Link from "next/link";
import { ChangeEvent, useContext, useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";
import { Suspense } from "react";
import { Filter } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import SearchFilter from "@/components/SearchFilter";
import Slider from "@mui/material/Slider";
import { useDebouncedCallback } from "use-debounce";
import { categories } from "@/components/listing/forms/data";
import {
  Accordion,
  AccordionHeader,
  AccordionBody,
} from "@material-tailwind/react";
import Icon from "@/components/shared/icons/accordionIcon";
import _ from "lodash";
import mapboxgl from "mapbox-gl";
import { MapContext } from "features/context/mapContext";
import { useDispatch } from "react-redux";
import { setBoats } from "features/boat/boatSlice";
import bgImage from "public/location.png";

const AddressAutoFill = dynamic(
  async () => await import("../../components/search"),
  {
    suspense: true,
    ssr: false,
  },
);

const priceValueText = (value: number) => `${value}°C`;
const boatValueText = (value: number) => `${value}'`;

export default function Search(props: any) {
  const { data: serverData, error, ...user } = props;
  const [checked, setChecked] = useState(true);
  const [data, setData] = useState(serverData);
  const [withCaptain, setWithCaptain] = useState(false);
  const [noCaptain, setNoCaptain] = useState(false);
  const [priceValue, setPriceValue] = useState<number[]>([1, 1000]);
  const [boatValue, setBoatValue] = useState<number[]>([0, 100]);
  const [categoryList, setCategoryList] = useState<string[]>([]);
  const [priceChange, setPriceChange] = useState(false);
  const [boatChange, setBoatChange] = useState(false);
  const [open, setOpen] = useState(0);
  const { map, setMap } = useContext(MapContext);
  const mapContainer = useRef(null);
  const dispatch = useDispatch();
  const handleOpen = (value: number) => setOpen(open === value ? 0 : value);
  const [markers, setMarkers] = useState<mapboxgl.Marker[]>([]);

  const clearResults = () => {
    setWithCaptain(false);
    setNoCaptain(false);
    setPriceValue([1, 1000]);
    setBoatValue([1, 100]);
    setPriceChange((value) => !value);
    setBoatChange((value) => !value);
    setCategoryList([]);
  };

  const handlePriceChange = (event: Event, newValue: number | number[]) => {
    handlePriceChangeCommitted.cancel();
    setPriceValue(newValue as number[]);
  };

  const handlePriceChangeCommitted = useDebouncedCallback(() => {
    setPriceChange((value) => !value);
  }, 750);

  const handleBoatChange = (event: Event, newValue: number | number[]) => {
    handleBoatChangeCommitted.cancel();
    setBoatValue(newValue as number[]);
  };

  const handleBoatChangeCommitted = useDebouncedCallback(() => {
    setBoatChange((value) => !value);
  }, 750);

  const handleMapViewChange = (event: ChangeEvent<HTMLInputElement>) => {
    setChecked(event.target.checked);
  };

  const noCaptainChangeHn = (event: ChangeEvent<HTMLInputElement>) => {
    if (!event.target.checked) {
      setNoCaptain(false);
      setData(serverData);
    }

    if (event.target.checked) {
      setWithCaptain(false);
      setNoCaptain(true);
    }
  };

  const withCaptainChangeHn = (event: ChangeEvent<HTMLInputElement>) => {
    if (!event.target.checked) {
      setWithCaptain(false);
      setData(serverData);
    }

    if (event.target.checked) {
      setWithCaptain(true);
      setNoCaptain(false);
    }
  };

  const handleCategoryChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      setCategoryList([...categoryList, event.target.id]);
    } else {
      setCategoryList(
        categoryList.filter((category) => category !== event.target.id),
      );
    }
  };

  let element = null;

  if (data?.data && data?.total > 0) {
    element = (
      <SearchResults boats={data.data} total={data.total} checked={checked} />
    );
  }

  useEffect(() => {
    let filteredData = serverData;
    if (!filteredData || !filteredData.data || filteredData.total === 0) return;
    filteredData = filteredData.data;

    if (priceValue[0] !== 1 || priceValue[1] !== 1000) {
      filteredData = filteredData.filter((data: any) => {
        let perHourIndex = data.pricing.findIndex(
          (price: any) => price.type == "Per Hour",
        );

        if (priceValue[1] !== 1000) {
          if (
            data.pricing[perHourIndex].value <= priceValue[1] &&
            data.pricing[perHourIndex].value >= priceValue[0]
          ) {
            return true;
          } else return false;
        } else {
          if (data.pricing[perHourIndex].value >= priceValue[0]) {
            return true;
          } else return false;
        }
      });
    }

    if (boatValue[0] !== 0 || boatValue[1] !== 100) {
      filteredData = filteredData.filter((data: any) => {
        if (boatValue[1] !== 100) {
          if (data.length <= boatValue[1] && data.length >= boatValue[0]) {
            return true;
          } else return false;
        } else {
          if (data.length >= boatValue[0]) {
            return true;
          } else return false;
        }
      });
    }

    if (withCaptain) {
      filteredData = filteredData.filter((d: any) => d.captained == true);
    }

    if (noCaptain) {
      filteredData = filteredData.filter((d: any) => d.captained === false);
    }

    if (categoryList.length !== 0) {
      filteredData = filteredData.filter(
        (d: any) => _.intersection(d.category, categoryList).length > 0,
      );
    }

    setData({ data: filteredData, total: filteredData.length });
  }, [withCaptain, noCaptain, priceChange, boatChange, categoryList]);

  useEffect(() => {
    setData(serverData);
    dispatch(setBoats(serverData));
  }, [serverData]);

  useEffect(() => {
    if (!data || !data.data || data.data.length === 0 || !map) return;
    const bounds = new mapboxgl.LngLatBounds();

    // console.log("data.data", data.data);
    if (markers.length > 0) {
      markers.forEach((marker: mapboxgl.Marker) => {
        marker.remove();
      });
    }

    setMarkers([]);

    data.data.forEach((d: any) => {
      let div = document.createElement("div");
      let el = document.createElement("img");

      let p = document.createElement("p");

      p.classList.add("marker-p");
      el.classList.add("marker-image");
      div.classList.add("marker-div");
      div.setAttribute("id", d._id);

      p.innerText = `${d.currency == "USD" ? "$" : "€"}${
        d.pricing.filter((price: any) => price.type == "Per Hour")[0]["value"]
      }`;

      el.src = bgImage.src;

      div.appendChild(el);
      div.appendChild(p);

      let marker = new mapboxgl.Marker(div)
        .setLngLat([d.latLng.coordinates[0], d.latLng.coordinates[1]])
        .setPopup(
          new mapboxgl.Popup().setHTML(`
            <a href="/boat/${d._id}" target="_blank">
              <div>
                <div>
                  <img height="3rem" width="auto" src=${
                    d.imageUrls[0]
                  } alt="" />
                </div>
                <div>
                  <p style="font-size:12px;font-weight:bold;margin-top:0.4rem">${
                    d.boatName
                  }</p>
                  <p style="font-size:12px;font-weight:bold;margin-top:0.4rem">${
                    d.currency == "USD" ? "$" : "€"
                  }${
            d.pricing.filter((price: any) => price.type == "Per Hour")[0][
              "value"
            ]
          }/hour    ${d.currency == "USD" ? "$" : "€"}${
            d.pricing.filter((price: any) => price.type == "Per Day")[0][
              "value"
            ]
          }/day</p>
                </div>
              </div>
            </a>
          `),
        )
        .addTo(map);

      setMarkers([...markers, marker]);
    });

    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const bbox = urlParams.get("bbox");
    // const coordinate = urlParams.get("coordinates");

    if (bbox) {
      map.fitBounds(JSON.parse(bbox));
    } else {
      data.data.forEach((d: any) => {
        if (d.latLng.coordinates[0] && d.latLng.coordinates[1]) {
          bounds.extend([d.latLng.coordinates[0], d.latLng.coordinates[1]]);
        }
      });

      map.fitBounds(bounds, { padding: 50 });
    }
  }, [data, map]);

  useEffect(() => {
    const node = mapContainer.current;
    if (typeof window === "undefined" || node === null) return;

    const mapInstance = new mapboxgl.Map({
      accessToken: `${process.env.NEXT_PUBLIC_MAPBOX_API_TOKEN}`,
      container: node,
      style: "mapbox://styles/mapbox/streets-v11",
      center: [-120.740135, 47.751076],
      attributionControl: false,
      zoom: 9,
    });

    setMap(mapInstance);

    return () => {
      mapInstance.remove();
    };
  }, [typeof window]);

  if (!data || (data?.data && data?.total === 0)) {
    element = (
      <div className="py-10 text-center">
        <h1 className="text-2xl text-gray-700">
          There are no results that match your search
        </h1>
        <h1 className="mt-2 text-gray-700">
          Please try adjusting your search keywords or filters
        </h1>
      </div>
    );
  }

  if (error) {
    element = (
      <div className="text-center">
        <h1 className="text-2xl text-red-800">
          Error occured, wrong happened.
        </h1>
        <h1 className="mt-2 text-red-800">
          Please make sure your internet is working and try again.
        </h1>
      </div>
    );
  }

  return (
    <div className="relative flex min-h-screen w-full flex-col">
      <Meta title="Search" />

      <div className="sticky left-0 right-0 top-0 z-10 bg-white pb-2 shadow-sm">
        <Header {...user}>
          <Link href="/" className="ml-6 text-sm font-bold text-cyan-600">
            Home
          </Link>
        </Header>
        <hr className="mb-2 mt-1 h-px border-0 bg-gray-200" />

        <div className="mx-4 mt-6 flex flex-col items-center justify-between gap-4 sm:mr-10 sm:mt-3 sm:flex-row sm:gap-20 md:gap-28 lg:gap-60">
          <AddressAutoFill />

          <div className="ml-auto flex flex-row items-center gap-5">
            <label className="relative inline-flex w-28 cursor-pointer items-center">
              <input
                type="checkbox"
                defaultChecked
                className="peer sr-only"
                onChange={handleMapViewChange}
              />
              <div className="peer h-6 w-11 rounded-full bg-gray-200 after:absolute after:left-[2px] after:top-[2px] after:h-5 after:w-5 after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all after:content-[''] peer-checked:bg-blue-600 peer-checked:after:translate-x-full peer-checked:after:border-white peer-focus:outline-none peer-focus:ring-4 dark:border-gray-600 dark:bg-gray-700"></div>
              <span className="ml-1 text-sm font-medium text-gray-700 dark:text-gray-300">
                Map View
              </span>
            </label>
            <SearchFilter
              trigger={
                <p className="flex flex-row gap-2 rounded-lg border border-gray-300 px-3 py-2.5 text-sm font-medium text-gray-700 shadow-sm drop-shadow-sm active:translate-y-[1px] dark:text-gray-300">
                  <Filter size="20" /> Filters
                </p>
              }
            >
              <div className="mb-5 mt-2 flex w-full items-center justify-between">
                <p className="font-medium">With Captain</p>
                <label className="relative inline-flex w-14 cursor-pointer items-center">
                  <input
                    type="checkbox"
                    className="peer sr-only"
                    onChange={withCaptainChangeHn}
                    checked={withCaptain}
                  />
                  <div className="peer h-6 w-11 rounded-full bg-gray-200 after:absolute after:left-[2px] after:top-[2px] after:h-5 after:w-5 after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all after:content-[''] peer-checked:bg-blue-600 peer-checked:after:translate-x-full peer-checked:after:border-white peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:border-gray-600 dark:bg-gray-700 dark:peer-focus:ring-blue-800"></div>
                </label>
              </div>
              <div className="mb-5 flex w-full items-center justify-between">
                <p className="font-medium">Not Captained</p>
                <label className="relative inline-flex w-14 cursor-pointer items-center">
                  <input
                    type="checkbox"
                    className="peer sr-only"
                    onChange={noCaptainChangeHn}
                    checked={noCaptain}
                  />
                  <div className="peer h-6 w-11 rounded-full bg-gray-200 after:absolute after:left-[2px] after:top-[2px] after:h-5 after:w-5 after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all after:content-[''] peer-checked:bg-blue-600 peer-checked:after:translate-x-full peer-checked:after:border-white peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:border-gray-600 dark:bg-gray-700 dark:peer-focus:ring-blue-800"></div>
                </label>
              </div>
              <hr />

              <div className="mb-4 mt-3 flex w-full items-center justify-between">
                <p className="font-medium">Price per hour</p>
                <p>
                  ${priceValue[0]} - $
                  {priceValue[1] === 1000 ? `${priceValue[1]}+` : priceValue[1]}
                </p>
              </div>
              <div className="mb-2 ml-2.5 mr-5">
                <Slider
                  min={1}
                  max={1000}
                  className="!w-full"
                  getAriaLabel={() => "Price Range"}
                  value={priceValue}
                  onChange={handlePriceChange}
                  onChangeCommitted={handlePriceChangeCommitted}
                  valueLabelDisplay="auto"
                  getAriaValueText={priceValueText}
                />
              </div>
              <hr />

              <div className="mb-4 mt-3 flex w-full items-center justify-between">
                <p className="font-medium">Boat length</p>

                <p>
                  {boatValue[0]}&apos; -
                  {boatValue[1] === 100
                    ? `${boatValue[1]}&apos;+`
                    : `${boatValue[1]}&apos;`}
                </p>
              </div>
              <div className="mb-2 ml-2.5 mr-5">
                <Slider
                  min={0}
                  max={100}
                  className="!w-full"
                  getAriaLabel={() => "Boat length"}
                  value={boatValue}
                  onChange={handleBoatChange}
                  onChangeCommitted={handleBoatChangeCommitted}
                  valueLabelDisplay="auto"
                  getAriaValueText={boatValueText}
                />
              </div>

              <Accordion
                open={open === 1}
                icon={<Icon id={1} open={open} />}
                className="border-blue-gray-100 mb-2 rounded-lg border-2 px-4"
              >
                <AccordionHeader
                  onClick={() => handleOpen(1)}
                  className="!text-base !font-medium"
                >
                  Boat Category
                </AccordionHeader>
                <AccordionBody>
                  <ul className="mb-4 mt-3 grid w-full gap-5 md:grid-cols-2 lg:grid-cols-1">
                    {categories.map((category) => (
                      <li key={category}>
                        <input
                          type="checkbox"
                          checked={categoryList.includes(category)}
                          id={category}
                          className="peer hidden"
                          onChange={handleCategoryChange}
                        />
                        <label
                          htmlFor={category}
                          className="inline-flex w-full cursor-pointer items-center justify-between rounded-lg border-[1.5px] border-gray-400 bg-white p-5 text-base font-normal text-gray-900 hover:bg-gray-50 hover:text-gray-900 peer-checked:border-2 peer-checked:border-cyan-600 peer-checked:bg-slate-100 peer-checked:text-black"
                        >
                          {category}
                        </label>
                      </li>
                    ))}
                  </ul>
                </AccordionBody>
              </Accordion>

              <br />
              <button
                onClick={clearResults}
                className={`flex w-full flex-row-reverse items-center justify-center gap-2 rounded-md bg-cyan-600 py-3 font-medium  text-white hover:bg-cyan-700 active:translate-y-[1.5px]`}
              >
                <span className="flex items-center justify-center gap-1">
                  Clear all
                </span>
              </button>
            </SearchFilter>
          </div>
        </div>
      </div>

      <AnimatePresence>
        <motion.div
          initial={{ y: 10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -10, opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="my-0 flex h-[calc(100vh_-_132px)] w-screen flex-row"
        >
          <div
            className={`boat-list my-6 ml-5 mr-2.5 h-[calc(100%_-_48px)] w-full overflow-y-scroll pr-2.5 ${
              checked ? "hidden lg:block lg:w-[70vw]" : "block lg:w-screen"
            }`}
          >
            {element}
          </div>
          <div
            className={`${checked ? "block w-screen lg:w-[30vw]" : "hidden"}`}
          >
            <div ref={mapContainer} className="h-full w-full rounded-lg"></div>
          </div>
        </motion.div>
      </AnimatePresence>
      <Footer />
    </div>
  );
}

export async function getServerSideProps(context: any) {
  const { req, query } = context;
  const { method } = req;

  let queryString = new URLSearchParams(query).toString();

  let session = await getSession({ req });

  if (!session) {
    session = null;
  }

  const myHeaders = new Headers();

  myHeaders.append("Authorization", "Bearer " + session?.token);

  const requestOptions = {
    method: "GET",
    headers: myHeaders,
  };

  let data = null;
  let error = null;

  try {
    data = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/boat?${queryString}`,
      requestOptions,
    );

    data = await data.json();

    if (!data) {
      error = true;
    }
  } catch (error) {
    error = error;
  }

  return {
    props: {
      ...session,
      data,
      error,
    },
  };
}
