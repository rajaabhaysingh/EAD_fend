import React, { memo, useCallback, useState } from "react";

import { geocodeByAddress, getLatLng } from "react-places-autocomplete";
import PlacesAutocomplete from "react-places-autocomplete";
import axios from "axios";
import { useToasts } from "react-toast-notifications";
import { useDispatch } from "react-redux";
import { fetchLocation } from "../../redux/actions";
import { IconButton, makeStyles } from "@material-ui/core";

const API_KEY = process.env.REACT_APP_GOOGLE_PLACES_KEY;

const useStyles = makeStyles((theme) => ({
  root: {},
  input: {
    height: "32px",
    width: "100%",
    borderRadius: "4px",
    outline: "none",
    border: "none",
    borderBottom: `1px solid ${theme.palette.divider}`,
    padding: "0 8px",
    boxSizing: "border-box",
    background: theme.palette.background.bg,
    color: theme.palette.text.primary,
  },
  suggBox: {
    position: "relative",
    top: "-1px",
    width: "calc(100% - 2px)",
    border: `1px solid ${theme.palette.divider}`,
    background: theme.palette.background.bg,
    borderRadius: "4px",
    zIndex: 2000,
  },
  suggestion: {
    padding: "4px 8px",
    fontSize: "0.8rem",
    boxSizing: "border-box",
    color: theme.palette.text.secondary,
    cursor: "pointer",
    "&:hover": {
      color: theme.palette.primary.main,
      background: theme.palette.background.paper,
    },
  },
  secTxt: {
    color: theme.palette.text.secondary,
    fontSize: "0.8rem",
    padding: "8px",
  },
  locBtn: {
    marginLeft: "8px",
    height: "32px",
    width: "32px",
    fontSize: "1.2rem",
    background: theme.palette.background.paper,
  },
}));

const LocationAutoComplete = ({ mar, addressForm, setAddressForm }) => {
  const { addToast } = useToasts();
  const dispatch = useDispatch();
  const cls = useStyles();

  // local state management
  const [addressPlaceholder, setAddressPlaceholder] = useState(
    "Search location"
  );
  const [address, setAddress] = useState("");

  // Log error status and clear dropdown when Google Maps API returns an error.
  const onError = useCallback((status, clearSuggestions) => {
    addToast("Location service returned error with status: " + status, {
      appearance: "error",
      autoDismiss: true,
    });
    clearSuggestions();
  }, []);

  // limit the results to below constraints only
  const searchOptions = {
    types: ["geocode"],
    componentRestrictions: {
      country: ["in"],
    },
  };

  // handleSelect
  const handleSelect = (add) => {
    geocodeByAddress(add)
      .then((results) => getLatLng(results[0]))
      .then((latLng) => {
        let locationInfo = {
          location: { address: add, lat: latLng.lat, long: latLng.lng },
        };

        setAddress(add);

        if (setAddressForm) {
          setAddressForm({
            ...addressForm,
            addressLine: add,
            lat: latLng.lat,
            long: latLng.lng,
          });
        } else {
          localStorage.setItem("location", JSON.stringify(locationInfo));

          // dispatch location action
          dispatch(fetchLocation(locationInfo));
        }
      })
      .catch((error) => {
        addToast(error, {
          appearance: "error",
          autoDismiss: true,
        });
      });
  };

  // --------------------------------------------------
  // ---------LOCATION SEARCH BLOCK STARTS HERE--------

  // showPosition
  const showPosition = (position) => {
    let posX = position.coords.latitude;
    let posY = position.coords.longitude;

    let currentLocation = "";

    let locAPI =
      "https://maps.googleapis.com/maps/api/geocode/json?latlng=" +
      posX +
      "," +
      posY +
      "&key=" +
      API_KEY;

    axios
      .get(locAPI)
      .then((response) => {
        currentLocation = response.data.results[0].formatted_address;
        // setting location box status to locating
        let locationInfo = {
          location: {
            address: currentLocation,
            lat: posX,
            long: posY,
          },
        };

        setAddress(currentLocation);

        setAddressPlaceholder(() => "Search location");

        addToast(currentLocation, {
          appearance: "success",
          autoDismiss: true,
        });

        if (setAddressForm) {
          setAddressForm({
            ...addressForm,
            addressLine: currentLocation,
            lat: posX,
            long: posY,
          });
        } else {
          localStorage.setItem("location", JSON.stringify(locationInfo));

          // dispatch location action
          dispatch(fetchLocation(locationInfo));
        }
      })
      .catch((error) => {
        addToast(error, {
          appearance: "error",
          autoDismiss: true,
        });
      })
      .finally();
  };

  const handleError = (error) => {
    let errMsg = "";
    switch (error.code) {
      case error.PERMISSION_DENIED:
        errMsg =
          "PERMISSION_DENIED. Allow website to use location in site settings...";
        break;
      case error.POSITION_UNAVAILABLE:
        errMsg =
          "POSITION_UNAVAILABLE. Your current position is unavailable, please enter your location manually...";
        break;
      case error.TIMEOUT:
        errMsg = "Server timed out. Make sure Location service is turned on...";
        break;
      case error.UNKNOWN_ERROR:
        errMsg = "UNKNOWN_ERROR. Error code: 0";
        break;

      default:
        errMsg =
          "Something unexpected happened. We couldn't process your request...";
        break;
    }
    // setting location box status to locating
    setAddressPlaceholder(() => {
      return "Couldn't locate...";
    });
    addToast(errMsg, {
      appearance: "error",
      autoDismiss: true,
    });
  };

  // getLocation
  const getLocation = () => {
    if (address) {
      setAddress("");
    }
    if (navigator.geolocation) {
      setAddressPlaceholder(() => {
        return "Locating...";
      });
      // get geo location with coords
      navigator.geolocation.getCurrentPosition(showPosition, handleError, {
        enableHighAccuracy: true,
        timeout: 15000,
        maximumAge: 0,
      });
    } else {
      alert(
        "This feature isn't supported. Try manually searching the address..."
      );
    }
  };

  // ----------LOCATION SEARCH BLOCK ENDS HERE---------
  // --------------------------------------------------

  return (
    <div className={mar ? "rel f1 mar_t-32" : "rel f1 mar_t-4"}>
      <PlacesAutocomplete
        value={address}
        onChange={setAddress}
        onSelect={handleSelect}
        onError={onError}
        searchOptions={searchOptions}
      >
        {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
          <div className={cls.suggBox}>
            <input
              {...getInputProps({
                placeholder: addressPlaceholder,
                className: cls.input,
                autoFocus: false,
                required: true,
              })}
            />
            <div>
              {loading && (
                <div className={cls.secTxt}>
                  Loading... <i className="fas fa-circle-notch fa-spin"></i>
                </div>
              )}
              {suggestions &&
                suggestions.map((suggestion, i) => {
                  return (
                    <div
                      key={i}
                      {...getSuggestionItemProps(suggestion, {
                        className: cls.suggestion,
                      })}
                    >
                      {suggestion.description}
                    </div>
                  );
                })}
            </div>
          </div>
        )}
      </PlacesAutocomplete>
      {/* location utility btn */}
      <IconButton
        onClick={getLocation}
        type={"button"}
        color="primary"
        className={cls.locBtn}
      >
        <i className="fas fa-crosshairs"></i>
      </IconButton>
    </div>
  );
};

export default memo(LocationAutoComplete);
