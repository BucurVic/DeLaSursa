import Button from '@mui/material/Button';
import type {ButtonProps} from "./ButtonProps.tsx";

export default function SecondaryButton({text,onClick} : ButtonProps)  {
    return (
        <Button
            variant="outlined"
            color="primary"
            onClick={onClick}
        >
            {text}
        </Button>
    );
}
