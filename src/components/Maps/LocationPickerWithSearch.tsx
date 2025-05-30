import { useState, useEffect } from "react";
import {
  Input,
  Button,
  addToast,
} from "@heroui/react";
import {
  MapContainer,
  TileLayer,
  Marker,
  useMapEvents,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { LeafletMouseEvent } from "leaflet";
import { SearchCodeIcon } from "lucide-react";

interface LocationPickerWithSearchProps {
  address: string;
  latitude: number;
  longitude: number;
  onAddressChange: (address: string) => void;
  onLocationChange: (lat: number, lng: number) => void;
  initialCenter?: [number, number];
  initialZoom?: number;
}

const LocationPickerWithSearch = ({
  address,
  latitude,
  longitude,
  onAddressChange,
  onLocationChange,
  initialCenter = [-12.0464, -77.0428],
  initialZoom = 13,
}: LocationPickerWithSearchProps) => {
  const [searchText, setSearchText] = useState(address || "");
  const centerPosition: [number, number] =
    latitude !== 0 && longitude !== 0 ? [latitude, longitude] : initialCenter;

  const LocationSelector = () => {
    useMapEvents({
      click(e: LeafletMouseEvent) {
        onLocationChange(e.latlng.lat, e.latlng.lng);
        reverseGeocode(e.latlng.lat, e.latlng.lng);
      },
    });
    return null;
  };

  const searchAddress = async () => {
    if (!searchText.trim()) {
      addToast({ title: "Escribe una dirección para buscar", color: "warning" });
      return;
    }
    try {
      const res = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(
          searchText.trim()
        )}`
      );
      const data = await res.json();
      if (!Array.isArray(data) || data.length === 0) {
        addToast({ title: "No se encontró la dirección", color: "warning" });
        return;
      }
      const { lat, lon, display_name } = data[0];
      onLocationChange(parseFloat(lat), parseFloat(lon));
      onAddressChange(display_name);
      addToast({ title: "Dirección encontrada", description: display_name, color: "success" });
    } catch {
      addToast({ title: "Error buscando la dirección", color: "danger" });
    }
  };

  const usarUbicacionActual = () => {
    if (!navigator.geolocation) {
      addToast({ title: "Error", description: "Geolocalización no soportada", color: "danger" });
      return;
    }
    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const lat = position.coords.latitude;
        const lon = position.coords.longitude;
        onLocationChange(lat, lon);
        reverseGeocode(lat, lon);
      },
      () => {
        addToast({ title: "Error", description: "No se pudo obtener ubicación actual", color: "danger" });
      }
    );
  };

  const reverseGeocode = async (lat: number, lon: number) => {
    try {
      const res = await fetch(
        `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon}`
      );
      const data = await res.json();
      if (data?.display_name) {
        onAddressChange(data.display_name);
        addToast({ title: "Ubicación actual encontrada", description: data.display_name, color: "success" });
      }
    } catch {
      addToast({ title: "Error obteniendo la dirección", color: "danger" });
    }
  };

  useEffect(() => {
    setSearchText(address);
  }, [address]);

  return (
    <div>
      <div className="flex gap-2 mb-2">
        <Input
          placeholder="Buscar dirección"
          value={searchText}
          onValueChange={setSearchText}
          onChange={(e) => onAddressChange(e.target.value)}
          className="flex-grow"
        />
        <Button color="primary" onClick={searchAddress}>
          Buscar
        </Button>
        <Button color="secondary" onClick={usarUbicacionActual}>
          <SearchCodeIcon  size={14} />
        </Button>
      </div>
      <div className="h-56 w-full rounded-xl overflow-hidden border border-gray-300">
        <MapContainer center={centerPosition} zoom={initialZoom} className="h-full w-full">
          <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
          {latitude !== 0 && longitude !== 0 && <Marker position={[latitude, longitude]} />}
          <LocationSelector />
        </MapContainer>
      </div>
    </div>
  );
};

export default LocationPickerWithSearch;
