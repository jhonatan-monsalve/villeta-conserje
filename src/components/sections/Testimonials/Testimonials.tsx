"use client";

import { Container } from "@/components/layout/Container";
import { Card } from "@/components/ui/cards/Card";
import { HiStar } from "react-icons/hi";
import { SITE_CONFIG } from "@/lib/config/siteConfig";

const TESTIMONIALS = [
    {
        quote: "La casa es increíble, un verdadero retiro Zen. Ideal para desconectarse y disfrutar de la naturaleza en familia. La atención de Yenifer fue impecable desde el primer momento.",
        author: "Claudia P.",
        location: "Huésped de Airbnb",
        image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDRjjL7Cdk-IV18_r8TK9XkOTb9hZCNFhm8t1sISMuPP927XS_S7faGsGzP0yCbXHBSrG31xDU0OhSm2shWJGxFk22TNOvVR_m8ZKVOU_y4gl9HrSl93qLfs_4tj5wa9p5wMBehbAXG36blrT_mCvMBYrMX_ko2oYha6LP3ggXdo8yBnu1BKJCmnhU49kV4xe9Fh4bJjJ9M15OgwRyDvIwop_CHtlfw_3wTDTRbiIZmECDpDH8wdhp3qBwOGUxczYRvh-spWozeG_o"
    },
    {
        quote: "Experiencia de check-in excepcional. Todo estaba impecable, los jardines de frutales y el área de yoga son un plus que no encuentras en cualquier lado. ¡Volveremos!",
        author: "Mauricio G.",
        location: "Huésped de Airbnb",
        image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCHdG6bnkeE-td5ydeo3tT3zYThuYfB5k_1uhXRgwGcdyDFMQ8P7CTKH0_8IHNHlO7GP85SPOiC3hNjGXfuhizNJsz8iodcC1qmd7fKpelaB2lGeaEjgtO5dW9Cu96mvTfheAPvn4PMhNmYvXMHexUVLkQ1fnc-0vHiXFLyYuHJ_R25jWc4Pn7Qf136L59o9L38wvBWlVN2SkOzUhP7pRc0vmdsoZTItpz6BZMdDDbWjQzcx6MqTZel76-iCpxDnrpSEHlOity_A80"
    },
    {
        quote: "La mejor decisión para nuestro retiro de yoga. El jacuzzi bajo las estrellas y la conexión con el bosque hicieron que todos saliéramos renovados. Gracias por la excelente gestión.",
        author: "Adriana L.",
        location: "Huésped de Airbnb",
        image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDS6-kzikRfoqz3hy9jwmTNGJqcSDKRCPSnGyeZ9UjusskAvqT6k27CO-S73LuNvb_czTqWGAlWYHy8dyQeN_QE01Vzpf_Iy44MgU0_hUwwZc-xEJemdF3jZ1NvS8RaXpC4C-BWqktTRAh8cdT1H9Cn4cRBKHfGMBWQJCNBPOGoju4v8rWZASCg-L0-7rwoWYWcadc4X58Px4McHPh8vcY-LKed-m3GTkBzwXppOaRaBKSgYSvsLG3KCOKRmlOrr4rXStJ7xQ35x3I"
    }
];

export function Testimonials() {
    return (
        <section className="py-16 sm:py-24 bg-surface-light dark:bg-surface-dark" id="reviews">
            <Container>
                <h2 className="text-center text-3xl sm:text-4xl font-display font-bold text-text-main dark:text-white mb-4">
                    14 Reservas Atendidas.<br />14 Calificaciones de 5 Estrellas.
                </h2>
                <p className="text-center text-text-sub dark:text-gray-400 mb-12 max-w-2xl mx-auto">
                    No gestionamos volumen, gestionamos excelencia. Descubre por qué somos Superanfitriones preferidos en Villeta.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
                    {TESTIMONIALS.map((testimonial, index) => (
                        <a
                            key={index}
                            href={SITE_CONFIG.links.airbnb_listing}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="group h-full"
                        >
                            <Card className="flex flex-col h-full relative p-8 hover:border-primary/50 transition-all hover:shadow-lg">
                                <span className="text-4xl text-primary/10 absolute top-6 right-6 font-serif">"</span>

                                <div className="flex items-center gap-1 text-gold mb-6">
                                    {[...Array(5)].map((_, i) => (
                                        <HiStar key={i} className="text-lg fill-current" />
                                    ))}
                                </div>

                                <p className="text-text-main dark:text-gray-200 mb-6 flex-grow italic leading-relaxed">
                                    "{testimonial.quote}"
                                </p>

                                <div className="flex items-center gap-4 border-t border-border dark:border-border-dark pt-6">
                                    <div className="w-12 h-12 rounded-full overflow-hidden bg-gray-200 relative">
                                        <img
                                            src={testimonial.image}
                                            alt={`Portrait of ${testimonial.author}`}
                                            className="w-full h-full object-cover"
                                        />
                                    </div>
                                    <div>
                                        <p className="font-bold text-text-main dark:text-white group-hover:text-primary transition-colors">{testimonial.author}</p>
                                        <p className="text-xs text-text-sub font-semibold">{testimonial.location}</p>
                                    </div>
                                </div>
                            </Card>
                        </a>
                    ))}
                </div>

                <div className="mt-16 text-center">
                    <a href="#audit" className="inline-block">
                        <button className="heartbeat-button bg-[#2C5F4F] hover:bg-[#10221a] text-white px-10 py-5 rounded-lg shadow-2xl transition-all duration-300 font-bold text-lg">
                            Quiero que mi propiedad sea la próxima de 5 estrellas
                        </button>
                    </a>
                </div>
            </Container>

            <style jsx>{`
        @keyframes heartbeat {
          0% { transform: scale(1); box-shadow: 0 0 0 0 rgba(44, 95, 79, 0.7); }
          15% { transform: scale(1.08); box-shadow: 0 0 0 15px rgba(44, 95, 79, 0); }
          30% { transform: scale(1); box-shadow: 0 0 0 0 rgba(44, 95, 79, 0.7); }
          45% { transform: scale(1.08); box-shadow: 0 0 0 15px rgba(44, 95, 79, 0); }
          100% { transform: scale(1); box-shadow: 0 0 0 0 rgba(44, 95, 79, 0); }
        }
        .heartbeat-button {
          animation: heartbeat 2.5s ease-in-out infinite;
        }
        .heartbeat-button:hover {
          animation-play-state: paused;
          transform: scale(1.1);
        }
      `}</style>
        </section>
    );
}
