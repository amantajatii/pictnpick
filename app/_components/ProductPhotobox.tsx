import { Card, PrimaryButton, SectionContainer, SectionHeading, SectionImage } from "./ui";

/* Section 4: Product — Photobox (standalone, tanpa bandingkan Photoreceipt) */

const cocokUntuk = [
  "Kafe dengan area luas",
  "Kafe dengan traffic tinggi",
  "Event komunitas",
  "Anniversary cafe",
  "Experience corner",
];

export default function ProductPhotobox() {
  return (
    <SectionContainer id="produk" className="scroll-mt-24">
      <div className="grid items-start gap-12 lg:grid-cols-2">
        <div>
          <SectionHeading
            label="Produk"
            title="Photobox: Spot Favorit di Sudut Kafe"
            description="Photobox adalah booth foto instan yang memungkinkan pelanggan berfoto mandiri, memilih template, lalu mendapatkan hasil cetak secara langsung."
            align="left"
          />

          <Card>
            <p className="text-sm text-ink/60">Harga customer</p>
            <p className="mt-1 text-2xl font-bold text-orange">Rp30.000 / sesi</p>
            <div className="my-5 h-px bg-ink/10" />
            <p className="mb-3 font-semibold text-ink">Cocok untuk:</p>
            <ul className="flex flex-wrap gap-2">
              {cocokUntuk.map((item) => (
                <li
                  key={item}
                  className="rounded-full bg-cream px-3 py-1.5 text-sm text-ink/80"
                >
                  {item}
                </li>
              ))}
            </ul>
          </Card>

          <div className="mt-6">
            <PrimaryButton href="/payment-demo">
              Beli Voucher Photobox
            </PrimaryButton>
          </div>
        </div>

        <SectionImage
          src="/images/photobox-corner.png"
          alt="Photobox corner di sudut coffee shop"
          aspect="portrait"
        />
      </div>
    </SectionContainer>
  );
}
