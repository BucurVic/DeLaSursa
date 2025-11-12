import {createContext, type ReactNode, useContext, useState} from "react";
import {Alert, Snackbar} from "@mui/material";

type NotifyContextType = (message:string, severity?:"success" |"error" |"info" |"warning")=>void;

const NotifyContext = createContext<NotifyContextType | undefined>(undefined);

export function NotifyProvider({children}:{children:ReactNode}){
    const [open,setOpen]=useState(false);
    const [message,setMessage]=useState("");
    const [severity,setSeverity]=useState<"success" |"error" |"info" |"warning">("info");

    const notify: NotifyContextType = (msg, sev = "info") => {
        setMessage(msg);
        setSeverity(sev);
        setOpen(true);
    };

    const handleClose = ()=>setOpen(false);

    return (
        <NotifyContext.Provider value={notify}>
            {children}
            <Snackbar open={open} autoHideDuration={3000} onClose={handleClose}>
                <Alert onClose={handleClose} severity={severity} sx={{width:"100%"}}>
                    {message}
                </Alert>
            </Snackbar>
        </NotifyContext.Provider>
    );
}

export function useNotify(){
    const context=useContext(NotifyContext);
    if(!context){
        throw new Error("useNotify must be used within a NotifyProvider");
    }
    return context;
}