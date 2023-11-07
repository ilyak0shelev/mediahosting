import React, {useContext} from "react";
import Modal from "./UI/modal/Modal";
import { PageContext } from "./contexts/PageContext";

const LoginWindow = () => {
    const value = useContext(PageContext)

    if (value.active === 'LoginWindow') {
        return (
            <Modal>
                Login
            </Modal>
        )
    }

}

export default LoginWindow
