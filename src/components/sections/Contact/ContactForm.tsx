"use client";

import { useState, useMemo } from "react";
import { Container } from "@/components/layout/Container";
import { Button } from "@/components/ui/buttons/Button";
import { emailService } from "@/lib/api/emailjs/emailService";
import { MdVerified, MdSend, MdCheckCircle, MdClose, MdLink, MdError } from "react-icons/md";
import { FaWhatsapp } from "react-icons/fa";
import { SITE_CONFIG } from "@/lib/config/siteConfig";
import { cn } from "@/lib/utils";

export function ContactForm() {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [status, setStatus] = useState<"idle" | "success">("idle");
    const [hasAttemptedSubmit, setHasAttemptedSubmit] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [modalMode, setModalMode] = useState<"email" | "whatsapp">("email");
    const [submittedData, setSubmittedData] = useState<{
        name: string;
        phone: string;
        location: string;
        email: string;
        property_url: string;
        renting_status: string;
    } | null>(null);

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

        return missing;
    }, [formData]);

    const isFormComplete = missingFields.length === 0;

    const generateWhatsAppUrl = (data: {
        name: string;
        phone: string;
        location: string;
        email: string;
        property_url?: string;
        renting_status: string;
    }) => {
        const lines = [
            `Hola Yenifer 👋, quiero solicitar la valoración gratuita de mi finca en Villeta:`,
            ``,
            `• *Nombre:* ${data.name || "No especificado"}`,
            `• *Teléfono:* ${data.phone || "No especificado"}`,
            `• *Condominio / Vereda:* ${data.location || "No especificado"}`,
            `• *Renta actualmente:* ${data.renting_status || "No especificado"}`
        ];

        if (data.property_url?.trim()) {
            lines.push(`• *Enlace / Airbnb:* ${data.property_url.trim()}`);
        }
        if (data.email?.trim()) {
            lines.push(`• *Email:* ${data.email.trim()}`);
        }

        lines.push(``);
        lines.push(`Quedo atento(a) a coordinar la visita diagnóstica. ¡Muchas gracias!`);

        const cleanPhone = SITE_CONFIG.whatsapp.replace(/\D/g, "");
        const formattedPhone = cleanPhone.startsWith("57") ? cleanPhone : `57${cleanPhone}`;
        return `https://wa.me/${formattedPhone}?text=${encodeURIComponent(lines.join("\n"))}`;
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setHasAttemptedSubmit(true);

        if (!isFormComplete) {
            return;
        }

        setIsSubmitting(true);
        const currentData = { ...formData };
        setSubmittedData(currentData);

        // Intento de envío por email
        const { success } = await emailService.sendForm(e.currentTarget);

        if (success) {
            setModalMode("email");
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
            // Fallback sutil y profesional: canalizar directamente por WhatsApp sin alertar errores técnicos
            setModalMode("whatsapp");
            setStatus("success");
            setShowModal(true);

            // Intentar abrir WhatsApp en pestaña nueva con los datos preconfigurados
            const waUrl = generateWhatsAppUrl(currentData);
            if (typeof window !== "undefined") {
                window.open(waUrl, "_blank");
            }

            setFormData({
                name: "",
                phone: "",
                location: "",
                email: "",
                property_url: "",
                renting_status: "A veces"
            });
            setHasAttemptedSubmit(false);
        }

        setIsSubmitting(false);
    };

    const closeModal = () => {
        setShowModal(false);
        setStatus("idle");
    };

    const handleWhatsAppRedirect = () => {
        const targetData = submittedData || formData;
        const url = generateWhatsAppUrl(targetData);
        if (typeof window !== "undefined") {
            window.open(url, "_blank");
        }
    };

    return (
        <section className="py-16 sm:py-24 bg-surface-dark relative overflow-hidden" id="valoracion">
            {/* Background Effect */}
            <div className="absolute -top-24 -right-24 w-64 h-64 bg-primary/20 rounded-full blur-3xl pointer-events-none"></div>

            <Container className="relative z-10">
                <div className="text-center max-w-2xl mx-auto">
                    <h2 className="text-3xl sm:text-4xl font-display font-black text-white mb-4">
                        Agenda Tu Valoración Gratuita Ahora
                    </h2>


                    <p className="text-gray-300 mb-8 text-lg">
                        Reclame su valoración de ingresos gratuita. Limitamos esto a 15 propietarios por mes para asegurar la máxima calidad.
                    </p>

                    <form onSubmit={handleSubmit} noValidate className="space-y-4 text-left bg-white/5 p-6 rounded-xl border border-white/10 backdrop-blur-sm shadow-2xl">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-xs font-medium text-gray-200 mb-1" htmlFor="name">Nombre Completo *</label>
                                <input
                                    className="w-full bg-background-dark/50 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:border-primary focus:ring-primary focus:ring-1 outline-none transition-all"
                                    id="name" name="name" placeholder="Ej: Carlos Rodríguez" type="text"
                                    value={formData.name} onChange={handleInputChange}
                                />
                            </div>
                            <div>
                                <label className="block text-xs font-medium text-gray-200 mb-1" htmlFor="phone">Teléfono (WhatsApp) *</label>
                                <input
                                    className="w-full bg-background-dark/50 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:border-primary focus:ring-primary focus:ring-1 outline-none transition-all"
                                    id="phone" name="phone" placeholder="300 123 4567" type="tel"
                                    value={formData.phone} onChange={handleInputChange}
                                />
                            </div>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-xs font-medium text-gray-200 mb-1" htmlFor="location">Condominio o Vereda *</label>
                                <input
                                    className="w-full bg-background-dark/50 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:border-primary focus:ring-primary focus:ring-1 outline-none transition-all"
                                    id="location" name="location" placeholder="Ej: Payandé, El Recreo" type="text"
                                    value={formData.location} onChange={handleInputChange}
                                />
                            </div>
                            <div>
                                <label className="block text-xs font-medium text-gray-200 mb-1" htmlFor="email">Email *</label>
                                <input
                                    className="w-full bg-background-dark/50 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:border-primary focus:ring-primary focus:ring-1 outline-none transition-all"
                                    id="email" name="email" placeholder="carlos@ejemplo.com" type="email"
                                    value={formData.email} onChange={handleInputChange}
                                />
                            </div>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 items-end">
                            <div>
                                <label className="block text-xs font-medium text-gray-200 mb-1" htmlFor="renting_status">¿Actualmente rentas tu finca?</label>
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
                                    <label className="block text-xs font-medium text-gray-200 mb-1 flex items-center gap-1" htmlFor="property_url">
                                        <MdLink className="text-primary" /> URL de la propiedad o anuncio en Airbnb <span className="text-gray-400 font-normal">(Opcional)</span>
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
                                {isSubmitting && 'Enviando...'}
                                {!isSubmitting && status === 'idle' && <>Solicitar Mi Valoración <MdSend className="group-hover:translate-x-1 transition-transform" /></>}
                                {!isSubmitting && status === 'success' && '¡Solicitud Recibida!'}
                            </span>
                        </Button>
                        <p className="text-center text-xs text-gray-300 mt-2">Tus datos están seguros. Respuesta en menos de 24h.</p>
                    </form>
                </div>
            </Container>

            {/* Confirmation & WhatsApp Modal */}
            {showModal && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
                    <div className="bg-white rounded-2xl max-w-lg w-full p-8 relative shadow-2xl animate-in zoom-in-95 duration-300 text-black">
                        <button
                            onClick={closeModal}
                            className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
                            aria-label="Cerrar modal"
                        >
                            <MdClose size={24} />
                        </button>

                        <div className="text-center">
                            {modalMode === "whatsapp" ? (
                                <>
                                    <div className="w-20 h-20 bg-emerald-100 text-[#25D366] rounded-full flex items-center justify-center mx-auto mb-4 shadow-inner">
                                        <FaWhatsapp size={48} />
                                    </div>

                                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-100 text-emerald-800 mb-3">
                                        <FaWhatsapp className="text-emerald-600 text-sm" /> Conexión Directa Prioritaria
                                    </span>

                                    <h3 className="text-2xl font-display font-bold text-gray-900 mb-3 px-2">
                                        ¡Tu solicitud está lista!
                                    </h3>

                                    <p className="text-gray-600 leading-relaxed text-sm sm:text-base mb-4">
                                        Para garantizarte una respuesta inmediata y personalizada sin tiempos de espera, tu solicitud de valoración será atendida directamente por <strong>WhatsApp</strong> con nuestro equipo de conserjería.
                                    </p>

                                    {submittedData && (
                                        <div className="bg-gray-50 border border-gray-200/80 rounded-xl p-3.5 text-left text-xs sm:text-sm space-y-1.5 text-gray-700 mb-5">
                                            <div className="flex justify-between border-b border-gray-200/60 pb-1">
                                                <span className="text-gray-500">Propietario:</span>
                                                <span className="font-semibold text-gray-900">{submittedData.name}</span>
                                            </div>
                                            <div className="flex justify-between border-b border-gray-200/60 pb-1">
                                                <span className="text-gray-500">Ubicación:</span>
                                                <span className="font-semibold text-gray-900">{submittedData.location}</span>
                                            </div>
                                            <div className="flex justify-between border-b border-gray-200/60 pb-1">
                                                <span className="text-gray-500">Teléfono:</span>
                                                <span className="font-semibold text-gray-900">{submittedData.phone}</span>
                                            </div>
                                            <div className="flex justify-between">
                                                <span className="text-gray-500">Renta actualmente:</span>
                                                <span className="font-semibold text-gray-900">{submittedData.renting_status}</span>
                                            </div>
                                        </div>
                                    )}

                                    <div className="space-y-3">
                                        <Button
                                            fullWidth
                                            onClick={handleWhatsAppRedirect}
                                            className="gap-2 bg-[#25D366] hover:bg-[#20bd5a] border-none text-white font-bold py-3.5 shadow-lg shadow-emerald-600/25 transition-all transform active:scale-95"
                                        >
                                            <FaWhatsapp className="text-xl" /> Enviar Solicitud por WhatsApp
                                        </Button>
                                        <p className="text-xs text-gray-400">
                                            Se abrirá WhatsApp con los detalles de tu propiedad listos para enviar a Yenifer Monsalve.
                                        </p>
                                        <button
                                            onClick={closeModal}
                                            className="text-xs text-gray-400 hover:text-gray-600 transition-colors font-medium block mx-auto pt-1"
                                        >
                                            Cerrar ventana
                                        </button>
                                    </div>
                                </>
                            ) : (
                                <>
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
                                        <p className="text-xs italic text-gray-400">
                                            Mientras tanto, te invitamos a ver cómo transformamos estancias comunes en experiencias de lujo.
                                        </p>
                                    </div>

                                    <div className="mt-8 space-y-3">
                                        <Button fullWidth onClick={handleWhatsAppRedirect} className="gap-2 bg-green-600 hover:bg-green-700 border-none text-white">
                                            <FaWhatsapp className="text-lg" /> Hablar por WhatsApp Ahora
                                        </Button>
                                        <button
                                            onClick={closeModal}
                                            className="text-xs text-gray-400 hover:text-primary transition-colors font-medium"
                                        >
                                            Cerrar ventana
                                        </button>
                                    </div>
                                </>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </section>
    );
}
