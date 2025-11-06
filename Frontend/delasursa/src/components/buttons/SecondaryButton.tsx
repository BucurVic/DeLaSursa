
import Button from '@mui/material/Button';

export default function SecondaryButton({text} : {text: string})  {
    return (
        <Button
            variant="outlined"
            color="primary"
        >
            {text}
        </Button>
    );
}
