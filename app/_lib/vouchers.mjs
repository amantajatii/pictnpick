export const vouchers = [
  {
    id: "photoreceipt",
    name: "Voucher Photoreceipt",
    price: 10000,
    description: "1 sesi cetak foto berbentuk receipt",
  },
  {
    id: "photobox",
    name: "Voucher Photobox",
    price: 30000,
    description: "1 sesi foto dan cetak Photobox",
  },
];

export const getVoucher = (id) => vouchers.find((voucher) => voucher.id === id);
