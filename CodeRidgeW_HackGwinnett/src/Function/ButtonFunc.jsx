import React from "react";
import { Link } from 'react-router';



//Add secondary for the outlined style: <ButtonLnk page="journal" buttonname="Journal" secondary />
export function ButtonLnk({ page, buttonname, secondary = false }){
    return(
        <Link className={secondary ? "btn btn_secondary" : "btn"} to={`/${page}`}>
            {buttonname}
        </Link>
    )
}
