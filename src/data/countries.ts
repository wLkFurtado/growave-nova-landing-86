
// Country data with name, code, and dial code (DDI)
export interface CountryData {
  name: string;
  code: string;
  dial_code: string;
  flag: string;
}

// List of countries with Brazil as the first (default) option
export const countries: CountryData[] = [
  {
    name: "Brasil",
    code: "BR",
    dial_code: "55",
    flag: "🇧🇷"
  },
  {
    name: "Argentina",
    code: "AR",
    dial_code: "54",
    flag: "🇦🇷"
  },
  {
    name: "Estados Unidos",
    code: "US",
    dial_code: "1",
    flag: "🇺🇸"
  },
  {
    name: "Portugal",
    code: "PT",
    dial_code: "351",
    flag: "🇵🇹"
  },
  {
    name: "Espanha",
    code: "ES",
    dial_code: "34",
    flag: "🇪🇸"
  },
  {
    name: "México",
    code: "MX",
    dial_code: "52",
    flag: "🇲🇽"
  },
  {
    name: "Colômbia",
    code: "CO",
    dial_code: "57",
    flag: "🇨🇴"
  },
  {
    name: "Chile",
    code: "CL",
    dial_code: "56",
    flag: "🇨🇱"
  },
  {
    name: "Uruguai",
    code: "UY",
    dial_code: "598",
    flag: "🇺🇾"
  },
  {
    name: "Paraguai",
    code: "PY",
    dial_code: "595",
    flag: "🇵🇾"
  },
  {
    name: "Outro",
    code: "OTH",
    dial_code: "",
    flag: "🌎"
  }
];

// Helper function to get country by code
export const getCountryByCode = (code: string): CountryData | undefined => {
  return countries.find(country => country.code === code);
};

// Helper function to get default country (Brazil)
export const getDefaultCountry = (): CountryData => {
  return countries[0]; // Brazil is at index 0
};
