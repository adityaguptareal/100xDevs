import { ReactNode } from "react";

export default function authenciated({children}:{children:ReactNode}) {
    return(
        <div>
            This is auth page wrapper
            {children}
            this is completed
        </div>
    )
}