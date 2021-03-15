import React from "react";
import usePlacesAutocomplete, {
  getGeocode,
  getLatLng
} from "use-places-autocomplete";
import {
  Combobox,
  ComboboxInput,
  ComboboxPopover,
  ComboboxList,
  ComboboxOption
} from "@reach/combobox";
import "@reach/combobox/styles.css";

const Search = () => {
    const {
        ready, 
        value, 
        suggestions: {status, data}, 
        setValue, 
        clearSuggestion
    } = usePlacesAutocomplete({
        requestOptions: {
          location: { lat: () => -33.492, lng: () => -70.555115 },
          radius: 200 * 1000,
        }
    });

    return (
        <div className="search">
            <Combobox 
                onSelect={(address) => {
                    console.log(address);
                }}
            >
                <ComboboxInput 
                    value={value} 
                    onChange={(e) => {
                        setValue(e.target.value);
                    }}
                    disabled={!ready}
                    placeholder="Enter an address"
                    style={{width: '100%', height: '6vh'}}
                />
                <ComboboxPopover>
                    {status === "OK" && data.map(({id, description}) => <ComboboxOption key={id} value={description} />)}
                </ComboboxPopover>
            </Combobox>
        </div>
    );
  };

  export default Search;