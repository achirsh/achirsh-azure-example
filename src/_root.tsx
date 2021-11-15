import "./_root.scss";
import { render } from "react-dom";

import Index from './pages/index'

render(
    <Index />, document.getElementById("root"));

module.hot?.accept();
