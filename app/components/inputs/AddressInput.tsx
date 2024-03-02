"useClient";

import { Location } from "@/app/types/location";
import axios from "axios";
import { useEffect, useState } from "react";

interface Props {
  id: string;
  label: string;
  disabled?: boolean;
  address: string;
  onChange: (value: string) => void;
  onSelect: (location: Location) => void;
}

const AddressInput: React.FC<Props> = ({
  id,
  label,
  disabled,
  address,
  onChange,
  onSelect,
}) => {
  const [isSelected, setIsSelected] = useState(true);
  const [searchLocations, setSearchLocations] = useState<Location[]>([]);

  const fetchLocations = async () => {
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(address)}.json`;
    const resp = await axios.get(url, {
      params: {
        access_token: process.env.NEXT_PUBLIC_MAPBOX_TOKEN,
      },
    });

    return resp.data;
  };

  useEffect(() => {
    if (isSelected) {
      return;
    }

    if (!address) {
      setSearchLocations([]);
      return;
    }

    const handler = setTimeout(async () => {
      try {
        const data = await fetchLocations();
        if (data?.features?.length > 0) {
          let searchResults: Location[] = data.features
            .filter((item: any) => {
              return item?.place_name && item?.center?.length === 2;
            })
            .map((item: any) => ({
              address: item.place_name,
              coordinates: {
                longitude: item.center[0],
                latitude: item.center[1],
              },
            }));

          setSearchLocations(searchResults);
        }
      } catch (err) {
        console.error(err);
      }
    }, 500);

    return () => {
      clearTimeout(handler);
    };
  }, [address]);

  const onType = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIsSelected(false);
    onChange(e.target.value);
  };

  const handleSelect = (location: Location) => {
    onSelect(location);
    setIsSelected(true);
    setSearchLocations([]);
  };

  return (
    <div className="w-full relative">
      <input
        id={id}
        disabled={disabled}
        value={address}
        onChange={onType}
        placeholder=" "
        className={`
          peer
          w-full
          p-4
          pt-6
          font-light
          bg-white
          border-2
          rounded-md
          outline-green-800
          transition
          disabled:opacity-70
          disabled:cursor-not-allowed
          pl-4
        `}
      />
      <label
        className="
          absolute 
          text-sm
          duration-150 
          transform 
          -translate-y-3
          top-5 
          z-10
          origin-[0]
          left-4
          peer-placeholder-shown:scale-125
          peer-placeholder-shown:translate-y-0
          peer-focus:scale-75
          peer-focus:-translate-y-4
          text-zinc-400
        "
      >
        {label}
      </label>
      <div
        className="
          absolute
          top-15
          z-10
          border-[2px]
          border-neural-800
        "
      >
        <ul
          className="
            flex
            flex-col
            justify-center
            bg-white
            w-full
          "
        >
          {searchLocations.map((item, index) => (
            <li
              key={index}
              onClick={() => handleSelect(item)}
              className="
                px-4
                py-2
                border-b-[1px]
                hover:bg-neutral-100
              "
            >
              {item.address}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default AddressInput;
