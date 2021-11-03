import "./_root.scss";
import "antd/dist/antd.css";
import { render } from "react-dom";
import { HelmetProvider } from "react-helmet-async";

import Index from './pages/index'

render(
    <HelmetProvider>
        <Index />
    </HelmetProvider>, document.getElementById("root"));

module.hot?.accept();
