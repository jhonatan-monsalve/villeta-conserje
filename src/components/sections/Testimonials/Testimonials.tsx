"use client";

import ExportedImage from "next-image-export-optimizer";
import { Container } from "@/components/layout/Container";
import { Card } from "@/components/ui/cards/Card";
import { HiStar } from "react-icons/hi";
import { useState } from "react";
import { DynamicReviewCount, DynamicRating } from "@/components/ui/DynamicStats";
import { useAirbnbReviews, ReviewItem } from "@/hooks/useAirbnbReviews";
import { SITE_CONFIG } from "@/lib/config/siteConfig";

export function Testimonials() {
    const listingId = SITE_CONFIG.links.airbnb_listing.split("/rooms/")[1]?.split("?")[0] || "1402264507691687773";
    const { reviews } = useAirbnbReviews(listingId);

    return (
        <section className="py-16 sm:py-24 bg-surface-light dark:bg-surface-dark" id="reviews">
            <Container>
                <h2 className="text-center text-3xl sm:text-4xl font-display font-bold text-text-main dark:text-white mb-4">
                    <DynamicReviewCount /> Reservas Atendidas.<br /><DynamicRating /> Estrellas en Todas.
                </h2>
                <p className="text-center text-text-sub dark:text-gray-400 mb-12 max-w-2xl mx-auto">
                    No gestionamos volumen, gestionamos excelencia. Descubre por qué somos Superanfitriones preferidos en Villeta.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
                    {reviews.map((testimonial) => (
                        <TestimonialCard key={testimonial.id} testimonial={testimonial} />
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
          100% { transform: scale(1); box-shadow: 0 0 0 0 rgba(44, 95, 79, 0.7); }
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

function TestimonialCard({ testimonial }: { testimonial: ReviewItem }) {
    const [isExpanded, setIsExpanded] = useState(false);
    const isExternalImage = testimonial.image.startsWith('http');

    return (
        <div
            className="h-full"
            onMouseLeave={() => setIsExpanded(false)}
        >
            <Card className={`flex flex-col h-full relative p-8 hover:border-primary/50 transition-all duration-300 hover:shadow-lg ${isExpanded ? 'h-auto z-10' : ''}`}>
                <span className="text-4xl text-primary/10 absolute top-6 right-6 font-serif">"</span>

                {/* Info del Autor en la parte superior */}
                <div className="flex items-center gap-4 mb-6">
                    <div className="w-14 h-14 rounded-full overflow-hidden bg-gray-200 relative shrink-0 border-2 border-primary/10 shadow-sm">
                        {isExternalImage ? (
                            <img
                                src={testimonial.image}
                                alt={`Retrato de ${testimonial.author}`}
                                className="w-full h-full object-cover"
                                loading="lazy"
                            />
                        ) : (
                            <ExportedImage
                                src={testimonial.image.replace(/^\//, '')}
                                alt={`Retrato de ${testimonial.author}`}
                                width={56}
                                height={56}
                                className="w-full h-full object-cover"
                                loading="lazy"
                            />
                        )}
                    </div>
                    <div>
                        <p className="font-bold text-lg text-text-main dark:text-white group-hover:text-primary transition-colors">{testimonial.author}</p>
                        <p className="text-xs text-text-sub font-semibold tracking-wide uppercase">{testimonial.location}</p>
                    </div>
                </div>

                {/* Estrellas y Meta */}
                <div className="flex flex-wrap items-center gap-2 mb-4">
                    <div className="flex text-gold" role="img" aria-label={`Calificación: ${testimonial.rating} estrellas`}>
                        {[...Array(testimonial.rating)].map((_, i) => (
                            <HiStar key={i} className="text-lg fill-current text-amber-400" />
                        ))}
                    </div>
                    {testimonial.meta && (
                        <span className="text-xs font-semibold text-text-sub dark:text-gray-400">
                            · {testimonial.meta}
                        </span>
                    )}
                </div>

                {/* Texto del Testimonio */}
                <div className="relative flex-grow flex flex-col justify-between">
                    <p className={`text-text-main dark:text-gray-200 italic leading-relaxed transition-all duration-300 whitespace-pre-line ${isExpanded ? '' : 'line-clamp-5'}`}>
                        "{testimonial.quote}"
                    </p>

                    <div className="mt-4 pt-2 flex items-center justify-between border-t border-gray-100 dark:border-gray-800">
                        {testimonial.quote.length > 140 && !isExpanded && (
                            <button
                                onClick={(e) => {
                                    e.stopPropagation();
                                    setIsExpanded(true);
                                }}
                                className="text-xs font-bold text-primary hover:text-primary-dark underline decoration-2 underline-offset-4 focus:outline-none"
                            >
                                Leer más
                            </button>
                        )}
                        <a
                            href={testimonial.airbnbUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="ml-auto text-xs font-bold text-[#FF385C] hover:underline flex items-center gap-1.5 transition-colors"
                        >
                            Ver en Airbnb
                            <svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" role="presentation" focusable="false" style={{ display: 'block', fill: 'currentcolor', height: '11px', width: '11px' }}><path d="m26.71 10.21 1.06 1.06a1 1 0 0 1 0 1.41l-14.85 14.86a3 3 0 0 1 -2.13.88l-6.52.01a1 1 0 0 1 -1.01-1.02l.02-6.5a3 3 0 0 1 .88-2.12l14.85-14.86a1 1 0 0 1 1.41 0l1.06 1.06a1 1 0 0 1 0 1.41l-12.33 12.33a1 1 0 0 0 0 1.41l1.41 1.41a1 1 0 0 0 1.41 0l12.33-12.33a1 1 0 0 1 2.31 -.01zm-13.44 6.31 4.24 4.24 8.49-8.49-4.24-4.24z"></path></svg>
                        </a>
                    </div>
                </div>
            </Card>
        </div>
    );
}
