import React from 'react';
import {Link} from "react-router-dom";

export default function Footer(props) {
    return <footer className="footer">
        <div className="container">
            <div className="row">
                <div className="col-md-12">
                    <div className="rights">
                        Novomak Export d.o.o. | <i>Sva prava zadrzana</i> |
                    </div>
                    <div className="contact">
                        <a href="tel:022/314-740"><p>022/314-740</p></a>
                        <a href="mailto:novomakexport@yahoo.com"><p>novomakexport@yahoo.com</p></a>
                        <a href="https://www.google.com/maps?ll=44.991588,20.157549&z=16&t=m&hl=en-GB&gl=RS&mapclient=embed&cid=3269410594426619850" target="_blank"><p>Kralja Petra I Karađorđevića 78, Stara Pazova 22300</p></a>
                    </div>
                </div>
            </div>
        </div>
    </footer>
}
