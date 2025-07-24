import { FormControl, InputLabel, Select, MenuItem } from "@mui/material";
import { useFlightStore } from "@/stores/flights-store";
import type { CabinClass } from "@/types";

const cabinClassLabels: Record<CabinClass, string> = {
  economy: "Economy",
  premium_economy: "Premium Economy",
  business: "Business",
  first: "First",
};

export function CabinClassSelector() {
  const { cabinClass, setCabinClass } = useFlightStore();

  return (
    <FormControl size="small" sx={{ minWidth: 140 }}>
      <InputLabel>Class</InputLabel>
      <Select
        value={cabinClass}
        label="Class"
        onChange={(e) => setCabinClass(e.target.value as CabinClass)}
      >
        {Object.entries(cabinClassLabels).map(([value, label]) => (
          <MenuItem key={value} value={value}>
            {label}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}
