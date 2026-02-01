import Link from "next/link";
import { Container } from "@/components/layout/Container";
import { Button } from "@/components/ui/buttons/Button";

export default function NotFound() {
    return (
        <div className="flex min-h-[70vh] flex-col items-center justify-center py-24">
            <Container className="flex flex-col items-center text-center">
                <span className="font-playfair text-9xl font-bold text-primary/20">
                    404
                </span>
                <h2 className="mt-8 font-playfair text-4xl font-bold text-gray-900 md:text-5xl">
                    Página no encontrada
                </h2>
                <p className="mt-4 max-w-lg text-lg text-gray-600">
                    Lo sentimos, la página que estás buscando no existe o ha sido movida.
                </p>
                <div className="mt-10">
                    <Link href="/">
                        <Button variant="primary" size="lg">
                            Volver al inicio
                        </Button>
                    </Link>
                </div>
            </Container>
        </div>
    );
}
