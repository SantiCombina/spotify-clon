import {Link} from "react-router-dom";

export function Footer() {
    return (
        <div className="w-full h-[72px] flex justify-center items-center">
            <Link to={"/"}>Volver al inicio</Link>
        </div>
    );
}
