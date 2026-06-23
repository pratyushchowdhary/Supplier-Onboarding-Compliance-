export const initialState = {
  business: {
    legalName: "Greenfield Ingredients Pvt. Ltd.",
    tradeName: "Greenfield Botanicals",
    registrationNumber: "U15490KA2014PTC076842",
    taxId: "GSTIN-27AABC1234F1Z5",
    yearEstablished: "2014",
    businessType: "Manufacturer",
    website: "https://greenfield.example",
    country: "India",
    address: "Plot 15, Industrial Area, Hubli, Karnataka, India",
    contactName: "Anika Rao",
    contactEmail: "anika@greenfield.example",
  },
  documents: [
    { id: 1, name: "Business registration", file: "registration-2024.pdf", status: "Verified", expiry: "Jan 2029" },
    { id: 2, name: "Operating licence", file: "operating-licence.pdf", status: "Verified", expiry: "Jun 2028" },
    { id: 3, name: "Allergen declaration", file: "", status: "Missing", expiry: "—" },
    { id: 4, name: "Lab test report", file: "lab-report-scan.pdf", status: "Action needed", expiry: "—" },
  ],
  supply: {
    itemName: "Turmeric extract",
    botanicalName: "Curcuma longa",
    casNumber: "84775-52-0",
    countryOfOrigin: "India",
    intendedUse: "Food ingredient and cosmetic raw material",
    grade: "Food / cosmetic grade",
    form: "Powder",
    purity: "95% curcuminoids",
    shelfLife: "24 months",
    leadTime: "21 days",
    monthlyCapacity: "12,000 kg",
    traceability: "Batch traceability available",
  },
  declaration: { fullName: "", place: "", accepted: false },
};

export const steps = [
  { id: "documents", label: "Documents & Compliance", icon: "▣" },
  { id: "business", label: "Business Information", icon: "▤" },
  { id: "supply", label: "Supply Details", icon: "□" },
  { id: "review", label: "Review & Submit", icon: "➤" },
];
