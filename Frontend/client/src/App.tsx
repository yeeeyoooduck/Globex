import React, {FC} from 'react';
import { observer } from "mobx-react-lite";
import Panel from "./components/panel/Panel";

const App: FC = () => {
    return (
        <Panel/>
    );
};

export default observer(App);

