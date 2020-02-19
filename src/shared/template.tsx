import React from "react";
import styles from "./template.module.css";

export const ProblemTemplate: React.SFC<{
    description: string,
    submit: string,
}> = ({description, submit, children}) => {
    return (
        <div>
            <div>
                <a href={description} target="_blank" rel="noopener noreferrer">Description</a>,
                <a href={submit} target="_blank" rel="noopener noreferrer">Submit</a>
            </div>
            <div className={styles.body}>
                {children}
            </div>
        </div>
    );
};
