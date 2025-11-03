import {Link} from "react-router";
import Button from "@mui/material/Button";
import {ButtonHTMLAttributes} from "react";
import styles from "@/common/components/PageNotFound/PageNotFound.module.css";

type ByttonType = ButtonHTMLAttributes<HTMLButtonElement>

export const ButtonHandler = ({name}: ByttonType) => {
    return (
        <div className={styles.title}>
            <Button component={Link} to="/">{name}</Button>
        </div>

    );
};



