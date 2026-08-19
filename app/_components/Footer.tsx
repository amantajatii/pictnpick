import { AtSign, Mail, MapPin, MessageCircle } from 'lucide-react'
import Image from 'next/image'

/* Section 15: Footer — brand info & kontak */

export default function Footer() {
    return (
        <footer className="border-t border-ink/10 bg-ink py-12 text-white">
            <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col gap-8 md:flex-row md:items-start md:justify-between">
                    <div>
                        <Image src="/logo.png" alt="Pict n Pick" width={160} height={40} className="h-10 w-auto" style={{ width: 'auto' }} />
                        <p className="mt-2 text-peach">Take a Pic, Pick a Memory</p>
                        <p className="mt-4 max-w-sm text-sm text-white/70">Photo experience untuk coffee shop — Photobox & Photoreceipt dengan profit sharing dan custom branding.</p>
                    </div>

                    <div className="flex flex-col gap-3 text-sm">
                        <a href="https://instagram.com/pictnpick_" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-white/80 transition hover:text-orange">
                            <AtSign className="h-4 w-4" />
                            @pictnpick_
                        </a>
                        <a href="https://wa.me/6285727322686" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-white/80 transition hover:text-orange">
                            <MessageCircle className="h-4 w-4" />
                            WhatsApp: +62 857-2732-2686
                        </a>
                        <a href="mailto:pictnpick@gmail.com" className="flex items-center gap-2 text-white/80 transition hover:text-orange">
                            <Mail className="h-4 w-4" />
                            pictnpick@gmail.com
                        </a>
                        <p className="flex max-w-sm items-start gap-2 text-white/80">
                            <MapPin className="mt-0.5 h-4 w-4 shrink-0" />
                            Perumahan Lojajar Indah, Lojajar, Sinduharjo, Kec. Ngaglik, Kabupaten Sleman, Daerah Istimewa Yogyakarta 55581
                        </p>
                    </div>
                </div>

                <div className="mt-10 border-t border-white/10 pt-8">
                    <p className="text-sm text-white/70">
                        Pembayaran layanan Photoreceipt diproses melalui aplikasi VizReceipt menggunakan payment gateway Duitku. Seluruh transaksi menggunakan Rupiah (IDR).
                    </p>
                </div>

                <p className="mt-8 text-center text-xs text-white/50">© {new Date().getFullYear()} Pict n Pick.</p>
            </div>
        </footer>
    )
}
