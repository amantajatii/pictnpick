"use client";

import { MessageCircle, Send } from "lucide-react";
import { FormEvent, useState } from "react";
import { Card, PrimaryButton, SectionContainer, SectionHeading } from "./ui";

/* Section 13: Lead Form — Acquisition (tanpa backend, simulasi submit) */

const WHATSAPP_URL =
  "https://wa.me/6285727322686?text=Halo%20Pict%20n%20Pick,%20saya%20tertarik%20kerja%20sama%20untuk%20kafe%20saya";

const initialForm = {
  nama: "",
  namaKafe: "",
  kota: "",
  whatsapp: "",
  instagram: "",
  produk: "Belum Tahu",
  area: "",
  pesan: "",
};

export default function LeadForm() {
  const [form, setForm] = useState(initialForm);
  const [submitted, setSubmitted] = useState(false);

  function handleChange(
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    console.log("Lead Form Submission:", form);
    setSubmitted(true);
  }

  return (
    <SectionContainer id="lead-form" className="scroll-mt-24 bg-white/50">
      <SectionHeading
        label="Kerja Sama"
        title="Tertarik Pasang Pict n Pick di Kafe Kamu?"
        description="Isi form di bawah atau hubungi kami langsung via WhatsApp."
      />

      <div className="mx-auto max-w-xl">
        {submitted ? (
          <Card className="text-center">
            <p className="text-4xl">🎉</p>
            <h3 className="mt-4 text-xl font-bold text-ink">
              Pengajuan Terkirim!
            </h3>
            <p className="mt-2 text-ink/70">
              Terima kasih, {form.nama}! Tim Pict n Pick akan menghubungi kamu
              segera. (Simulasi — data tercatat di console)
            </p>
            <button
              type="button"
              className="mt-6 text-sm font-medium text-orange underline"
              onClick={() => {
                setSubmitted(false);
                setForm(initialForm);
              }}
            >
              Kirim pengajuan lain
            </button>
          </Card>
        ) : (
          <Card>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="nama" className="mb-1 block text-sm font-medium text-ink">
                  Nama
                </label>
                <input
                  id="nama"
                  name="nama"
                  required
                  value={form.nama}
                  onChange={handleChange}
                  className="w-full rounded-2xl border border-ink/10 bg-cream px-4 py-3 text-ink outline-none focus:border-orange focus:ring-2 focus:ring-orange/20"
                  placeholder="Nama lengkap"
                />
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label htmlFor="namaKafe" className="mb-1 block text-sm font-medium text-ink">
                    Nama Kafe
                  </label>
                  <input
                    id="namaKafe"
                    name="namaKafe"
                    required
                    value={form.namaKafe}
                    onChange={handleChange}
                    className="w-full rounded-2xl border border-ink/10 bg-cream px-4 py-3 text-ink outline-none focus:border-orange focus:ring-2 focus:ring-orange/20"
                    placeholder="Nama kafe"
                  />
                </div>
                <div>
                  <label htmlFor="kota" className="mb-1 block text-sm font-medium text-ink">
                    Kota
                  </label>
                  <input
                    id="kota"
                    name="kota"
                    required
                    value={form.kota}
                    onChange={handleChange}
                    className="w-full rounded-2xl border border-ink/10 bg-cream px-4 py-3 text-ink outline-none focus:border-orange focus:ring-2 focus:ring-orange/20"
                    placeholder="Kota"
                  />
                </div>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label htmlFor="whatsapp" className="mb-1 block text-sm font-medium text-ink">
                    Nomor WhatsApp
                  </label>
                  <input
                    id="whatsapp"
                    name="whatsapp"
                    required
                    type="tel"
                    value={form.whatsapp}
                    onChange={handleChange}
                    className="w-full rounded-2xl border border-ink/10 bg-cream px-4 py-3 text-ink outline-none focus:border-orange focus:ring-2 focus:ring-orange/20"
                    placeholder="08xxxxxxxxxx"
                  />
                </div>
                <div>
                  <label htmlFor="instagram" className="mb-1 block text-sm font-medium text-ink">
                    Instagram Kafe
                  </label>
                  <input
                    id="instagram"
                    name="instagram"
                    value={form.instagram}
                    onChange={handleChange}
                    className="w-full rounded-2xl border border-ink/10 bg-cream px-4 py-3 text-ink outline-none focus:border-orange focus:ring-2 focus:ring-orange/20"
                    placeholder="@kafekamu"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="produk" className="mb-1 block text-sm font-medium text-ink">
                  Pilihan Produk
                </label>
                <select
                  id="produk"
                  name="produk"
                  value={form.produk}
                  onChange={handleChange}
                  className="w-full rounded-2xl border border-ink/10 bg-cream px-4 py-3 text-ink outline-none focus:border-orange focus:ring-2 focus:ring-orange/20"
                >
                  <option value="Photobox">Photobox</option>
                  <option value="Photoreceipt">Photoreceipt</option>
                  <option value="Belum Tahu">Belum Tahu</option>
                </select>
              </div>

              <div>
                <label htmlFor="area" className="mb-1 block text-sm font-medium text-ink">
                  Estimasi Area Tersedia
                </label>
                <input
                  id="area"
                  name="area"
                  value={form.area}
                  onChange={handleChange}
                  className="w-full rounded-2xl border border-ink/10 bg-cream px-4 py-3 text-ink outline-none focus:border-orange focus:ring-2 focus:ring-orange/20"
                  placeholder="Contoh: 1,5m x 2m di pojok kanan"
                />
              </div>

              <div>
                <label htmlFor="pesan" className="mb-1 block text-sm font-medium text-ink">
                  Pesan Tambahan
                </label>
                <textarea
                  id="pesan"
                  name="pesan"
                  rows={3}
                  value={form.pesan}
                  onChange={handleChange}
                  className="w-full resize-none rounded-2xl border border-ink/10 bg-cream px-4 py-3 text-ink outline-none focus:border-orange focus:ring-2 focus:ring-orange/20"
                  placeholder="Ceritakan tentang kafe kamu..."
                />
              </div>

              <PrimaryButton type="submit" className="w-full gap-2">
                <Send className="h-4 w-4" />
                Kirim Pengajuan
              </PrimaryButton>
            </form>

            <div className="mt-6 flex items-center gap-4">
              <div className="h-px flex-1 bg-ink/10" />
              <span className="text-sm text-ink/50">atau</span>
              <div className="h-px flex-1 bg-ink/10" />
            </div>

            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 flex w-full items-center justify-center gap-2 rounded-full border-2 border-green-500 bg-green-50 px-6 py-3 text-sm font-semibold text-green-700 transition hover:bg-green-100"
            >
              <MessageCircle className="h-5 w-5" />
              Chat via WhatsApp
            </a>
          </Card>
        )}
      </div>
    </SectionContainer>
  );
}
