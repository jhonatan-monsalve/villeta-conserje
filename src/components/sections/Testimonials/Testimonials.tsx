"use client";

import { Container } from "@/components/layout/Container";
import { Card } from "@/components/ui/cards/Card";
import { HiStar } from "react-icons/hi";
import { SITE_CONFIG } from "@/lib/config/siteConfig";
import { useState } from "react";

interface Testimonial {
    quote: string;
    author: string;
    location: string;
    image: string;
    meta?: string;
}

const TESTIMONIALS: Testimonial[] = [
    {
        quote: "Es un lugar increíble, la mejor opción para desconectarse del ruido y muy cerca del río, hace la experiencia aún más acogedora, espero volver en algún momento a este lugar soñado, tiene una atención al detalle única,Jennifer es increíblemente amable y fue muy fácil la comunicación ante cualquier duda respuestas al instante.",
        author: "Andrea",
        location: "Bogotá, Colombia",
        image: "https://a0.muscache.com/im/pictures/user/e8dc9158-b088-4bf7-9dde-ce84e1310c5e.jpg?im_w=240",
        meta: "Hace 2 semanas · En grupo"
    },
    {
        quote: "Un lugar muy divino, todo impecable, súper equipada con excelente ambientación y un anfitrión súper amable... La verdad está en mi top 3 de lugar que volvería a visitar sin duda alguna..\n\nCabe destacar que la persona de la cocina  muy limpia y cocina delicioso.\n\nSúper mega recomendados",
        author: "Deivy",
        location: "Bogotá, Colombia",
        image: "https://a0.muscache.com/im/pictures/user/User-522374719/original/65c83cd4-9188-47de-855a-03a2ee2d08ff.jpeg?im_w=240",
        meta: "Hace 2 semanas · En grupo"
    },
    {
        quote: "Es una casa hermosa, decorada con el mejor gusto, en un sitio inmejorable en medio de la naturaleza. Ideal para cualquier plan desde el descanso y la desconexión hasta la diversión con familia o amigos. El servicio de Yennifer es impecable, personalizado y lleno de detalles, permitiendo que los huespedes se puedan desentender de todos los temas logísticos para poderse concentrar en disfrutar de un buen descanso. El servicio de alimentación con Mayo también es un punto muy positivo en calidad y servicio.",
        author: "Karen",
        location: "Bogotá, Colombia",
        image: "https://a0.muscache.com/im/pictures/user/User-119767582/original/184cd811-b1d4-4882-bf8c-62aeca9948e1.jpeg?im_w=240",
        meta: "noviembre de 2025 · Con niños"
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
                        <TestimonialCard key={index} testimonial={testimonial} />
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

function TestimonialCard({ testimonial }: { testimonial: Testimonial }) {
    const [isExpanded, setIsExpanded] = useState(false);

    return (
        <div
            className="h-full"
            onMouseLeave={() => setIsExpanded(false)} // Vuelve al estado inicial al sacar el mouse
        >
            <Card className={`flex flex-col h-full relative p-8 hover:border-primary/50 transition-all duration-300 hover:shadow-lg ${isExpanded ? 'h-auto z-10' : ''}`}>
                <span className="text-4xl text-primary/10 absolute top-6 right-6 font-serif">"</span>

                {/* Info del Autor en la parte superior */}
                <div className="flex items-center gap-4 mb-6">
                    <div className="w-14 h-14 rounded-full overflow-hidden bg-gray-200 relative shrink-0 border-2 border-primary/5">
                        <img
                            src={testimonial.image}
                            alt={`Portrait of ${testimonial.author}`}
                            className="w-full h-full object-cover"
                        />
                    </div>
                    <div>
                        <p className="font-bold text-lg text-text-main dark:text-white group-hover:text-primary transition-colors">{testimonial.author}</p>
                        <p className="text-xs text-text-sub font-semibold tracking-wide uppercase">{testimonial.location}</p>
                    </div>
                </div>

                {/* Estrellas y Meta */}
                <div className="flex flex-wrap items-center gap-2 mb-4">
                    <div className="flex text-gold">
                        {[...Array(5)].map((_, i) => (
                            <HiStar key={i} className="text-lg fill-current" />
                        ))}
                    </div>
                    {testimonial.meta && (
                        <span className="text-sm font-medium text-text-sub dark:text-gray-400">
                            · {testimonial.meta}
                        </span>
                    )}
                </div>

                {/* Texto del Testimonio */}
                <div className="relative flex-grow">
                    <p className={`text-text-main dark:text-gray-200 italic leading-relaxed transition-all duration-300 whitespace-pre-line ${isExpanded ? '' : 'line-clamp-6'}`}>
                        "{testimonial.quote}"
                    </p>
                    {isExpanded && (
                        <div className="mt-4">
                            <a
                                href="https://www.airbnb.com.co/users/profile/1470722789148483549?previous_page_name=PdpHomeMarketplace"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-sm font-bold text-[#FF385C] hover:underline flex items-center gap-1"
                            >
                                leer en Airbnb
                                <svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" role="presentation" focusable="false" style={{ display: 'block', fill: 'currentcolor', height: '12px', width: '12px' }}><path d="m26.71 10.21 1.06 1.06a1 1 0 0 1 0 1.41l-14.85 14.86a3 3 0 0 1 -2.13.88l-6.52.01a1 1 0 0 1 -1.01-1.02l.02-6.5a3 3 0 0 1 .88-2.12l14.85-14.86a1 1 0 0 1 1.41 0l1.06 1.06a1 1 0 0 1 0 1.41l-12.33 12.33a1 1 0 0 0 0 1.41l1.41 1.41a1 1 0 0 0 1.41 0l12.33-12.33a1 1 0 0 1 2.31 -.01zm-13.44 6.31 4.24 4.24 8.49-8.49-4.24-4.24z"></path></svg>
                            </a>
                        </div>
                    )}
                    {!isExpanded && testimonial.quote.length > 150 && (
                        <button
                            onClick={(e) => {
                                e.stopPropagation();
                                setIsExpanded(true);
                            }}
                            className="mt-2 text-sm font-bold text-primary hover:text-primary-dark underline decoration-2 underline-offset-4 focus:outline-none"
                        >
                            Leer más
                        </button>
                    )}
                </div>
            </Card>
        </div>
    );
}
