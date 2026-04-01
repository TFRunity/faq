'use client'

import {ReactElement, useState} from "react";
import {Container} from "@/app/_components/ui/ui-container";

export default function Home()  : ReactElement | null{

    const [isLoggedIn, setLogged] = useState<boolean>(false);

    return (
        <Container/>
    )
}
