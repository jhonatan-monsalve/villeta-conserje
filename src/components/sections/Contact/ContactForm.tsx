"use client";

import { useState, useMemo } from "react";
import { Container } from "@/components/layout/Container";
import { Button } from "@/components/ui/buttons/Button";
import { emailService } from "@/lib/api/emailjs/emailService";
import { MdVerified, MdSend, MdCheckCircle, MdClose, MdLink, MdError } from "react-icons/md";
import { SITE_CONFIG } from "@/lib/config/siteConfig";
import { cn } from "@/lib/utils";

export function ContactForm() {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
    const [hasAttemptedSubmit, setHasAttemptedSubmit] = useState(false);
    const [showModal, setShowModal] = useState(false);

    const [formData, setFormData] = useState({
        name: "",
        phone: "",
        location: "",
        email: "",
        property_url: "",
        renting_status: "A veces"
    });

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const missingFields = useMemo(() => {
        const missing: string[] = [];
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const phoneRegex = /^(\+?57)?\s?3\d{9}$/;

        if (!formData.name.trim()) missing.push("Nombre");

        if (!formData.phone.trim()) {
            missing.push("Teléfono");
        } else if (!phoneRegex.test(formData.phone.trim().replace(/\s/g, ""))) {
            missing.push("Teléfono válido (Estructura de 10 dígitos)");
        }

        if (!formData.location.trim()) missing.push("Condominio / Vereda");

        if (!formData.email.trim()) {
            missing.push("Email");
        } else if (!emailRegex.test(formData.email.trim())) {
            missing.push("Email válido (ejemplo@dominio.com)");
        }

        if ((formData.renting_status === "Si" || formData.renting_status === "A veces") && !formData.property_url.trim()) {
            missing.push("URL de la propiedad");
        }

        return missing;
    }, [formData]);

    const isFormComplete = missingFields.length === 0;

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setHasAttemptedSubmit(true);

        if (!isFormComplete) {
            return;
        }

        setIsSubmitting(true);
        setStatus("idle");

        // Send email
        const { success } = await emailService.sendForm(e.currentTarget);

        if (success || !process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID) {
            if (!success) console.warn("No EmailJS ID provided, simulating success");

            setStatus("success");
            setShowModal(true);
            setFormData({
                name: "",
                phone: "",
                location: "",
                email: "",
                property_url: "",
                renting_status: "A veces"
            });
            setHasAttemptedSubmit(false);
        } else {
            setStatus("error");
        }

        setIsSubmitting(false);
    };

    const closeModal = () => {
        setShowModal(false);
        setStatus("idle");
    };

    const handleWhatsAppRedirect = () => {
        const text = `Hola 👋, vengo desde su página web y me gustaría recibir información sobre el servicio de administración de fincas y publicación en Airbnb.
¿Podrían indicarme cómo funciona y qué necesito para empezar?`;
        window.open(`https://wa.me/${SITE_CONFIG.whatsapp}?text=${encodeURIComponent(text)}`, '_blank');
    };

    return (
        <section className="py-16 sm:py-24 bg-surface-dark relative overflow-hidden" id="auditoria">
            {/* Background Effect */}
            <div className="absolute -top-24 -right-24 w-64 h-64 bg-primary/20 rounded-full blur-3xl pointer-events-none"></div>

            <Container className="relative z-10">
                <div className="text-center max-w-2xl mx-auto">
                    <div className="inline-block px-4 py-1.5 bg-red-500/20 text-red-200 rounded-full text-xs font-bold uppercase tracking-wide mb-6 border border-red-500/30">
                        Solo quedan 3 cupos para Marzo
                    </div>

                    <h2 className="text-3xl sm:text-4xl font-display font-black text-white mb-4">
                        Agenda Tu Auditoría Gratuita Ahora
                    </h2>

                    <p className="text-gray-300 mb-8 text-lg">
                        Reclame su auditoría de ingresos gratuita. Limitamos esto a 15 propietarios por mes para asegurar la máxima calidad.
                    </p>

                    <form onSubmit={handleSubmit} noValidate className="space-y-4 text-left bg-white/5 p-6 rounded-xl border border-white/10 backdrop-blur-sm shadow-2xl">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-xs font-medium text-gray-400 mb-1" htmlFor="name">Nombre Completo *</label>
                                <input
                                    className="w-full bg-background-dark/50 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:border-primary focus:ring-primary focus:ring-1 outline-none transition-all"
                                    id="name" name="name" placeholder="Ej: Carlos Rodríguez" type="text"
                                    value={formData.name} onChange={handleInputChange}
                                />
                            </div>
                            <div>
                                <label className="block text-xs font-medium text-gray-400 mb-1" htmlFor="phone">Teléfono (WhatsApp) *</label>
                                <input
                                    className="w-full bg-background-dark/50 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:border-primary focus:ring-primary focus:ring-1 outline-none transition-all"
                                    id="phone" name="phone" placeholder="300 123 4567" type="tel"
                                    value={formData.phone} onChange={handleInputChange}
                                />
                            </div>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-xs font-medium text-gray-400 mb-1" htmlFor="location">Condominio o Vereda *</label>
                                <input
                                    className="w-full bg-background-dark/50 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:border-primary focus:ring-primary focus:ring-1 outline-none transition-all"
                                    id="location" name="location" placeholder="Ej: Payandé, El Recreo" type="text"
                                    value={formData.location} onChange={handleInputChange}
                                />
                            </div>
                            <div>
                                <label className="block text-xs font-medium text-gray-400 mb-1" htmlFor="email">Email *</label>
                                <input
                                    className="w-full bg-background-dark/50 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:border-primary focus:ring-primary focus:ring-1 outline-none transition-all"
                                    id="email" name="email" placeholder="carlos@ejemplo.com" type="email"
                                    value={formData.email} onChange={handleInputChange}
                                />
                            </div>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 items-end">
                            <div>
                                <label className="block text-xs font-medium text-gray-400 mb-1" htmlFor="renting_status">¿Actualmente rentas tu finca?</label>
                                <select
                                    className="w-full bg-background-dark/50 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:border-primary focus:ring-primary focus:ring-1 outline-none transition-all"
                                    id="renting_status"
                                    name="renting_status"
                                    value={formData.renting_status}
                                    onChange={handleInputChange}
                                >
                                    <option value="Si" className="text-black">Sí</option>
                                    <option value="No" className="text-black">No</option>
                                    <option value="A veces" className="text-black">A veces</option>
                                </select>
                            </div>

                            {(formData.renting_status === "Si" || formData.renting_status === "A veces") && (
                                <div className="animate-in fade-in slide-in-from-left-2 duration-300">
                                    <label className="block text-xs font-medium text-gray-400 mb-1 flex items-center gap-1" htmlFor="property_url">
                                        <MdLink className="text-primary" /> URL de la propiedad (Airbnb)
                                    </label>
                                    <input
                                        className="w-full bg-background-dark/50 border border-primary/40 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:border-primary focus:ring-primary focus:ring-1 outline-none transition-all"
                                        id="property_url" name="property_url" placeholder="https://airbnb.com/h/tu-finca" type="url"
                                        value={formData.property_url} onChange={handleInputChange}
                                    />
                                </div>
                            )}
                        </div>

                        <div className="bg-primary/10 border border-primary/20 rounded-lg p-3 text-center mb-2">
                            <p className="text-surface-light text-sm font-bold flex items-center justify-center gap-2">
                                <MdVerified className="text-lg" />
                                Garantía: Tu primera reserva será 5 estrellas o devolvemos el 100% de nuestra comisión.
                            </p>
                        </div>

                        {hasAttemptedSubmit && !isFormComplete && (
                            <div className="p-3 bg-red-500/20 border border-red-500/50 rounded-lg text-red-200 text-sm flex items-start gap-2 animate-in fade-in slide-in-from-top-1">
                                <MdError className="shrink-0 mt-0.5" />
                                <span>Por favor rellena el formulario con los datos de: {missingFields.join(", ")}</span>
                            </div>
                        )}

                        <Button
                            type="submit"
                            fullWidth
                            disabled={isSubmitting}
                            className={cn(
                                "group relative overflow-hidden text-lg py-4 transition-all duration-300",
                                (hasAttemptedSubmit && !isFormComplete)
                                    ? "bg-white text-primary border-2 border-primary hover:bg-white cursor-not-allowed"
                                    : "bg-primary text-white border-2 border-transparent hover:bg-primary/95 shadow-lg",
                                status === 'success' ? 'bg-green-600 hover:bg-green-700' : ''
                            )}
                        >
                            <span className="relative z-10 flex items-center justify-center gap-2 font-bold uppercase tracking-wide">
                                {status === 'idle' && <>Solicitar Mi Auditoría <MdSend className="group-hover:translate-x-1 transition-transform" /></>}
                                {status === 'success' && '¡Enviado con Éxito!'}
                                {isSubmitting && 'Enviando...'}
                            </span>
                        </Button>
                        <p className="text-center text-xs text-gray-500 mt-2">Tus datos están seguros. Respuesta en menos de 24h.</p>
                    </form>
                </div>
            </Container>

            {/* Success Modal */}
            {showModal && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
                    <div className="bg-white rounded-2xl max-w-lg w-full p-8 relative shadow-2xl animate-in zoom-in-95 duration-300 text-black">
                        <button
                            onClick={closeModal}
                            className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
                        >
                            <MdClose size={24} />
                        </button>

                        <div className="text-center">
                            <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
                                <MdCheckCircle size={48} />
                            </div>

                            <h3 className="text-2xl font-display font-bold text-gray-900 mb-4 px-2">
                                ¡Gracias por confiar en Villeta Conserje!
                            </h3>

                            <div className="space-y-4 text-gray-600 leading-relaxed text-sm sm:text-base">
                                <p>
                                    Hemos recibido la información de tu propiedad. Un historial de 5 estrellas no se construye por azar, sino con atención al detalle, y así mismo trataremos tu solicitud.
                                </p>
                                <p className="font-semibold text-gray-800">
                                    En las próximas 24 horas, Yenifer Monsalve o un miembro de nuestro equipo se pondrá en contacto contigo para coordinar una visita diagnóstica a tu finca.
                                </p>
                                <p className="text-xs italic text-gray-500">
                                    Mientras tanto, te invitamos a ver cómo transformamos estancias comunes en experiencias de lujo.
                                </p>
                            </div>

                            <div className="mt-8 space-y-3">
                                <Button fullWidth onClick={handleWhatsAppRedirect} className="gap-2 bg-green-600 hover:bg-green-700 border-none text-white">
                                    Hablar por WhatsApp Ahora
                                </Button>
                                <button
                                    onClick={closeModal}
                                    className="text-xs text-gray-500 hover:text-primary transition-colors font-medium"
                                >
                                    Cerrar ventana
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </section>
    );
}
